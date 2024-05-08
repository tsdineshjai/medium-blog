//this file contains list of blogs created by the user

import Appbar from "../Appbar/Appbar";
import Blogcard from "../BlogCard/Blogcard";
import useBlogs from "../hooks/useBlogs";



function Blogs() {
	const { loading, blogs } = useBlogs();

	console.log(blogs);

	if (loading) {
		return <h3>Loading....</h3>;
	}

	return (
		<div>
			<Appbar />
			{blogs.map((blog) => {
				const { author, content, title} = blog;
				return (
					<Blogcard
						author={author?.name}
						content={content}
						title={title}
					/>
				);
			})}
		</div>
	);
}

export default Blogs;
