import { createContext, useContext, useEffect, useState } from "react";
import { usePaymentContext } from "./Payment";
import { UserContext } from "./User";

export const MarketCarContext = createContext();
MarketCarContext.displayName = "Marketcar"

export const MarketCarProvider = ({ children }) => {
	const [car, setCar] = useState([])
	const [qtProducts, setQtProducts] = useState(0);
	const [currentCarPrice, setCurrentCarPrice] = useState(0);
	return (
		<MarketCarContext.Provider
			value={
				{
					car,
					setCar,
					qtProducts,
					setQtProducts,
					currentCarPrice,
					setCurrentCarPrice
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
			setQtProducts,
			currentCarPrice,
			setCurrentCarPrice
		} = useContext(MarketCarContext);

	const { paymentMethod } = usePaymentContext();
	const { setBalance } = useContext(UserContext)

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

	function buy() {
		setCar([]);
		setBalance(balance => balance - currentCarPrice)
	}

	useEffect(() => {
		const { currentPrice, qtProductsInArray } = car.reduce((counter, product) => ({
			qtProductsInArray: counter.qtProductsInArray + product.quantity,
			currentPrice: counter.currentPrice + (product.price * product.quantity)
		}), {
			qtProductsInArray: 0,
			currentPrice: 0
		})
		setQtProducts(qtProductsInArray);
		setCurrentCarPrice(currentPrice * paymentMethod.interest);
	}, [car, setQtProducts, setCurrentCarPrice, paymentMethod]);

	return {
		car,
		setCar,
		addProduct,
		removeItem,
		qtProducts,
		setQtProducts,
		currentCarPrice,
		buy
	}
};