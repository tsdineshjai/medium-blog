import { Hono } from "hono";

const user = new Hono();

user.post("/signup", (c) => c.text("this is a signup page"));
user.post("/signin", (c) => c.text("this is a sign in page"));

export default user;
