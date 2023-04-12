import "./Comment.scss";
import { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";
import api from "../../utilities/api";
import adjustment from "../../assets/icons/008-adjustment.png";
import trash from "../../assets/icons/003-trash.png";
import idCard from "../../assets/icons/002-id-card.png";
import lock from "../../assets/icons/005-protect.png";

function Comment({ refreshComments, comments, nametag, linkprop }) {
	const [userData, setUserData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [newComment, setNewComment] = useState(comments.comment);
	const [displayedComment, setDisplayedComment] = useState(comments.comment);
	const [commentOwnership, setCommentOwnership] = useState(false);
	const [admin, setAdmin] = useState(false);

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
			.get(`admin`)
			.then((response) => {
				return setAdmin(response.data.isAdmin);
			})
			.catch((error) => {
				return console.log(error);
			});
	});

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
			<Animated animationIn="zoomInUp" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
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
									<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={commentOwnership}>
										<div onClick={handleEditClick} className="comment__links-img-container" data-tooltip="Edit Comment">
											<img className="comment__links-img" src={adjustment} alt="Log Out" />
										</div>
									</Animated>
								) : null}
								{admin ? (
									<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={admin}>
										<div onClick={handleDeleteClick} className="comment__links-img-container" data-tooltip="Delete Comment">
											<img className="comment__links-img" src={trash} alt="Log Out" />
										</div>
									</Animated>
								) : null}
								<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
									<Link className="comment__link" to={linkprop}>
										<div className="comment__links-img-container" data-tooltip={nametag}>
											<img className="comment__links-img-user" src={idCard} alt="Log Out" />
										</div>
									</Link>
								</Animated>
							</div>
						</div>
					</div>
				</div>

				{isEditing ? (
					<Animated animationIn="zoomInUp" animationInDuration={500} animationOut="zoomOutDown" animationOutDuration={500} isVisible={isEditing}>
						<form onSubmit={handleSaveClick} className="comment__content-box comment__edit-box">
							<input className="comment__edit-input" type="text" autoComplete="off" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
							<button className="comment__links-img-container" data-tooltip="Submit Change">
								<img className="comment__links-img" src={lock} alt="Log Out" />
							</button>
						</form>
					</Animated>
				) : null}
			</Animated>
		</>
	);
}
export default Comment;
