import Categories from "../../components/Categories/Categories";
import "./CategoriesPage.scss";
import React, { useState, useEffect } from "react";
import api from "../../utilities/api";

function CategoriesPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		api
			.get(`business`)
			.then((response) => {
				return setData(response.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	}, []);

	return (
		<div className="categories-page">
			<div className="categories-page-box">
				<div className="categories-page__categories-box">
					<Categories data={data} categoryType="Electrician" />
					<Categories data={data} categoryType="Plumbing" />
					<Categories data={data} categoryType="Cosmetology" />
					<Categories data={data} categoryType="Cleaning" />
					<Categories data={data} categoryType="Landscaping" />
				</div>
			</div>
		</div>
	);
}

export default CategoriesPage;
