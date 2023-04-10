import "./Comment.scss";
import { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";
import api from "../../utilities/api";

function Comment({ refreshComments, comments, nametag, linkprop }) {
	const [userData, setUserData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [newComment, setNewComment] = useState(comments.comment);
	const [displayedComment, setDisplayedComment] = useState(comments.comment);
	const [commentOwnership, setCommentOwnership] = useState(false);

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleDeleteClick = async () => {
		api
			.delete(`comments/${comments.comment_id}`)
			.then((response) => {
				refreshComments();
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	const handleSaveClick = (e) => {
		e.preventDefault();
		api
			.put(`comments/${comments.comment_id}`, {
				comment: newComment,
			})
			.then((response) => {
				setIsEditing(false);
				setDisplayedComment(newComment);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		api
			.get(`comments/ownership/${comments.comment_id}`)
			.then((response) => {
				return setCommentOwnership(response.data.ownership);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [comments]);

	useEffect(() => {
		api
			.get(`users/${comments.user_id}`)
			.then((response) => {
				return setUserData(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, [comments]);

	function toggleHamburgerMenu() {
		const hamburgerMenuContent = document.querySelector(`.hamburger${comments.comment_id}`);
		hamburgerMenuContent.classList.toggle("show");
	}

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Animated animationIn="zoomInUp" animationInDuration={1000} animationOut="zoomOutDown" isVisible={true}>
				<div className="comment__content-box">
					<div className="comment__left-side">{displayedComment}</div>
					<div className="comment__right-side">
						<div className="comment__hamburger-menu-container">
							<label htmlFor="hamburger-menu" className="hamburger-menu-label" onClick={toggleHamburgerMenu}>
								<span></span>
								<span></span>
								<span></span>
							</label>
							<div className={`hamburger-menu-content hamburger${comments.comment_id}`}>
								{commentOwnership ? (
									<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" isVisible={commentOwnership}>
										<div onClick={handleEditClick} className="comment__links-img-container" data-tooltip="Edit Comment">
											<img className="comment__links-img" src={"http://localhost:9950/public/images/008-adjustment.png"} alt="Log Out" />
										</div>
									</Animated>
								) : null}
								{commentOwnership ? (
									<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" isVisible={commentOwnership}>
										<div onClick={handleDeleteClick} className="comment__links-img-container" data-tooltip="Delete Comment">
											<img className="comment__links-img" src={"http://localhost:9950/public/images/003-trash.png"} alt="Log Out" />
										</div>
									</Animated>
								) : null}
								<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" isVisible={true}>
									<Link to={linkprop}>
										<div className="comment__links-img-container" data-tooltip={nametag}>
											<img className="comment__links-img-user" src={"http://localhost:9950/public/images/002-id-card.png"} alt="Log Out" />
										</div>
									</Link>
								</Animated>
							</div>
						</div>
					</div>
				</div>

				{isEditing ? (
					<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" isVisible={isEditing}>
						<form onSubmit={handleSaveClick} className="comment__content-box comment__edit-box">
							<input className="comment__edit-input" type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
							<button className="comment__links-img-container" data-tooltip="Submit Change">
								<img className="comment__links-img" src={"http://localhost:9950/public/images/005-protect.png"} alt="Log Out" />
							</button>
						</form>
					</Animated>
				) : null}
			</Animated>
		</>
	);
}
export default Comment;
