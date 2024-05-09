/* 
 Objective: To fetch the blogs of the user, then to return the data and the loading state. 
*/
import axios from "axios";
import { useState, useEffect } from "react";

interface Blog {
	authorName: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
	publishedDate: string;
	id: string;
}

function useBlogs() {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);
	useEffect(() => {
		axios
			.get("https://backend.tsdineshjai.workers.dev/api/v1/blog/bulk", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("myToken")}`,
				},
			})
			.then((response) => {
				const blogs = response.data.posts;

				//filtering blogs ---> to keep element that has name value
				const filteredBlogs = blogs.filter(
					(blog: Blog) => blog.author?.name != null
				);
				setBlogs([...filteredBlogs]);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);
	console.log(loading, blogs);
	return {
		loading,
		blogs,
	};
}

export default useBlogs;

// interface SingleBlog {
// 	id: string;
// 	title: string;
// 	publishedDate: string;
// 	content: string;
// 	published: string;
// }
export function useBlog(id: string | undefined) {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState({});

	useEffect(() => {
		axios
			.get(`https://backend.tsdineshjai.workers.dev/api/v1/blog/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("myToken")}`,
				},
			})
			.then((response) => {
				const blog = response.data.blog;
				setBlog({
					...blog,
				});
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [id]);

	return {
		loading,
		blog,
	};
}
