//this file contains list of blogs created by the user

import { useNavigate } from "react-router-dom";
import Appbar from "../Appbar/Appbar";
import Blogcard from "../BlogCard/Blogcard";
import SkelotonLoading from "../Skeleton/Skeleton";
import useBlogs from "../hooks/useBlogs";

function Blogs() {
	const { loading, blogs } = useBlogs();

	const navigate = useNavigate();

	if (loading) {
		return (
			<h3>
				<SkelotonLoading />
			</h3>
		);
	}
	function handleClick() {
		navigate("/create");
	}
	return (
		<div>
			<Appbar />
			<div className=" w-fit mx-auto py-2">
				<button
					onClick={handleClick}
					className="border-2 flex items-center justify-center text-yellow-200 p-3 border-3 rounded-lg  mx-auto hover:bg-teal-900 hover:text-white text-center"
				>
					Create a blog
				</button>
			</div>
			{blogs.map((blog) => {
				const { author, content, title, publishedDate, id } = blog;
				return (
					<Blogcard
						key={id}
						id={id}
						author={author?.name}
						content={content}
						title={title}
						publishedDate={publishedDate}
					/>
				);
			})}
		</div>
	);
}

export default Blogs;
