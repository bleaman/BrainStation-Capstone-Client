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
import { useState, useEffect } from "react";
import { delay } from "./utilities/delay";

import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
	const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isFailedLogin, setIsFailedLogin] = useState(false);

	const localToken = localStorage.getItem("token");

	useEffect(() => {
		if (localToken) {
			setIsLoggedIn(true);
		}
	}, [localToken]);

	async function handleLogin(e) {
		e.preventDefault();
		setIsLoginSubmitted(true);
		setIsFailedLogin(false);
		const loginInfo = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		try {
			const res = await api.post(`users/login`, loginInfo);
			localStorage.setItem("token", res.data.token);
			setIsLoggedIn(true);
			setIsLoginSubmitted(false);
		} catch (err) {
			setIsFailedLogin(true);
			await delay(3000);
			setIsLoginSubmitted(false);
			console.log(err);
		}
	}

	if (isLoggedIn) {
		return (
			<main className="app__main">
				<HashRouter>
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
				</HashRouter>
			</main>
		);
	} else {
		return (
			<HashRouter>
				<Routes>
					<Route path="/" element={<LoginPage isFailedLogin={isFailedLogin} isLoginSubmitted={isLoginSubmitted} handleLogin={handleLogin} />}></Route>
					<Route path="/login" element={<LoginPage isFailedLogin={isFailedLogin} isLoginSubmitted={isLoginSubmitted} handleLogin={handleLogin} />}></Route>
					<Route path="/register" element={<RegisterPage />}></Route>
					<Route path="/forgotpassword" element={<ForgotPasswordPage />}></Route>
					<Route path="/forgotpassword/reset/:token" element={<ResetPasswordPage />}></Route>
					<Route path="*" element={<LoginPage isFailedLogin={isFailedLogin} isLoginSubmitted={isLoginSubmitted} handleLogin={handleLogin} />}></Route>
				</Routes>
			</HashRouter>
		);
	}
}

export default App;
