import { Hono } from "hono";

const blog = new Hono();

blog.post("/", (c) =>
	c.text("this is a blog default endpoint of post method ")
);

blog.put("/", (c) => c.text("this is a blog default endpoint of put method "));

blog.get("/bulk", (c) => c.text("this is a blog page to get the bulk"));
blog.get("/:id", (c) => {
	const id = c.req.param("id");

	return c.json({
		message: id,
	});
});

export default blog;
