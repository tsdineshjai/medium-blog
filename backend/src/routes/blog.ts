import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		SECRET_KEY: string;
	};
	Variables: {
		userId: string;
	};
}>();

//middleware
//objective: trying to check if the user has authorization to retreive a blog / post a blog/ update a blog
//this middleware runs everytime to do ccheck the authorization using the json web token.

blog.use(async (c, next) => {
	//get c.req.body to get the email info and get the user by findMany method and get the id from the result
	//and pass on the id by adding the property to it.

	const authorizationHeaderValue = c.req.header("Authorization");

	if (!authorizationHeaderValue) {
		c.status(403);
		return c.json({ message: "header is authorizd" });
	}

	const extractedTokenFromHeader = authorizationHeaderValue.split(" ")[1];

	//now we verify if the token is valid or not

	const payload = await verify(extractedTokenFromHeader, c.env.SECRET_KEY);
	if (!payload) {
		c.status(403);
		return c.json({ message: "you are unauthorizd" });
	}
	//adding a variable userId to the context object of the cloudfare worker
	c.set("userId", payload.id);
	await next();
});

blog.post("/", async (c, next) => {
	// const prisma = new PrismaClient({
	// 	datasourceUrl: c.env?.DATABASE_URL,
	// }).$extends(withAccelerate());
	console.log(c.get("userId"));
	return c.text("this is a blog default endpoint of post method ");
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
