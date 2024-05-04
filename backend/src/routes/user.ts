import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { z } from "zod";

const user = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		SECRET_KEY: string;
	};
}>();

const userSchema = z.object({
	email: z.string().email({ message: "It should be a valid email" }),
	password: z.string().min(6, { message: "minimum 6 characters in length" }),
});

user.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	//datasourceUrl overrides the datasource options in prisma.schema file

	const secretKey = c.env?.SECRET_KEY;
	const body = await c.req.json();
	const { success } = userSchema.safeParse(body);

	if (success) {
		try {
			const user = await prisma.user.create({
				data: {
					email: body.email,
					password: body.password,
				},
			});
			const token = await sign({ id: user.id }, secretKey);
			return c.text(`${token}`);
		} catch (e) {
			c.status(403);
			return c.json({ error: "error while signing up" });
		}
	} else {
		c.json(411);
		return c.json({ message: "invalid inputs from the user" });
	}
});

user.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const secretKey = c.env?.SECRET_KEY;
	const body = await c.req.json();

	//find the user in the database using prisma client

	const user = await prisma.user.findMany({
		where: {
			email: body.email,
		},
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}
	const token = await sign({ id: user[0].id }, secretKey);
	return c.text(`${token}`);
});

export default user;
