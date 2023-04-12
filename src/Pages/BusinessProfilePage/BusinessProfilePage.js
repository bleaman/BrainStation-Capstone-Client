import "./BusinessProfilePage.scss";
import Comment from "../../components/Comment/Comment";
import { Animated } from "react-animated-css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utilities/api";
import { delay } from "../../utilities/delay";
import call from "../../assets/icons/001-call.png";
import mail from "../../assets/icons/005-mail.png";
import like from "../../assets/icons/001-like.png";
import chat from "../../assets/icons/001-chat.png";
import safe from "../../assets/icons/005-protect.png";

function BusinessProfilePage() {
	const [businessData, setBusinessData] = useState(null);
	const [businessComments, setBusinessComments] = useState(null);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isAnimationVisible, setIsAnimationVisible] = useState(false);
	const [businessLikes, setBusinessLikes] = useState(0);
	const [newComment, setNewComment] = useState("");
	const { businessId } = useParams();

	async function handleCommentButtonClick() {
		setIsAnimationVisible(!isAnimationVisible);
		await delay(500);
		setIsFormVisible(!isFormVisible);
	}

	async function handleNewCommentSubmit(event) {
		event.preventDefault();

		try {
			const response = await api.post(`business/${businessId}/comments`, {
				comment: newComment,
			});
			setBusinessComments(response.data);
			setNewComment("");
			setIsAnimationVisible(false);
			await delay(1000);
			setIsFormVisible(false);
		} catch (error) {
			console.log(error);
		}
	}

	const handleLikeClick = async () => {
		try {
			const response = await api.post(`business/${businessId}/likes`);
			return setBusinessLikes(response.data.numberOfLikes);
		} catch (error) {
			return console.log(error);
		}
	};

	useEffect(() => {
		api
			.get(`business/${businessId}`)
			.then((response) => {
				return setBusinessData(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [businessId]);

	useEffect(() => {
		api
			.get(`business/${businessId}/comments`)
			.then((response) => {
				return setBusinessComments(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [businessId]);

	function refreshComments() {
		api
			.get(`business/${businessId}/comments`)
			.then((response) => {
				return setBusinessComments(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}

	useEffect(() => {
		api
			.get(`business/${businessId}/likes`)
			.then((response) => {
				return setBusinessLikes(response.data.NumberOfLikes);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [businessId]);

	if (!businessData || !businessComments) {
		return <div>Loading...</div>;
	}

	return (
		<div className="business-profile-page">
			<div className="business-profile-page__info-container">
				<div className="business-profile-page__top-box">
					<div className="business-profile-page__top-box-right">
						<Animated animationIn="zoomInDown" animationInDuration={1250} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<div className="business-profile-page__top-box-right-text-title">{businessData.bizname}</div>
						</Animated>
						<Animated animationIn="zoomInLeft" animationInDuration={2250} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<div className="business-profile-page__top-box-right-text">{businessData.bizlocation}</div>
							<div className="business-profile-page__top-box-map">
								<div className="map-test">
									{/* https://www.google.com/maps/embed/v1/directions?key=AIzaSyBO9jPaQbIkW7BjI_WftCKyHUQUBtEWfbo&origin=${location}&destination=${businessData.bizlocation}&avoid=tolls|highways */}
									<iframe title="Google Map" width="100%" height="100%" style={{ border: 0 }} referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBO9jPaQbIkW7BjI_WftCKyHUQUBtEWfbo&q=${businessData.bizlocation}&zoom=10`} allowFullScreen></iframe>
								</div>
							</div>
						</Animated>
						<div className="business-profile-page__top-box-right-text">
							<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
								<a href={`tel:${businessData.bizphone}`}>
									<div data-tooltip={businessData.bizphone} className="header__links">
										<img className="header__links-img business-profile-page__likes-img" src={call} alt="Categories" />
									</div>
								</a>
							</Animated>
							<Animated animationIn="zoomInRight" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
								<a href={`mailto:${businessData.email}`}>
									<div data-tooltip={businessData.email} className="header__links">
										<img className="header__links-img business-profile-page__likes-img" src={mail} alt="Categories" />
									</div>
								</a>
							</Animated>
						</div>
					</div>
					<div className="business-profile-page__top-box-left">
						<div className="business-profile-page__top-box-left-image-box">
							<Animated animationIn="zoomInRight" animationInDuration={1500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
								<img className="business-profile-page__top-box-left-image" src={businessData.bizimg} alt="business" />
							</Animated>
							<div className="business-profile-page__like-comment-box">
								<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
									<div data-tooltip={`Likes: ${businessLikes}`} className="header__links">
										<img onClick={handleLikeClick} className="header__links-img business-profile-page__likes-img" src={like} alt="Categories" />
									</div>
								</Animated>
								<Animated animationIn="zoomInRight" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
									<div onClick={handleCommentButtonClick} data-tooltip="Post A Comment" className="header__links">
										<img className="header__links-img" src={chat} alt="Categories" />
									</div>
								</Animated>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="business-profile-page__comment-box business-profile-page__comments-container">
				<div className="business-profile-page__comment-box-title">Comments</div>
				<div className="lds-heart">
					<div></div>
				</div>
				{isFormVisible ? (
					<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isAnimationVisible}>
						<div className="comment__width-fix">
							<form onSubmit={handleNewCommentSubmit} className="comment__content-box comment__edit-box">
								<input className="comment__edit-input" name="comment" type="text" autoComplete="off" value={newComment} onChange={(e) => setNewComment(e.target.value)} autoFocus />
								<button className="comment__links-img-container" data-tooltip="Post Comment">
									<img className="comment__links-img" src={safe} alt="Log Out" />
								</button>
							</form>
						</div>
					</Animated>
				) : null}
				<div className="business-profile-page__comment-box">
					{businessComments.map((comments) => {
						return <Comment refreshComments={refreshComments} linkprop={`/user/${comments.user_id}`} nametag={comments.user_name} key={comments.comment_id} comments={comments} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default BusinessProfilePage;
