import "./MyProfilePage.scss";
import Comment from "../../components/Comment/Comment";
import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import api from "../../utilities/api";
import { Link } from "react-router-dom";
import gear from "../../assets/icons/001-gear.png";
import safe from "../../assets/icons/006-safe-box.png";
import bulb from "../../assets/icons/007-bulb.png";
import note from "../../assets/icons/002-note.png";
import trash from "../../assets/icons/003-trash.png";
import avatarBlue from "../../assets/icons/avatarblue.png";

function MyProfilePage(token) {
	const [userData, setUserData] = useState(null);
	const [userComments, setUserComments] = useState(null);
	const [userIdState, setUserIdState] = useState(null);
	const [businessList, setBusinessList] = useState(null);
	const [reRender, setreRender] = useState(0);

	useEffect(() => {
		api
			.get(`myprofile`)
			.then((response) => {
				setUserComments(response.data);
				setUserIdState(response.data[0].user_id);
				return setUserData(response.data[0]);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, []);

	function refreshComments() {
		api
			.get(`myprofile`)
			.then((response) => {
				return setUserComments(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}

	useEffect(() => {
		api
			.get(`business/user/${userIdState}`)
			.then((response) => {
				return setBusinessList(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [userIdState, reRender]);

	function handleDeleteBusiness(businessId) {
		api
			.delete(`business/${businessId}`)
			.then((response) => {
				return setreRender(reRender + 1);
			})
			.catch((error) => {
				return console.log(error);
			});
	}

	if (!userData || !userComments || !businessList) {
		return <div>Loading...</div>;
	}

	return (
		<div className="my-profile-page">
			<div className="my-profile-page__info-container">
				<div className="my-profile-page__top-box">
					<div className="my-profile-page__top-box-left">
						<Animated animationIn="zoomInLeft" animationInDuration={1500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<div className="my-profile-page__top-box-left-image-box">
								<img className="my-profile-page__top-box-left-image avatar" src={avatarBlue} alt="user" />
							</div>
						</Animated>
					</div>
					<div className="my-profile-page__top-box-right">
						<Animated animationIn="zoomInRight" animationInDuration={1250} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<div className="my-profile-page__top-box-right-text-title">{userData.user_name}</div>
						</Animated>
						<Animated animationIn="zoomInRight" animationInDuration={2000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<div className="my-profile-page__top-box-right-text">{userData.email}</div>
						</Animated>
						<Animated animationIn="zoomInRight" animationInDuration={2000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<div className="my-profile-page__top-box-right-text">User ID: {userData.user_id}</div>
						</Animated>
						<div className="my-profile-page__business-buttons-container">
							<Animated animationIn="zoomInLeft" animationInDuration={2000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
								<Link className="header__nav-link" to={`/user/edit/${userIdState}`}>
									<div data-tooltip="Edit User" className="header__links">
										<img className="header__links-img" src={gear} alt="Categories" />
									</div>
								</Link>
							</Animated>
							<Animated animationIn="zoomInRight" animationInDuration={2000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
								<Link className="header__nav-link" to={`/user/password/${userIdState}`}>
									<div data-tooltip="Change Password" className="header__links">
										<img className="header__links-img" src={safe} alt="Categories" />
									</div>
								</Link>
							</Animated>
						</div>
					</div>
				</div>
				<div className="my-profile-page__bottom-box">
					<Animated animationIn="zoomInLeft" animationInDuration={2250} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
						<div className="my-profile-page__top-box-right-text-title">Business Info</div>
					</Animated>
					<div className="my-profile-page__bottom-box-left">
						<Animated animationIn="zoomInLeft" animationInDuration={2250} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
							<Link className="header__nav-link" to="/business/create">
								<div data-tooltip="Create A Business" className="header__links">
									<img className="header__links-img" src={bulb} alt="Categories" />
								</div>
							</Link>
						</Animated>
					</div>
					<div className="my-profile-page__bottom-box-right">
						{businessList.map((business) => {
							return (
								<Animated key={business.id} animationIn="zoomInRight" animationInDuration={2500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
									<div className=" my-profile-page__business-container my-profile-page__business-large-container">
										<Link to={`/business/${business.id}`}>
											<div className="my-profile-page__top-box-right-text">{business.bizname}</div>
										</Link>
										<div className="my-profile-page__business-buttons-container">
											<Link data-tooltip="Edit Business" to={`/business/${business.id}/edit`}>
												<img className="header__links-img" src={note} alt="Categories" />
											</Link>
											<div
												onClick={() => {
													handleDeleteBusiness(business.id);
												}}
												data-tooltip="Delete (Admin)"
											>
												<img className="header__links-img" src={trash} alt="Categories" />
											</div>
										</div>
									</div>
								</Animated>
							);
						})}
					</div>
				</div>
			</div>
			<div className="my-profile-page__comment-box my-profile-page__comments-container">
				<div className="my-profile-page__comment-box-title">Comments</div>
				<div className="lds-heart">
					<div></div>
				</div>
				<div className="my-profile-page__comment-box">
					{userComments.map((comments) => {
						return <Comment refreshComments={refreshComments} linkprop={`/business/${comments.business_id}`} nametag={comments.business_name} key={comments.comment_id} comments={comments} token={token} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default MyProfilePage;
