import "./CreateBusinessPage.scss";
import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { useNavigate } from "react-router-dom";
import api from "../../utilities/api";

function CreateBusinessPage() {
	const [isFormVisible, setIsFormVisible] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [businessName, setBusinessName] = useState("");
	const [businessDescription, setBusinessDescription] = useState("");
	const [businessLocation, setBusinessLocation] = useState("");
	const [businessPhone, setBusinessPhone] = useState("");
	const [businessImg, setBusinessImg] = useState("");
	const [businessCategory, setBusinessCategory] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const bizname = event.target.elements.bizname.value;
		const bizdescription = event.target.elements.bizdescription.value;
		const bizlocation = event.target.elements.bizlocation.value;
		const bizphone = event.target.elements.bizphone.value;
		const bizimg = event.target.elements.bizimg.value;
		const bizcategory = event.target.elements.bizcategory.value;

		setIsFormVisible(false);
		setIsFormSubmitted(true);
		api
			.post(`business`, {
				bizname,
				bizdescription,
				bizlocation,
				bizphone,
				bizimg,
				bizcategory,
			})
			.then((response) => {
				console.log(response.data[0]);
				return navigate(`/business/${response.data[0]}`);
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	return (
		<>
			<section className="create-business">
				{isFormSubmitted ? (
					<Animated animationIn="zoomInLeft" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormSubmitted}>
						<div className="edit-user__form-box">
							<div className="edit-user__form-value">
								<h2 className="edit-user__title">Business Created</h2>
							</div>
						</div>
					</Animated>
				) : null}
				{isFormVisible ? (
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormVisible}>
						<div className="create-business__form-box">
							<div className="create-business__form-value">
								<form onSubmit={handleSubmit}>
									<h2 className="create-business__title animate__animated animate__lightSpeedInRight">Business Information</h2>
									<div className="create-business__inputbox animate__animated animate__lightSpeedInRight">
										<input className="create-business__input" minLength="1" maxLength="50" type="text" autocomplete="off" name="bizname" value={businessName} onChange={(event) => setBusinessName(event.target.value)} required />
										<label className="create-business__label">Name</label>
									</div>
									<div className="create-business__inputbox animate__animated animate__lightSpeedInLeft">
										<input className="create-business__input" minLength="1" maxLength="500" type="text" autocomplete="off" name="bizdescription" value={businessDescription} onChange={(event) => setBusinessDescription(event.target.value)} required />
										<label className="create-business__label">Description</label>
									</div>
									<div className="create-business__inputbox animate__animated animate__lightSpeedInRight">
										<input className="create-business__input" minLength="1" maxLength="250" type="text" autocomplete="off" name="bizlocation" value={businessLocation} onChange={(event) => setBusinessLocation(event.target.value)} required />
										<label className="create-business__label">Location</label>
									</div>
									<div className="create-business__inputbox animate__animated animate__lightSpeedInLeft">
										<input className="create-business__input" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" type="tel" name="bizphone" value={businessPhone} onChange={(event) => setBusinessPhone(event.target.value)} required />
										<label className="create-business__label">Phone Number</label>
									</div>
									<div className="create-business__inputbox animate__animated animate__lightSpeedInRight">
										<input className="create-business__input" type="url" name="bizimg" pattern="https://.*" value={businessImg} onChange={(event) => setBusinessImg(event.target.value)} required />
										<label className="create-business__label">Thumbnail Image Url</label>
									</div>
									<div className="create-business__inputbox animate__animated animate__lightSpeedInLeft">
										<label htmlFor="bizcategory" className="create-business__label-category">
											Category
										</label>
										<select className="create-business__input category" id="bizcategory" name="bizcategory" value={businessCategory} onChange={(event) => setBusinessCategory(event.target.value)}>
											<option value="Electrician">Electrician</option>
											<option value="Plumbing">Plumbing</option>
											<option value="Cosmetology">Cosmetology</option>
											<option value="Landscaping">Landscaping</option>
											<option value="Cleaning">Cleaning</option>
										</select>
									</div>
									<div className="create-business__forget">
										<div className="create-business__forgot-password animate__animated animate__lightSpeedInRight">
											<button type="submit" className="create-business__button">
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

export default CreateBusinessPage;
