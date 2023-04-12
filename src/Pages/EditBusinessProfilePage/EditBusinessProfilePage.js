import "./EditBusinessProfilePage.scss";
import React, { useState, useEffect } from "react";
import api from "../../utilities/api";
import { Animated } from "react-animated-css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditBusinessProfilePage() {
	const { businessId } = useParams();
	const [businessName, setBusinessName] = useState("");
	const [businessDescription, setBusinessDescription] = useState("");
	const [businessLocation, setBusinessLocation] = useState("");
	const [businessPhone, setBusinessPhone] = useState("");
	const [businessImg, setBusinessImg] = useState("");
	const [businessCategory, setBusinessCategory] = useState("");
	const [isFormVisible, setIsVisible] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`business/${businessId}`);
				setBusinessName(response.data.bizname);
				setBusinessDescription(response.data.bizdescription);
				setBusinessLocation(response.data.bizlocation);
				setBusinessPhone(response.data.bizphone);
				setBusinessImg(response.data.bizimg);
				setBusinessCategory(response.data.bizcategory);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [businessId]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const bizname = event.target.elements.bizname.value;
		const bizdescription = event.target.elements.bizdescription.value;
		const bizlocation = event.target.elements.bizlocation.value;
		const bizphone = event.target.elements.bizphone.value;
		const bizimg = event.target.elements.bizimg.value;
		const bizcategory = event.target.elements.bizcategory.value;
		setIsVisible(false);
		setIsFormSubmitted(true);
		api
			.put(`business/${businessId}`, {
				bizname,
				bizdescription,
				bizlocation,
				bizphone,
				bizimg,
				bizcategory,
			})
			.then((response) => {
				console.log(response);
				return navigate(`/business/${businessId}`);
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	return (
		<>
			<section className="edit-business">
				{isFormSubmitted ? (
					<Animated animationIn="zoomInLeft" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormSubmitted}>
						<div className="edit-user__form-box">
							<div className="edit-user__form-value">
								<h2 className="edit-user__title animate__animated">Info Changed</h2>
							</div>
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
					<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isFormVisible}>
						<div className="edit-business__form-box">
							<div className="edit-business__form-value">
								<form onSubmit={handleSubmit}>
									<h2 className="edit-business__title animate__animated animate__lightSpeedInLeft">Business Information</h2>
									<div className="edit-business__inputbox animate__animated animate__lightSpeedInRight">
										<input className="edit-business__input" minLength="1" maxLength="50" type="text" autoComplete="off" name="bizname" value={businessName} onChange={(event) => setBusinessName(event.target.value)} required />
										<label className="edit-business__label">Name</label>
									</div>
									<div className="edit-business__inputbox animate__animated animate__lightSpeedInLeft">
										<input className="edit-business__input" minLength="1" maxLength="500" type="text" autoComplete="off" name="bizdescription" value={businessDescription} onChange={(event) => setBusinessDescription(event.target.value)} required />
										<label className="edit-business__label">Description</label>
									</div>
									<div className="edit-business__inputbox animate__animated animate__lightSpeedInRight">
										<input className="edit-business__input" minLength="1" maxLength="250" type="text" autoComplete="off" name="bizlocation" value={businessLocation} onChange={(event) => setBusinessLocation(event.target.value)} required />
										<label className="edit-business__label">Location</label>
									</div>
									<div className="edit-business__inputbox animate__animated animate__lightSpeedInLeft">
										<input className="edit-business__input" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="bizphone" value={businessPhone} onChange={(event) => setBusinessPhone(event.target.value)} required />
										<label className="edit-business__label">Phone Number</label>
									</div>
									<div className="edit-business__inputbox animate__animated animate__lightSpeedInRight">
										<input className="edit-business__input" type="url" pattern="https://.*" name="bizimg" value={businessImg} onChange={(event) => setBusinessImg(event.target.value)} required />
										<label className="edit-business__label">Thumbnail Image Url</label>
									</div>
									<div className="edit-business__inputbox animate__animated animate__lightSpeedInLeft">
										<label htmlFor="bizcategory" className="edit-business__label-category">
											Category
										</label>
										<select className="edit-business__input category" id="bizcategory" name="bizcategory" value={businessCategory} onChange={(event) => setBusinessCategory(event.target.value)}>
											<option value="Electrician">Electrician</option>
											<option value="Plumbing">Plumbing</option>
											<option value="Cosmetology">Cosmetology</option>
											<option value="Landscaping">Landscaping</option>
											<option value="Cleaning">Cleaning</option>
										</select>
									</div>
									<div className="edit-business__forget">
										<div className="edit-business__forgot-password animate__animated animate__lightSpeedInRight">
											<button type="submit" className="edit-business__button">
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

export default EditBusinessProfilePage;
