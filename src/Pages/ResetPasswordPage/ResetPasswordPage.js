import "./ResetPasswordPage.scss";
import { useParams } from "react-router-dom";
import { Animated } from "react-animated-css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../utilities/api";
import { delay } from "../../utilities/delay";

function ResetPasswordPage() {
	const [visible, setVisible] = useState(true);
	const navigate = useNavigate();
	let { token } = useParams();

	async function handleResetPassword(e, resetToken) {
		e.preventDefault();
		const loginInfo = {
			token: resetToken,
			password: e.target.elements.password.value,
		};
		try {
			const response = await api.put("/password", loginInfo);
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
			<section className="reset-password">
				<Animated animationIn="zoomInRight" animationInDuration={1000} animationOut="zoomOutDown" isVisible={true}>
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
				<Animated animationIn="zoomInLeft" animationInDuration={3000} animationOut="zoomOutDown" isVisible={visible}>
					<div className="reset-password__form-box">
						<div className="reset-password__form-value">
							<form
								onSubmit={(e) => {
									handleResetPassword(e, token);
								}}
							>
								<h2 className="reset-password__title animate__animated animate__backInDown">Reset Your Password</h2>
								<div className="reset-password__inputbox animate__animated animate__backInLeft">
									<input className="reset-password__input" type="password" name="password" required />
									<label className="reset-password__label">Password</label>
								</div>
								<div className="reset-password__forget">
									<div className="reset-password__forgot-password animate__animated animate__backInUp">
										<button type="submit" className="reset-password__button">
											Submit
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

export default ResetPasswordPage;
