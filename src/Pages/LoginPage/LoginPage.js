import "./LoginPage.scss";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useState } from "react";
import { delay } from "../../utilities/delay";

function LoginPage({ handleLogin }) {
	const [isFormVisible, setIsFormVisible] = useState(true);

	async function doFunction(event) {
		event.preventDefault();
		setIsFormVisible(false);
		await delay(500);
		handleLogin(event);
	}

	return (
		<>
			<section className="login-page">
				<Animated animationIn="zoomInRight" animationInDuration={1000} animationOut="zoomOutDown" isVisible={true}>
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
				<Animated animationIn="zoomInRight" animationInDuration={3000} animationOut="zoomOutLeft" animationOutDuration={500} isVisible={isFormVisible}>
					<div className="login-page__form-box">
						<div className="login-page__form-value">
							<form onSubmit={doFunction}>
								<h2 className="login-page__title animate__animated animate__backInDown">Log In</h2>
								<div className="login-page__inputbox animate__animated animate__backInLeft">
									<input className="login-page__input" type="email" name="email" required />
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
				<Animated animationIn="zoomInLeft" animationInDuration={2000} animationOut="zoomOutDown" isVisible={true}>
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
