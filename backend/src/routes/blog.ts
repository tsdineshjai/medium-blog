import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { z } from "zod";

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

const postSchema = z.object({
	title: z.string({ message: "title is required" }).max(90),
	content: z.string({ message: "conntent is required for the post" }),
});

//middleware
//objective: trying to check if the user has authorization to retreive a blog / post a blog/ update a blog
//this middleware runs everytime to do ccheck the authorization using the json web token.

blog.use(async (c, next) => {
	//get c.req.body to get the email info and get the user by findMany method and get the id from the result
	//and pass on the id by adding the property to it.

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
	const { success } = postSchema.safeParse(body);
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
		const postStringify = JSON.stringify(post);
		return c.json({
			message: "post is successfull created",
			details: postStringify,
		});
	} catch (e) {
		c.status(411);
		return c.json({ message: `${e}` });
	}
});

blog.put("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	return c.text("this is a blog default endpoint of put method ");
});

blog.get("/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const id = c.req.param("id");

	return c.json({
		message: id,
	});
});

export default blog;
