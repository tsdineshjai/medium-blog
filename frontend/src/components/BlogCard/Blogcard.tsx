interface BlogCardProps {
	title: string;
	content: string;
	author: string;
}

function Blogcard({ title, content, author }: BlogCardProps) {
	return (
		<div className="grid grid-cols-1 w-1/3 mx-auto pt-3 border-b">
			<div className="pt-2 pb-2 italic text-sm">
				<Avatar name={author} small={false} /> {author} &#9679;
			</div>
			<div className="text-base underline underline-offset-5 hover:cursor-pointer">
				{title.toUpperCase()}
			</div>
			<div className="text-yellow-300 mb-2 text-sm pt-1">{`${content.slice(
				0,
				100
			)}....`}</div>

			<div className="text-xs pb-1">
				{`${Math.ceil(content.length / 100)}`} min read
			</div>
		</div>
	);
}

export default Blogcard;

export function Avatar({ name, small }: { name?: string; small: boolean }) {
	return (
		<div
			className={`mr-2 dark relative inline-flex items-center justify-center	 ${
				small ? " w-5 h-5" : "w-7 h-7"
			}  overflow-hidden bg-yellow-500 rounded-full`}
		>
			<span className="font-extralight	 text-xs p-0">
				{name?.slice(0, 2).toUpperCase() || "RA"}
			</span>
		</div>
	);
}
