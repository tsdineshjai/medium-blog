import { signupInput } from "@tsdjai/common-app";

function Signup() {
	return (
		<div className="flex h-screen ">
			<div className="w-1/2 mt-20 ">
				<div className="container text-center p-3 ">
					<h3 className="text-xl pb-1">Create an account</h3>
					<p className="p-1">
						Alreay have an account?{" "}
						<span className="ml-1 underline hover:cursor-pointer hover:font-bold ">
							Login
						</span>
					</p>
				</div>

				<form
					action=""
					className="flex flex-col  items-center gap-2 w-1/2  mx-auto mt-5"
				>
					<label htmlFor="username" className="w-1/2 text-lg ">
						Username:
					</label>
					<input
						type="text"
						name="username"
						id="username"
						className="w-1/2 rounded-md p-2 text-black"
					/>

					<label htmlFor="email" className="w-1/2 text-lg">
						Email:
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="w-1/2 rounded-md p-2 text-black"
					/>

					<label htmlFor="password" className="w-1/2 text-lg">
						Password:
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="w-1/2 rounded-md p-2 text-black"
					/>

					<button
						type="submit"
						className="w-1/2 rounded-md p-2 border-2 mt-5 hover:bg-white hover:text-black "
					>
						Sign Up
					</button>
				</form>
			</div>
			<div className="w-1/2 bg-rose-50  text-black flex p-3">
				<div className="flex flex-col justify-center border-5 border-black p-3  ">
					<h2 className="text-3xl pb-2">
						&ldquo;The customer service I received was exceptional. The support
						team went above and beyond my concerns.&rdquo;
					</h2>
					<p className="text-xl">Mikel Arteta</p>
					<small className="text-base font-normal">CEO, Arsnl Inc.</small>
				</div>
			</div>
		</div>
	);
}

export default Signup;
