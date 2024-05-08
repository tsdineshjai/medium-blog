import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import Blog from "./components/Blog";
import Header from "./components/Header";
import Blogs from "./components/Blogs/Blogs";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Header />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/blog/:id" element={<Blog />} />
					<Route path="/blogs" element={<Blogs />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
