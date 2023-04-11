import "./Categories.scss";
import { Animated } from "react-animated-css";
import CardList from "../CardList/CardList";

function Categories({ data, categoryType }) {
	return (
		<div className="categories">
			<Animated animationIn="zoomInLeft" animationInDuration={3000} animationOut="zoomOutDown" animationOutDuration={500} isVisible={true}>
				<div className="categories__header-text-container">
					<div className="categories__header-text">{categoryType}</div>
				</div>
			</Animated>
			<div className="categories__cards">
				<CardList categoryType={categoryType} data={data} />
			</div>
		</div>
	);
}

export default Categories;
