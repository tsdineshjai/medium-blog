import { Hono } from "hono";
import user from "./user";
import blog from "./blog";

const api = new Hono();

api.get("/", (c) => c.text("This is api/v1 endppoint"));

api.route("/user", user);
api.route("/blog", blog);

export default api;
