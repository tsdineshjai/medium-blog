import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import user from "./user";
import blog from "./blog";

const api = new Hono();
const prisma = new PrismaClient().$extends(withAccelerate());

api.get("/", (c) => c.text("This is api/v1 endppoint"));

api.route("/user", user);
api.route("/blog", blog);

export default api;
