import { useContext } from "react";
import { CartActionType, CartContext } from "../../Contexts/CartContext";
import Coupon from "../../models/coupon";
import "./PurchaseModal.css";

interface PurchaseModalProps {
  setModalShow: Function;
  couponToBePurchased?: any;
  CouponPurchase: Function;
  message: string;
}
function PurchaseModal(props: PurchaseModalProps): JSX.Element {
  const { cartState, cartDispatch } = useContext(CartContext);

  const removeCouponFromCart = (coupon: Coupon) => {
    cartDispatch({ type: CartActionType.REMOVE_FROM_CART, payload: coupon });
  };

  const finalizePurchase = () => {
    props.CouponPurchase(props.couponToBePurchased);
    props.setModalShow(false);
    if (props.couponToBePurchased !== undefined) {
      cartState.coupons.forEach((coupon) => {
        if (coupon.id === props.couponToBePurchased.id) {
          removeCouponFromCart(props.couponToBePurchased);
        }
      });
    }
  };
  return (
    <div className="PurchaseModal">
      <div className="purchase-modal-center">
        <button
          onClick={() => props.setModalShow(false)}
          className="close-btn"
        ></button>
        <div>
          {props.message}
          <div className="purchase-coupons-btn-container">
            <button
              onClick={() => finalizePurchase()}
              className="coupon-purchase-btn"
            >
              purchase
            </button>
            <button
              onClick={() => props.setModalShow(false)}
              className="cancel-btn"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
