import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkelotonLoading() {
	return (
		<div>
			<SkeletonTheme baseColor="#d9cece" highlightColor="#a6de90">
				<p
					className="mx-auto"
					style={{ marginLeft: "10rem", marginTop: "16px" }}
				>
					<Skeleton
						count={5}
						width={700}
						height={9}
						duration={1}
						style={{ marginLeft: "10rem", marginTop: "16px" }}
					/>
				</p>
			</SkeletonTheme>
			<SkeletonTheme baseColor="#d9cece" highlightColor="#a6de90">
				<p
					className="mx-auto"
					style={{ marginLeft: "10rem", marginTop: "16px" }}
				>
					<Skeleton
						count={5}
						width={700}
						height={9}
						duration={1}
						style={{ marginLeft: "10rem", marginTop: "16px" }}
					/>
				</p>
			</SkeletonTheme>
			<SkeletonTheme baseColor="#d9cece" highlightColor="#a6de90">
				<p
					className="mx-auto"
					style={{ marginLeft: "10rem", marginTop: "16px" }}
				>
					<Skeleton
						count={5}
						width={700}
						height={9}
						duration={1}
						style={{ marginLeft: "10rem", marginTop: "16px" }}
					/>
				</p>
			</SkeletonTheme>
			<SkeletonTheme baseColor="#d9cece" highlightColor="#a6de90">
				<p
					className="mx-auto"
					style={{ marginLeft: "10rem", marginTop: "16px" }}
				>
					<Skeleton
						count={3}
						width={700}
						height={9}
						duration={1}
						style={{ marginLeft: "10rem", marginTop: "16px" }}
					/>
				</p>
			</SkeletonTheme>
		</div>
	);
}

export default SkelotonLoading;
