import './App.css';
import Header from './components/Header/Header';
import OrderReview from './components/OrderReview/OrderReview';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthProvider from './contextApi/AuthProvider';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import Shipping from './components/Shipping/Shipping';
import Order from './components/Order/Order';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/home">
            <Shop />
          </Route>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/review">
            <OrderReview />
          </Route>
          <PrivateRouter path="/placeOrder">
            <PlaceOrder />
          </PrivateRouter>
          <PrivateRouter path="/shipping">
            <Shipping />
          </PrivateRouter>
          <PrivateRouter path="/order">
            <Order />
          </PrivateRouter>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
