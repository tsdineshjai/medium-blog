import { Hono } from "hono";
import api from "./routes/api";
import { cors } from "hono/cors";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();
app.use(cors());

app.get("/", async (c) => {
	console.log("hello");
	return c.text(`this is the root route`);
});

app.route("/api/v1", api);
export default app;
