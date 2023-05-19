import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { clear, removeProduct, setTotalPrice } from "../../redux/cartSlice";
import Navbar from "../Navbar/Navbar";
import classes from "./cart.module.css";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = 0;
  products.map((product) => (totalPrice += product.quantity * product.price));

  const handleRemoveProduct = (id) => {
    console.log(id);
    dispatch(removeProduct({ _id: id }));
  };

  const handleOrder = () => {
    if (user === null) {
      return swal({
        title: "Please Login or Register to order",
        icon: "warning",
      });
    } else if (products.length > 0) {
      dispatch(setTotalPrice(totalPrice));
      navigate("/checkout");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className={classes.product}>
                  <div
                    onClick={() => handleRemoveProduct(product._id)}
                    className={classes.closeBtn}
                  >
                    <AiOutlineClose />
                  </div>
                  <img src={`${product.img}`} className={classes.img} />
                  <div className={classes.productData}>
                    <h3 className={classes.title}>{product.title}</h3>
                    <div className={classes.productAndQuantity}>
                      <span className={classes.quantity}>
                        {product.quantity} x{" "}
                      </span>
                      <span className={classes.price}>
                        <span>₹</span>
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className={classes.noProducts}>
                No products in the cart. Go shopping!
              </h1>
            )}
          </div>
          <div className={classes.right}>
            <div className={classes.totalProductMsg}>
              Total products: {products.length}
            </div>
            <div className={classes.subtotalCheckoutBtns}>
              <span className={classes.subtotal}>Subtotal: ₹{totalPrice}</span>
              <span
                onClick={handleOrder}
                disabled={products.length === 0}
                className={classes.orderNowBtn}
              >
                Order now
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
