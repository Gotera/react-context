import { MarketcarProvider } from "common/context/Car";
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
					<MarketcarProvider>
						<Route path="/feira">
							<Feira />
						</Route>
					</MarketcarProvider>
				</UserProvider>
				<Route path="/carrinho">
					<Carrinho />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Router;