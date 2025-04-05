import { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import type { RootState } from "../store";
import Basket from "../assets/basket.svg";
import "../styles/Header.css";
import Modal from "./Modal";
import Cart from "../pages/Cart";
import { CartItem } from "../types";
import Button from "./Button";


interface HeaderProps {
  cartItems: CartItem[];
}

interface HeaderState {
  isCartModalOpen: boolean;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isCartModalOpen: false,
    };
  }

  openCartModal = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ isCartModalOpen: true });
  };

  closeCartModal = () => {
    this.setState({ isCartModalOpen: false });
  };

  render() {
    const { cartItems } = this.props;
    const { isCartModalOpen } = this.state;
    const hasItems = cartItems.length > 0;

    return (
      <>
        <header className="header">
          <Link to="/" className="header__logo">
            <h1>MyShop</h1>
          </Link>
          <Button
            className={`header__cart-button ${
              hasItems ? "header__cart-button--has-items" : ""
            }`}
            onClick={this.openCartModal}
          >
            <img
              src={Basket}
              alt="Koszyk"
              title="Koszyk"
              className="header__cart-icon"
            />
            {hasItems && (
              <span className="header__cart-count">{cartItems.length}</span>
            )}
          </Button>
        </header>

        <Modal
          isOpen={isCartModalOpen}
          onClose={this.closeCartModal}
          title="Podgląd koszyka"
        >
          <Cart isModal={true} onClose={this.closeCartModal} />
        </Modal>
      </>
    );
  }

  componentDidMount() {
    console.log("Strona uruchomiona");
  }

  componentDidUpdate(prevProps: HeaderProps) {
    if (prevProps.cartItems.length !== this.props.cartItems.length) {
      console.log("Nowy przedmiot w koszyku");
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  cartItems: state.cart.items,
});

export default connect(mapStateToProps)(Header);
