import { Hono } from "hono";
import api from "./routes/api";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors());

// const prisma = new PrismaClient().$extends(withAccelerate());
app.get("/", (c) => {
	console.log(c);
	return c.text("hello Hono !");
});

app.route("/api/v1", api);

export default app;

cacheStrategy: {
	ttl: 60;
}
