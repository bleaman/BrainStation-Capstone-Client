import "./App.scss";
import "./styles/animations/animationsOld.scss";
import "./styles/animations/animationsNew.scss";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import BusinessProfilePage from "./Pages/BusinessProfilePage/BusinessProfilePage";
import EditBusinessProfilePage from "./Pages/EditBusinessProfilePage/EditBusinessProfilePage";
import MyProfilePage from "./Pages/MyProfilePage/MyProfilePage";
import Header from "./components/Header/Header";
import CreateBusinessPage from "./Pages/CreateBusinessPage/CreateBusinessPage";
import EditUserProfilePage from "./Pages/EditUserProfilePage/EditUserProfilePage";
import ChangePasswordPage from "./Pages/ChangePasswordPage/ChangePasswordPage";
import UserProfilePage from "./Pages/UserProfilePage/UserProfilePage";
import Footer from "./components/Footer/Footer";
import api from "./utilities/api";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const localToken = localStorage.getItem("token");

	React.useEffect(() => {
		if (localToken) {
			setIsLoggedIn(true);
		}
	}, [localToken]);

	function handleLogin(e) {
		e.preventDefault();
		const loginInfo = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		api
			.post(`users/login`, loginInfo)
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				setIsLoggedIn(true);
			})
			.catch((err) => {
				return console.log(err);
			});
	}

	if (isLoggedIn) {
		return (
			<main className="app__main">
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<CategoriesPage />}></Route>
						<Route path="/categories" element={<CategoriesPage />}></Route>
						<Route path="/business/create" element={<CreateBusinessPage />}></Route>
						<Route path="/business/:businessId" element={<BusinessProfilePage />}></Route>
						<Route path="/business/:businessId/edit" element={<EditBusinessProfilePage />}></Route>
						<Route path="/user/:userId" element={<UserProfilePage />}></Route>
						<Route path="/user/edit/:userId" element={<EditUserProfilePage />}></Route>
						<Route path="/user/password/:userId" element={<ChangePasswordPage />}></Route>
						<Route path="/myprofile" element={<MyProfilePage />}></Route>

						<Route path="*" element={<CategoriesPage />}></Route>
					</Routes>
					<Footer />
				</BrowserRouter>
			</main>
		);
	} else {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage handleLogin={handleLogin} />}></Route>
					<Route path="/login" element={<LoginPage handleLogin={handleLogin} />}></Route>
					<Route path="/register" element={<RegisterPage />}></Route>
					<Route path="/forgotpassword" element={<ForgotPasswordPage />}></Route>
					<Route path="/forgotpassword/reset/:token" element={<ResetPasswordPage />}></Route>
					<Route path="*" element={<LoginPage handleLogin={handleLogin} />}></Route>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
