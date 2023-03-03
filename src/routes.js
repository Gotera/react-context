import { MarketCarProvider } from "common/context/Car";
import { PaymentProvider } from "common/context/Payment";
import { UserProvider } from "common/context/User";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<UserProvider>
					<Route exact path="/">
						<Login />
					</Route>
					<MarketCarProvider>
						<PaymentProvider>
							<Route path="/feira">
								<Feira />
							</Route>
							<Route path="/carrinho">
								<Carrinho />
							</Route>
						</PaymentProvider>
					</MarketCarProvider>
				</UserProvider>
			</Switch>
		</BrowserRouter>
	)
}

export default Router;