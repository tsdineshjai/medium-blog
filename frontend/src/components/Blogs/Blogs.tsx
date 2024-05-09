//this file contains list of blogs created by the user

import Appbar from "../Appbar/Appbar";
import Blogcard from "../BlogCard/Blogcard";
import SkelotonLoading from "../Skeleton/Skeleton";
import useBlogs from "../hooks/useBlogs";

function Blogs() {
	const { loading, blogs } = useBlogs();

	if (loading) {
		return (
			<h3>
				<SkelotonLoading />
			</h3>
		);
	}
	return (
		<div>
			<Appbar />
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
