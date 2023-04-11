import "./ForgotPasswordPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useState } from "react";
import { delay } from "../../utilities/delay";
import api from "../../utilities/api";

function ForgotPasswordPage() {
	const [isFormVisible, setIsFormVisible] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const navigate = useNavigate();

	async function handleForgotPassword(e) {
		e.preventDefault();
		const loginInfo = {
			email: e.target.email.value,
		};
		try {
			const response = await api.post(`password`, loginInfo);
			if (!response) {
				return console.log("There was an error with your request. Please try again.");
			}
			setIsFormVisible(false);
			setIsFormSubmitted(true);
			await delay(500);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<section className="forgot-password">
				<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" isVisible={true}>
					<Link to="/">
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
					</Link>
				</Animated>
				{isFormSubmitted ? (
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" isVisible={isFormSubmitted}>
						<div className="register-page__form-box">
							<div className="register-page__form-value">
								<h2 className="register-page__title animate__animated animate__backInDown">Email Sent</h2>
							</div>
						</div>
					</Animated>
				) : null}
				{isFormVisible ? (
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutLeft" animationOutDuration={500} isVisible={isFormVisible}>
						<div className="forgot-password__form-box">
							<div className="forgot-password__form-value">
								<form onSubmit={handleForgotPassword}>
									<h2 className="forgot-password__title animate__animated animate__backInDown">Password Reset</h2>
									<div className="forgot-password__inputbox animate__animated animate__backInLeft">
										<input className="forgot-password__input" type="email" name="email" pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" required />
										<label className="forgot-password__label">Email</label>
									</div>
									<div className="forgot-password__forget">
										<div className="forgot-password__forgot-password">
											<button type="submit" className="forgot-password__button animate__animated animate__backInUp">
												Send Password Reset Link
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</Animated>
				) : null}
				<Animated animationIn="zoomInRight" animationInDuration={2000} animationOut="zoomOutDown" isVisible={true}>
					<div className="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</Animated>
			</section>
		</>
	);
}

export default ForgotPasswordPage;
