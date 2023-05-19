import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import swal from "sweetalert";
import { setAddress } from "../../redux/cartSlice";

const Checkout = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deliver = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !flat || !area || !landmark || !city || !state) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    }
    dispatch(
      setAddress({ fullName, phone, flat, area, landmark, city, state })
    );
    navigate("/payment");
  };

  return (
    <>
      <Container>
        <Main>
          <FormContainer>
            <InputContainer>
              <p>Full Name</p>
              <input
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="John Smith"
                value={fullName}
              />
            </InputContainer>
            <InputContainer>
              <p>Phone Number</p>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </InputContainer>
            <InputContainer>
              <p>Flat, House no. Building, Company</p>
              <input
                type="text"
                onChange={(e) => setFlat(e.target.value)}
                value={flat}
              />
            </InputContainer>
            <InputContainer>
              <p>Area, Colony, Street</p>
              <input
                type="text"
                onChange={(e) => setArea(e.target.value)}
                value={area}
              />
            </InputContainer>
            <InputContainer>
              <p>Landmark</p>
              <input
                type="text"
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
              />
            </InputContainer>
            <InputContainer>
              <p>Town/City</p>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </InputContainer>
            <InputContainer>
              <p>State/Province</p>
              <input
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </InputContainer>

            <button onClick={deliver}>Deliver to this Address</button>
          </FormContainer>
        </Main>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1400px;
  margin: auto;
  position: relative;
`;

const Main = styled.div`
  padding: 15px;
`;

const FormContainer = styled.form`
  // border: 1px solid lightgray;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 55%;
  min-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fff;
  margin: auto;
  button {
    // align-self: flex-start;
    height: 33px;
    width: 250px;
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
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
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    &:hover {
      border: 1px solid orange;
    }
  }
`;
export default Checkout;
