import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@tsdjai/common-app";

function Signin() {
	const [signInData, setsignInData] = useState<SigninType>({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	function handleChange(e) {
		setsignInData({
			...signInData,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit() {
		axios({
			url: `https://backend.tsdineshjai.workers.dev/api/v1/user/signin`,
			method: "post",
			data: signInData,
		})
			.then((response) => {
				if (response.statusText) {
					const token = response.data;
					if (token) {
						console.log(`signin is succesful`);
					}
					navigate("/blog");
					console.log(token);
				}
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
				console.log(error.config);
			});
	}
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 h-screen  ">
			<div className=" mt-20 2xl:w-full">
				<div className="container text-center p-3 mx-auto ">
					<h3 className="text-xl pb-1">Create an account</h3>
					<p className="p-1">
						Dont have an account?
						<Link
							to={"/signup"}
							className="ml-1 underline hover:cursor-pointer hover:font-bold "
						>
							SignUp
						</Link>
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col  items-center gap-2 w-1/1.5  mx-auto mt-5 "
				>
					<label htmlFor="email" className="w-1/2 text-lg">
						Email:
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="w-1/2 rounded-md p-2 text-black"
						onChange={handleChange}
						pattern="[a-zA-Z0-9._+-%]+@[a-zA-Z._]+\.[a-zA-Z]{2,}"
					/>

					<label htmlFor="password" className="w-1/2 text-lg">
						Password:
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="w-1/2 rounded-md p-2 text-black"
						onChange={handleChange}
						pattern=".{6,30}"
					/>

					<button
						type="submit"
						className="w-1/2 rounded-md p-2 border-2 mt-5 hover:bg-white hover:text-black "
					>
						SignIn
					</button>
				</form>
			</div>
			<div className="hidden lg:flex bg-rose-50  text-black p-10   ">
				<div className="flex flex-col justify-center border-5 border-black p-3  ">
					<h2 className="text-3xl pb-2">
						&ldquo;The customer service I received was exceptional. The support
						team went above and beyond my concerns.&rdquo;
					</h2>
					<p className="ml-2 text-xl ">Mikel Arteta</p>
					<small className="ml-2 text-base font-normal">CEO, Arsnl Inc.</small>
				</div>
			</div>
		</div>
	);
}
export default Signin;
