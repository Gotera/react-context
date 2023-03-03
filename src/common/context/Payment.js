const { createContext, useState, useContext } = require("react");

export const PaymentContext = createContext();
PaymentContext.displayName = "Payment"

export const PaymentProvider = ({ children }) => {
	const typesOfPayment = [{
		name: "Boleto",
		interest: 1,
		id: 1
	}, {
		name: "Cartão de Crédito",
		interest: 1.3,
		id: 2
	}, {
		name: "PIX",
		interest: 1,
		id: 3
	}, {
		name: "Crediário",
		interest: 1.5,
		id: 4
	}]
	const [paymentMethod, setPaymentMethod] = useState(typesOfPayment[0])
	return (
		<PaymentContext.Provider value={
			{
				typesOfPayment,
				paymentMethod,
				setPaymentMethod
			}
		}>
			{children}
		</PaymentContext.Provider>
	)
}

export const usePaymentContext = () => {
	const {
		typesOfPayment,
		paymentMethod,
		setPaymentMethod
	} = useContext(PaymentContext);

	function changePaymentMethod(id) {
		const currentPayment = typesOfPayment.find(payment => payment.id === id);
		setPaymentMethod(currentPayment)
	}

	return {
		typesOfPayment,
		paymentMethod,
		changePaymentMethod
	}
}