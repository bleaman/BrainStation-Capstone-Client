import "./Header.scss";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

function Header() {
	function handleLogOut() {
		localStorage.removeItem("token");
		window.location.href = "/";
	}

	return (
		<div className="header">
			<div className="header__titles">
				<Animated animationIn="zoomInDown" animationInDuration={1000} animationOut="zoomOutDown" isVisible={true}>
					<NavLink className="header__nav-link" to="/categories">
						<div data-tooltip="Categories" className="header__links">
							<img className="header__links-img" src={"http://localhost:9950/public/images/001-investigation.png"} alt="Categories" />
						</div>
					</NavLink>
				</Animated>
				<Animated animationIn="zoomInDown" animationInDuration={1500} animationOut="zoomOutDown" isVisible={true}>
					<NavLink className="header__nav-link" to="/myprofile">
						<div data-tooltip="My Profile" className="header__links">
							<img className="header__links-img" src={"http://localhost:9950/public/images/homeicon.png"} alt="My Profile" />
						</div>
					</NavLink>
				</Animated>
				<Animated animationIn="zoomInDown" animationInDuration={2000} animationOut="zoomOutDown" isVisible={true}>
					<div onClick={handleLogOut} data-tooltip="Log Out" className="header__links">
						<img className="header__links-img" src={"http://localhost:9950/public/images/007-password.png"} alt="Log Out" />
					</div>
				</Animated>
			</div>
		</div>
	);
}

export default Header;
