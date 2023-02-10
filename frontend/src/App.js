import './App.css';
import { Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import LandingPage from './pages/LandingPage';
import SellProductForm from './components/SellProductForm';
import SpecProduct from './pages/SpecProduct';

function App() {
  return (
    <div className="App">
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={Homepage} exact />
      <Route path="/chats" component={ChatPage} exact />
      <Route path="/profile" component={ProfilePage} exact />
      <Route path="/products" component={ProductsPage} exact />
      <Route path='/form' component={SellProductForm} exact />
      <Route path='/specproduct' component={SpecProduct} exact />
    </div>
  );
}

export default App;