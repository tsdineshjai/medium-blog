import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const user = new Hono();
const prisma = new PrismaClient().$extends(withAccelerate());

user.post("/signup", (c) => c.text("this is a signup page"));
user.post("/signin", (c) => c.text("this is a sign in page"));

export default user;
