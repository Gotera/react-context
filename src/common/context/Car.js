import { createContext, useContext, useEffect, useState } from "react";

export const MarketCarContext = createContext();
MarketCarContext.displayName = "Marketcar"

export const MarketCarProvider = ({ children }) => {
	const [car, setCar] = useState([])
	const [qtProducts, setQtProducts] = useState(0);
	return (
		<MarketCarContext.Provider
			value={
				{
					car,
					setCar,
					qtProducts,
					setQtProducts
				}
			}>
			{children}
		</MarketCarContext.Provider>
	)
}

export const useMarketCarContext = () => {
	const
		{
			car,
			setCar,
			qtProducts,
			setQtProducts
		} = useContext(MarketCarContext);

	function changeQuantity(id, quantity) {
		return car.map(itemInCar => {
			if (itemInCar.id === id) itemInCar.quantity += quantity;
			return itemInCar;
		});
	}

	function addProduct(newProduct) {
		const hasTheProduct = car.some(itemInCar => itemInCar.id === newProduct.id)
		if (!hasTheProduct) {
			newProduct.quantity = 1;
			return (
				setCar(previousCar =>
					[...previousCar, newProduct])
			);
		}
		setCar(changeQuantity(newProduct.id, +1))
	}

	function removeItem(id) {
		const product = car.find(itemInCar => itemInCar.id === id);
		const lastNumber = product.quantity === 1;
		if (lastNumber) {
			return setCar(previousCar => previousCar.filter(itemInCar => itemInCar.id !== id));
		}
		setCar(changeQuantity(id, -1))
	};

	useEffect(() => {
		const qtProductsInArray = car.reduce((counter, product) => counter + product.quantity, 0)
		setQtProducts(qtProductsInArray);
	}, [car, setQtProducts]);

	return {
		car,
		setCar,
		addProduct,
		removeItem,
		qtProducts,
		setQtProducts
	}
};