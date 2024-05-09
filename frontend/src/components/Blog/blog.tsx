// import { createPostInput, updatePostInput } from "@tsdjai/common-app";

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";
import SkelotonLoading from "../Skeleton/Skeleton";

function Blog() {
	const { id } = useParams();
	const { loading, blog } = useBlog(id);
	if (loading) {
		return <SkelotonLoading />;
	}
	return (
		<div className="flex w-1/2 mx-auto items-center">
			{JSON.stringify(blog)}
		</div>
	);
}

export default Blog;
