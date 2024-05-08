import { Avatar } from "../BlogCard/Blogcard";

function Appbar() {
	return (
		<div className="flex justify-between p-1 border-b items-center">
			<div>Medium</div>
			<div>
				<Avatar name={"DA"} small={true} />
			</div>
		</div>
	);
}

export default Appbar;
