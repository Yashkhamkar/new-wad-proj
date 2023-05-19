import React from "react";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import styled from "styled-components";
import axios from "axios";
import Stripe from "stripe";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { products } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);
  const { fullName } = useSelector((state) => state.cart);
  const { flat } = useSelector((state) => state.cart);
  const { area } = useSelector((state) => state.cart);
  const { landmark } = useSelector((state) => state.cart);
  const { city } = useSelector((state) => state.cart);
  const { state } = useSelector((state) => state.cart);
  const { phone } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const quantity = products.length;
  const price = totalPrice * 100;
  const checkout = async () => {
    navigate("/success");
  };
  return (
    <Container style={{ marginTop: "50px" }}>
      <Main>
        <ReviewContainer>
          <h2>Review Your Order</h2>

          <AddressContainer>
            <h5>Shipping Address</h5>

            <div>
              <p>{fullName}</p>
              <p>{flat}</p>
              <p>{area}</p>
              <p>{landmark}</p>
              <p>
                {city} {state}
              </p>
              <p>Phone: {phone}</p>
            </div>
          </AddressContainer>

          <OrderContainer>
            <h5>Your Order</h5>

            <div>
              {products?.map((product) => (
                <Product>
                  <Image>
                    <img src={`/images/${product.img}`} alt="" />
                  </Image>
                  <Description>
                    <h4>{product.title}</h4>

                    <p>₹ {product.price}</p>
                  </Description>
                </Product>
              ))}
            </div>
          </OrderContainer>
        </ReviewContainer>
        <Subtotal>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Subtotal ( {products.length} items ) :{" "}
                  <strong> {totalPrice} ₹</strong>
                </p>
              </>
            )}
            decimalScale={2}
            displayType="text"
            thousandSeparator={true}
            prefix={"₹ "}
          />
          {/* <Stripe/> */}

          <button onClick={checkout}>Place Order</button>
        </Subtotal>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  padding: 15px;
  display: flex;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ReviewContainer = styled.div`
  background-color: #fff;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const AddressContainer = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;
    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }
`;

const PaymentContainer = styled.div`
  margin-top: 15px;
  div {
    margin-top: 15px;
    margin-left: 15px;
    p {
      font-size: 14px;
    }
  }
`;

const OrderContainer = styled.div`
  margin-top: 30px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;
  h4 {
    font-weight: 600;
    font-size: 18px;
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }
  small {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      margin-left: 10px;
    }
  }
  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    outline: none;
    border: 1px solid transparent;
    padding: 0.5rem 1.25rem;
    color: #fff;
    background-color: #f00;
    border-radius: 8px;
    font-size: 18px;
    transition: 150ms all;
    cursor: pointer;
  }
  button:hover {
    border-color: #f00;
    background-color: #fff;
    color: #f00;
  }
`;

export default Payment;
