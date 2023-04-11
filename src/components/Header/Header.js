import "./Header.scss";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";
import investigation from "../../assets/icons/001-investigation.png";
import home from "../../assets/icons/homeicon.png";
import lock from "../../assets/icons/007-password.png";

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
							<img className="header__links-img" src={investigation} alt="Categories" />
						</div>
					</NavLink>
				</Animated>
				<Animated animationIn="zoomInDown" animationInDuration={1500} animationOut="zoomOutDown" isVisible={true}>
					<NavLink className="header__nav-link" to="/myprofile">
						<div data-tooltip="My Profile" className="header__links">
							<img className="header__links-img" src={home} alt="My Profile" />
						</div>
					</NavLink>
				</Animated>
				<Animated animationIn="zoomInDown" animationInDuration={2000} animationOut="zoomOutDown" isVisible={true}>
					<div onClick={handleLogOut} data-tooltip="Log Out" className="header__links">
						<img className="header__links-img" src={lock} alt="Log Out" />
					</div>
				</Animated>
			</div>
		</div>
	);
}

export default Header;
