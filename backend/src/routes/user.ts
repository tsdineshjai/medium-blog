import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const user = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		SECRET_KEY: string;
	};
}>();

user.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	//datasourceUrl overrides the datasource options in prisma.schema file

	const secretKey = c.env?.SECRET_KEY;
	const body = await c.req.json();
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


