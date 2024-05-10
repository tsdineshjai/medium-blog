import axios from "axios";
import Appbar from "../Appbar/Appbar";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BlogPublish {
	title: string;
	content: string;
	id: string;
}
function UpdateBlog() {
	const location = useLocation();
	const { title: blogState, content: blogContent, id: blogId } = location.state;
	const [blogData, setBlogData] = React.useState<BlogPublish>({
		title: blogState,
		content: blogContent,
		id: blogId,
	});

	console.log("the id is there in this ", blogData.id);

	const navigate = useNavigate();

	React.useEffect(() => {
		const ref = document.querySelector("input");
		ref?.focus();
	}, []);

	function handleDataChange(e) {
		setBlogData({
			...blogData,
			[e.target.name]: e.target.value,
		});
	}
	function hanldeUpdate(e) {
		e.preventDefault();
		const token = localStorage.getItem("myToken");
		axios({
			url: "https://backend.tsdineshjai.workers.dev/api/v1/blog/post",
			method: "put",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Length": JSON.stringify(blogData).length,
			},
			data: {
				...blogData,
			},
		})
			.then((response) => {
				alert(JSON.stringify(response.data.message));
				navigate("/blogs");
			})
			.catch(function error(e) {
				console.log(e.message);
			});
	}
	return (
		<div>
			<Appbar />
			<div className="w-1/2 mx-auto p-5">
				<div className="flex flex-col gap-5">
					<input
						className="focus:outline-dashed bg-transparent p-2 placeholder:text-3xl placeholder:text-yellow-500 italic text-2xl"
						type="text"
						name="title"
						id="title"
						placeholder="Title..."
						value={blogData.title}
						onChange={handleDataChange}
					/>
					<textarea
						className="focus:outline-dashed bg-transparent p-2 placeholder:text-yellow-500"
						name="content"
						id="content"
						cols={30}
						rows={10}
						placeholder="Tell your Story..."
						value={blogData.content}
						onChange={handleDataChange}
					></textarea>

					<button
						onClick={hanldeUpdate}
						className=" hover:bg-teal-900 font-mono hover:text-white  border-2 p-2 border-yellow-500 rounded-md mx-auto text-yellow-400 w-fit bg-transparent"
					>
						Update Post
					</button>
				</div>
			</div>
		</div>
	);
}

export default UpdateBlog;
