import "./EditUserProfilePage.scss";
import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import api from "../../utilities/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditUserProfilePage() {
	const { userId } = useParams();
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const navigate = useNavigate();
	const [isFormVisible, setIsVisible] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`users/${userId}`);
				setUserName(response.data.name);
				setUserEmail(response.data.email);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [userId]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const name = event.target.elements.bizname.value;
		const email = event.target.elements.bizdescription.value;
		setIsVisible(false);
		setIsFormSubmitted(true);
		api
			.put(`users/${userId}`, {
				name,
				email,
			})
			.then((response) => {
				return navigate(`/myprofile`);
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	return (
		<>
			<section className="edit-user">
				{isFormSubmitted ? (
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormSubmitted}>
						<div className="edit-user__form-box">
							<div className="edit-user__form-value">
								<h2 className="edit-user__title animate__animated animate__lightSpeedInLeft">Info Changed</h2>
							</div>
						</div>
					</Animated>
				) : null}
				{isFormVisible ? (
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormVisible}>
						<div className="edit-user__form-box">
							<div className="edit-user__form-value">
								<form onSubmit={handleSubmit}>
									<h2 className="edit-user__title animate__animated animate__lightSpeedInLeft">User Info</h2>
									<div className="edit-user__inputbox animate__animated animate__lightSpeedInRight">
										<input className="edit-user__input" minLength="1" maxLength="50" type="text" name="username" value={userName} onChange={(event) => setUserName(event.target.value)} required />
										<label className="edit-user__label">Name</label>
									</div>
									<div className="edit-user__inputbox animate__animated animate__lightSpeedInLeft">
										<input className="edit-user__input" type="email" name="useremail" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" required />
										<label className="edit-user__label">Email</label>
									</div>
									<div className="edit-user__forget">
										<div className="edit-user__forgot-password animate__animated animate__lightSpeedInRight">
											<button type="submit" className="edit-user__button">
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

export default EditUserProfilePage;
