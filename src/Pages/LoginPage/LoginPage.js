import "./LoginPage.scss";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useState, useEffect } from "react";

import { delay } from "../../utilities/delay";
import React from "react";

function LoginPage({ handleLogin, isLoginSubmitted, isFailedLogin }) {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(true);
	const [isLoginFailed, setIsLoginFailed] = useState(false);

	useEffect(() => {
		setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
		setIsFormSubmitted((prevIsFormSubmitted) => !prevIsFormSubmitted);
	}, [isLoginSubmitted]);

	useEffect(() => {
		setIsLoginFailed((prevIsLoginFailed) => !prevIsLoginFailed);
	}, [isFailedLogin]);

	async function doFunction(event) {
		event.preventDefault();
		await delay(500);
		handleLogin(event);
	}

	return (
		<>
			<section className="login-page">
				<Animated animationIn="zoomInRight" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
					<div className="lds-default">
						<div></div>
						<div></div>
						<div></div>
						<div>Skill</div>
						{/*  the one below */}
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div>Seeker</div>
						<div></div>
						{/*  the one below */}
						<div></div>
						<div></div>
					</div>
				</Animated>
				{isFormSubmitted ? (
					<Animated animationIn="zoomInLeft" animationInDuration={250} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormSubmitted}>
						<div className="register-page__form-box">
							<div className="register-page__form-value">{isLoginFailed ? <h2 className="register-page__title">Logging In</h2> : <h2 className="register-page__title">Log In Failed</h2>}</div>
							<div className="lds-default">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</Animated>
				) : null}
				{isFormVisible ? (
					<Animated animationIn="zoomInRight" animationInDuration={2500} animationOut="zoomOutLeft" animationOutDuration={250} isVisible={isFormVisible}>
						<div className="login-page__form-box">
							<div className="login-page__form-value">
								<form onSubmit={doFunction}>
									<h2 className="login-page__title animate__animated animate__backInDown">Log In</h2>
									<div className="login-page__inputbox animate__animated animate__backInLeft">
										<input className="login-page__input" type="email" autocomplete="off" name="email" required />
										<label className="login-page__label">Email</label>
									</div>
									<div className="login-page__inputbox animate__animated animate__backInRight">
										<input className="login-page__input" type="password" name="password" required />
										<label className="login-page__label">Password</label>
									</div>
									<div className="login-page__forget">
										<div className="login-page__forgot-password animate__animated animate__backInLeft">
											<button type="submit" className="login-page__button">
												Log in
											</button>
										</div>
									</div>
								</form>
								<div className="login-page__register animate__animated animate__backInRight">
									<Link to="/forgotpassword">
										<div className="login-page__button">Forgot Your Password?</div>
									</Link>
								</div>
								<div className="login-page__register">
									<p className="animate__animated animate__backInLeft">Don't have an account?</p>
									<Link to="/register">
										<div className="login-page__button animate__animated animate__backInUp">Register</div>
									</Link>
								</div>
							</div>
						</div>
					</Animated>
				) : null}
				<Animated animationIn="zoomInLeft" animationInDuration={1500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
					<div className="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</Animated>
			</section>
		</>
	);
}

export default LoginPage;
