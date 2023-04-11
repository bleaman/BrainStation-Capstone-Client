import "./Footer.scss";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

function Footer() {
	return (
		<div className="footer">
			<div className="footer__titles">
				<Animated animationIn="zoomInLeft" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
					<div className="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</Animated>
				<Animated animationIn="zoomInUp" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
					<Link className="footer__title" to="/">
						<div>Skill Seeker</div>
					</Link>
				</Animated>
				<Animated animationIn="zoomInRight" animationInDuration={1000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
					<div className="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</Animated>
			</div>
		</div>
	);
}

export default Footer;
