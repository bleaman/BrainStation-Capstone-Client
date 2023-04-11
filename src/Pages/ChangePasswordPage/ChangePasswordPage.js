import "./ChangePasswordPage.scss";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useNavigate } from "react-router-dom";
import api from "../../utilities/api";

function ChangePasswordPage() {
	const [isFormVisible, setIsFormVisible] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const { userId } = useParams();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const oldpassword = event.target.elements.oldpassword.value;
		const newpassword = event.target.elements.newpassword.value;
		setIsFormVisible(false);
		setIsFormSubmitted(true);
		api
			.put(`password/${userId}`, {
				oldpassword,
				newpassword,
			})
			.then((response) => {
				console.log(response);
				return navigate(`/myprofile`);
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	return (
		<>
			<section className="change-password">
				{isFormSubmitted ? (
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" isVisible={isFormSubmitted}>
						<div className="edit-user__form-box">
							<div className="edit-user__form-value">
								<h2 className="edit-user__title animate__animated animate__lightSpeedInLeft">Password Changed</h2>
							</div>
						</div>
					</Animated>
				) : null}
				{isFormVisible ? (
					<Animated animationIn="zoomInUp" animationInDuration={1000} animationOut="zoomOutDown" isVisible={isFormVisible}>
						<div className="change-password__form-box">
							<div className="change-password__form-value">
								<form onSubmit={handleSubmit}>
									<h2 className="change-password__title animate__animated animate__lightSpeedInRight">Password</h2>
									<div className="change-password__inputbox animate__animated animate__lightSpeedInLeft">
										<input className="change-password__input" type="password" name="oldpassword" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} required />
										<label className="change-password__label">Old Password</label>
									</div>
									<div className="change-password__inputbox animate__animated animate__lightSpeedInRight">
										<input className="change-password__input" type="password" name="newpassword" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
										<label className="change-password__label">New Password</label>
									</div>
									<div className="change-password__forget animate__animated animate__lightSpeedInLeft">
										<div className="change-password__forgot-password">
											<button type="submit" className="change-password__button">
												Submit Changes
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</Animated>
				) : null}
			</section>
		</>
	);
}

export default ChangePasswordPage;
