import axios from "axios";
import Appbar from "../Appbar/Appbar";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogPublish {
	title: string;
	content: string;
}
function NewBlog() {
	const [blogData, setBlogData] = React.useState<BlogPublish>({
		title: "",
		content: "",
	});

	const navigate = useNavigate();

	function handleDataChange(e) {
		setBlogData({
			...blogData,
			[e.target.name]: e.target.value,
		});
	}
	function handlePublish(e) {
		e.preventDefault();
		const token = localStorage.getItem("myToken");
		axios({
			url: "https://backend.tsdineshjai.workers.dev/api/v1/blog/post",
			method: "post",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				...blogData,
			},
		})
			.then((response) => {
				const postRes = response.data;
				alert(postRes.message);
				console.log(postRes.details);
				navigate("/blogs");
			})
			.catch(function error(e) {
				console.log(e.response, e.config);
			});
	}
	return (
		<div>
			<Appbar />
			<div className="w-1/2 mx-auto p-5">
				<div className="flex flex-col gap-5">
					<input
						className="bg-transparent border-none outline-none placeholder:text-3xl placeholder:text-yellow-500 italic text-2xl"
						type="text"
						name="title"
						id="title"
						placeholder="Title..."
						value={blogData.title}
						onChange={handleDataChange}
					/>
					<textarea
						className="bg-transparent border-none outline-none placeholder:text-yellow-500"
						name="content"
						id="content"
						cols={30}
						rows={10}
						placeholder="Tell your Story..."
						value={blogData.content}
						onChange={handleDataChange}
					></textarea>

					<button
						onClick={handlePublish}
						className=" hover:bg-teal-900 font-mono hover:text-white  border-2 p-2 border-yellow-500 rounded-md mx-auto text-yellow-400 w-fit bg-transparent"
					>
						Publish Post
					</button>
				</div>
			</div>
		</div>
	);
}

export default NewBlog;
