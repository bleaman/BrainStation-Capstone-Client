import "./ForgotPasswordPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useState } from "react";
import { delay } from "../../utilities/delay";
import api from "../../utilities/api";
import { formValidity } from "../../utilities/formValidity";

function ForgotPasswordPage() {
	const [visible, setVisible] = useState(true);
	const navigate = useNavigate();

	async function handleForgotPassword(e) {
		e.preventDefault();
		const loginInfo = {
			email: e.target.email.value,
		};
		const checkValidity = formValidity(loginInfo);
		if (!checkValidity) {
			return;
		}
		try {
			const response = await api.post(`password`, loginInfo);
			if (!response) {
				return console.log("There was an error with your request. Please try again.");
			}
			setVisible(false);
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
				<Animated animationIn="zoomInLeft" animationInDuration={3000} animationOut="zoomOutLeft" animationOutDuration={500} isVisible={visible}>
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
