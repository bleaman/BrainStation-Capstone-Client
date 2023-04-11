import "./RegisterPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useState } from "react";
import { delay } from "../../utilities/delay";
import api from "../../utilities/api";

function RegisterPage() {
	const [visible, setVisible] = useState(true);
	const navigate = useNavigate();

	async function handleRegister(e) {
		e.preventDefault();
		const loginInfo = {
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};
		try {
			const response = await api.post(`users`, loginInfo);
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
			<section className="register-page">
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
				<Animated animationIn="zoomInLeft" animationInDuration={3000} animationOut="zoomOutDown" isVisible={visible}>
					<div className="register-page__form-box">
						<div className="register-page__form-value">
							<form onSubmit={handleRegister}>
								<h2 className="register-page__title animate__animated animate__backInDown">Register</h2>
								<div className="register-page__inputbox animate__animated animate__backInLeft">
									<input className="register-page__input" minLength="1" maxLength="50" type="text" name="name" required />
									<label className="register-page__label">Name</label>
								</div>
								<div className="register-page__inputbox animate__animated animate__backInRight">
									<input className="register-page__input" type="email" name="email" pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" required />
									<label className="register-page__label">Email</label>
								</div>
								<div className="register-page__inputbox animate__animated animate__backInLeft">
									<input className="register-page__input" type="password" name="password" required />
									<label className="register-page__label">Password</label>
								</div>
								<div className="register-page__forget">
									<div className="register-page__forgot-password animate__animated animate__backInUp">
										<button type="submit" className="register-page__button">
											Register
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

export default RegisterPage;
