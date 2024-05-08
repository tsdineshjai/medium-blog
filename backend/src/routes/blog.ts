import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@tsdjai/common-app";

const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		SECRET_KEY: string;
	};
	Variables: {
		userId: string;
	};
}>();

//creating a post schema using zod

//middleware
//objective: trying to check if the user has authorization to retreive a blog / post a blog/ update a blog
//this middleware runs everytime to do ccheck the authorization using the json web token.

blog.use(async (c, next) => {
	const authorizationHeaderValue = c.req.header("Authorization");

	if (!authorizationHeaderValue) {
		c.status(403);
		return c.json({ message: "auth header is missing" });
	}

	const extractedTokenFromHeader = authorizationHeaderValue.split(" ")[1];

	//now we verify if the token is valid or not

	const payload = await verify(extractedTokenFromHeader, c.env.SECRET_KEY);
	if (!payload) {
		c.status(403);
		return c.json({ message: "you are unauthorizd" });
	}
	//adding a  variable userId to the global context object, so that we can make use of userId when required
	//generally useful while creating posts where userId is required.
	c.set("userId", payload.id);
	await next();
});

blog.post("/post", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const userId = c.get("userId");

	const body = await c.req.json();
	//schema validation
	const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: "invalid inputs" });
	}
	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userId,
			},
		});
		c.status(200);
		return c.json({
			message: "post is successfull created",
			details: post,
		});
	} catch (e) {
		c.status(411);
		return c.json({ message: `${e}` });
	}
});

//updating a blog
blog.put("/post", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const userId = c.get("userId");

	const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(403);
		return c.json({
			message: "schema is invalid",
		});
	}
	try {
		const updatedBlog = await prisma.post.update({
			where: {
				id: body.id, //this is the post id
				authorId: userId,
			},
			data: {
				title: body.title,
				content: body.content,
				published: body.published,
			},
		});
		c.status(200);
		return c.json({
			message: "the blog is udpated successfully",
			updatedContent: updatedBlog.content,
		});
	} catch (e) {
		c.status(411);
		return c.json({ message: `${e}` });
	}
});

//to retreive all the blogs
blog.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const posts = await prisma.post.findMany({
			select: {
				title: true,
				content: true,
				id: true,
				publishedDate: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		c.status(200);
		return c.json({
			posts,
		});
	} catch (e) {
		c.status(404);
		return c.json({
			message: `error occureed: error details: ${e}`,
		});
	}
});

blog.get("/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const searchQuery = c.req.param("id");
	try {
		const fetchedBlog = await prisma.post.findFirst({
			where: {
				id: searchQuery,
			},
		});
		c.status(411);
		console.log(fetchedBlog);
		return c.json({
			message: "the blog has been fetched successfully",
			blog: fetchedBlog,
		});
	} catch (e) {
		c.status(404);
		return c.json({
			message: `Couldnt find a blog with the given id due to the error ${e}`,
		});
	}
});
//api to read all the blogs

export default blog;
