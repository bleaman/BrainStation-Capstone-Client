import "./Card.scss";
import { Animated } from "react-animated-css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { delay } from "../../utilities/delay";

function Card({ business }) {
	const navigate = useNavigate();
	const [visible, setVisible] = useState(true);

	async function handleClick() {
		setVisible(false);

		await delay(500);
		navigate(`/business/${business.id}`);
	}

	return (
		<Animated animationIn="zoomInLeft" animationInDuration={2000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={visible}>
			<article onClick={handleClick} className="business-card">
				<img className="business-card__image" loading="lazy" src={business.bizimg} alt="alt" />
				<div className="business-card__time-container">
					<p className="business-card__time">{business.bizname}</p>
				</div>
			</article>
		</Animated>
	);
}

export default Card;
