import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";//this is required to use the connection pool 

import api from "./routes/api";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());

// const prisma = new PrismaClient().$extends(withAccelerate());
app.get("/", (c) => c.text("hello Hono !"));

app.route("/api/v1", api);

export default app;
