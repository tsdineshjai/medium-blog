import { useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();
	return (
		<div className="pt-10 container mx-auto h-10 w-full text-center p-3 font-sans  ">
			<h3 className="text-4xl">Medium Blog Clone</h3>
			<button
				className="border-4 p-3 mt-20 rounded-lg hover:bg-slate-600"
				onClick={() => navigate("/signup")}
			>
				Click here to proceed
			</button>
		</div>
	);
}

export default Header;
