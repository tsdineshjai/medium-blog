import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@tsdjai/common-app";

const user = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		SECRET_KEY: string;
	};
}>();

// const userSchema = z.object({
// 	email: z.string().email({ message: "It should be a valid email" }),
// 	password: z.string().min(6, { message: "minimum 6 characters in length" }),
// });

user.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	//datasourceUrl overrides the datasource options in prisma.schema file

	const secretKey = c.env?.SECRET_KEY;
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);

	if (success) {
		try {
			const user = await prisma.user.create({
				data: {
					email: body.email,
					password: body.password,
					name: body.name,
				},
			});
			const token = await sign({ id: user.id }, secretKey);
			c.status(200);
			return c.text(`${token}`);
		} catch (e) {
			c.status(403);
			return c.json({
				message: "error while signing up, user might already exists",
				error: e,
			});
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

	const { success } = signinInput.safeParse(body);

	if (!success) {
		c.status(403);
		return c.json({ error: "user not found" });
	}
	try {
		//find the user in the database using prisma client
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});
		c.status(200);
		c.res.statusText;
		const token = await sign({ id: user?.id }, secretKey);
		return c.text(`${token}`);
	} catch (e) {
		c.status(403);
		return c.json({ error: "user not found" });
	}
});

export default user;
