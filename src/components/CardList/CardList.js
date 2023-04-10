import Card from "../Card/Card";

function CardList({ data, categoryType }) {
	const filteredBusiness = data.filter((business) => {
		return business.bizcategory === categoryType;
	});

	return filteredBusiness.map((business) => {
		return <Card key={business.id} business={business} />;
	});
}

export default CardList;
