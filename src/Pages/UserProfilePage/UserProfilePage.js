import "./UserProfilePage.scss";
import Comment from "../../components/Comment/Comment";
import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import { Link, useParams } from "react-router-dom";
import api from "../../utilities/api";
import avatarBlue from "../../assets/icons/avatarblue.png";

function UserProfilePage() {
	const [userData, setUserData] = useState(null);
	const [userComments, setUserComments] = useState(null);
	const [userIdState, setUserIdState] = useState(null);
	const [businessList, setBusinessList] = useState(null);

	const { userId } = useParams();

	useEffect(() => {
		api
			.get(`users/${userId}/comments`)
			.then((response) => {
				setUserComments(response.data);
				setUserIdState(response.data[0].user_id);
				return setUserData(response.data[0]);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [userId]);

	function refreshComments() {
		api
			.get(`users/${userId}/comments`)
			.then((response) => {
				setUserComments(response.data);
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
	}, [userIdState]);

	if (!userData || !userComments || !businessList) {
		return <div>Loading...</div>;
	}

	return (
		<div className="user-profile-page">
			<div className="user-profile-page__info-container">
				<div className="user-profile-page__top-box">
					<div className="user-profile-page__top-box-left">
						<Animated animationIn="zoomInLeft" animationInDuration={1500} animationOut="zoomOutDown" isVisible={true}>
							<div className="user-profile-page__top-box-left-image-box">
								<img className="user-profile-page__top-box-left-image avatar" src={avatarBlue} alt="user" />
							</div>
						</Animated>
					</div>
					<div className="user-profile-page__top-box-right">
						<Animated animationIn="zoomInRight" animationInDuration={1250} animationOut="zoomOutDown" isVisible={true}>
							<div className="user-profile-page__top-box-right-text-title">{userData.user_name}</div>
						</Animated>
						<Animated animationIn="zoomInRight" animationInDuration={1750} animationOut="zoomOutDown" isVisible={true}>
							<div className="user-profile-page__top-box-right-text">{userData.email}</div>
						</Animated>
						<Animated animationIn="zoomInLeft" animationInDuration={1750} animationOut="zoomOutDown" isVisible={true}>
							<div className="user-profile-page__top-box-right-text">User ID: {userData.user_id}</div>
						</Animated>
					</div>
				</div>
				<div className="user-profile-page__bottom-box">
					<Animated animationIn="zoomInLeft" animationInDuration={2000} animationOut="zoomOutDown" isVisible={true}>
						<div className="user-profile-page__top-box-right-text-title">Business Info</div>
					</Animated>
					<div className="user-profile-page__bottom-box-right">
						{businessList.map((business) => {
							return (
								<Animated key={business.id} animationIn="zoomInRight" animationInDuration={2250} animationOut="zoomOutDown" isVisible={true}>
									<div className=" user-profile-page__business-container user-profile-page__business-large-container">
										<Link className="user-profile-page__business-link" to={`/business/${business.id}`}>
											<div className="user-profile-page__top-box-right-text">{business.bizname}</div>
										</Link>
									</div>
								</Animated>
							);
						})}
					</div>
				</div>
			</div>
			<div className="user-profile-page__comment-box user-profile-page__comments-container">
				<div className="user-profile-page__comment-box-title">Comments</div>
				<div className="lds-heart">
					<div></div>
				</div>

				<div className="user-profile-page__comment-box">
					{userComments.map((comments) => {
						return <Comment refreshComments={refreshComments} linkprop={`/business/${comments.business_id}`} nametag={comments.business_name} key={comments.comment_id} comments={comments} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default UserProfilePage;
