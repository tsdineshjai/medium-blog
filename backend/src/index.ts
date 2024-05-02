import { Hono } from "hono";
import api from "./routes/api";
import { cors } from "hono/cors";
const myText = new TextEncoder().encode("Hello World!");
const myDigest = await crypto.subtle.digest(
	{
		name: "SHA-256",
	},
	myText
);
console.log(new Uint8Array(myDigest));

console.log(`hello`);
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();
app.use(cors());

app.get("/", async (c) => {
	console.log("hello");
	return c.text(`${myDigest}`);
});

app.route("/api/v1", api);
export default app;
