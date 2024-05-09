// import { createPostInput, updatePostInput } from "@tsdjai/common-app";

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";
import SkelotonLoading from "../Skeleton/Skeleton";
import Appbar from "../Appbar/Appbar";
import moment from "moment";

function Blog() {
	const { id } = useParams();
	const { loading, blog } = useBlog({
		id: id || "",
	});
	if (loading || !blog) {
		return <SkelotonLoading />;
	}
	const { title, content, publishedDate, author } = blog;
	const { name } = author;
	const dateObj = moment(publishedDate);
	const date = dateObj.format("YYYY-MM-DD"); // "2024-05-08"
	const time = dateObj.format("HH:mm:ss");
	return (
		<div className="">
			<Appbar />
			<div className="flex justify-center">
				<div className="grid grid-cols-12 w-full pt-11 h-screen">
					<div className="col-span-8 p-10">
						<div className="py-1 font-mono">{title.toUpperCase()}</div>
						<div className="py-1 text-base italic font-thin">
							Posted on {date}
							<small className="text-pink-200 ml-1"> Time: {time}</small>{" "}
						</div>
						<div className="text-sm font-thin">
							{content}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
							blanditiis veritatis ratione temporibus ducimus omnis unde
							praesentium minus reiciendis illum sapiente rerum, incidunt, enim
							maiores aspernatur, adipisci placeat fugiat nihil. Cum deserunt
							aliquid vitae autem illo quas ut voluptatum ipsum numquam eligendi
							consequatur in repudiandae est delectus hic, consectetur,
							necessitatibus adipisci modi velit sint. Laudantium accusantium
							omnis repudiandae sed ipsum! Voluptas adipisci vero excepturi
							quae, quia similique totam iusto aut explicabo consequatur sint
							voluptatum dolores itaque ullam voluptatibus unde qui nemo
							voluptate commodi inventore incidunt mollitia at! In, tempore
							laudantium!
						</div>
					</div>
					<div className="col-span-4 p-10">
						<div className="font-mono pb-1">{name.toUpperCase()}</div>
						<div className="flex border-3 gap-3">
							<div className="flex-one h-3 w-3 bg-yellow-500 rounded-full mt-5 p-2"></div>
							<div className="flex-auto p-0 m-0">
								<p className="text-base font-thin">Jokester</p>
								<small className="text-xs font-extralight">
									Mater of mirth, purveyor of puns, and the funniest person in
									the kingdom
								</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Blog;
