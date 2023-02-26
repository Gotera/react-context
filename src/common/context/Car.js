import { createContext, useState } from "react";

export const MarketcarContext = createContext();
MarketcarContext.displayName = "Marketcar"

export const MarketcarProvider = ({ children }) => {
	const [car, setCar] = useState([])
	return (
		<MarketcarContext.Provider value={{ car, setCar }}>
			{children}
		</MarketcarContext.Provider>
	)
}