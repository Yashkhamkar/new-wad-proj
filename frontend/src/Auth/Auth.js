import React, { useEffect, useRef, useState } from "react";
import f from "../assets/f.png";
import g from "../assets/g.png";
import swal from "sweetalert";
import bg from "../assets/bg.png";
import validator from "validator";
import "./auth.css";
import GoogleLogin from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import MotionWrap from "../wrapper/MotionWrap";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillLock,
  AiOutlineMail,
} from "react-icons/ai";
import {} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login, register } from "../redux/authSlice";
const Auth = () => {
  //CLient id=752210140374-0lhbesh4lmul5rmm5jvc6n4saki31oef.apps.googleusercontent.com
  //Client secret=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
  const [width, setWidth] = useState(window.innerWidth);
  const [firstLeft, setFirstLeft] = useState("50%");
  const [secondTransform, setSecondTransform] = useState("rotateY(0)");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(false);
  const [strength, setStrength] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogle = () => {};
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      if (width < 700) {
        setFirstLeft("0");
      } else {
        setFirstLeft("50%");
      }
    });
  }, [width]);
  const checkPasswordStrength = (e) => {
    setPassword(e.target.value);
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    if (strongRegex.test(password)) {
      setStrength("strong");
    } else if (mediumRegex.test(password)) {
      setStrength("medium");
    } else {
      setStrength("weak");
    }
  };

  const flipForward = () => {
    if (width < 700) {
      setFirstLeft("0");
    } else {
      setSecondTransform("rotateY(-180deg)");
    }
  };

  const flipBackward = () => {
    if (width < 700) {
      setFirstLeft("100%");
    } else {
      setSecondTransform("rotateY(0)");
    }
  };
  const validEmail = (e) => {
    setEmail(e.target.value);
    setValid(validator.isEmail(e.target.value));
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    var obj;
    if (!email || !password) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    }
    fetch(`/auth/login `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        obj = data;
        if (obj === 0) {
          return swal("Login failed", "Invalid email or password", "error");
        } else {
          swal("YaY", "Login successfull!!!", "success");
          localStorage.setItem("userInfo", JSON.stringify(obj));
          navigate("/");
          dispatch(login(obj));
        }
      });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    var objj;
    if (!name || !email || !password) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    } else if (password !== passwordConfirmation) {
      return swal({
        text: "Passwords are not matching",
        icon: "warning",
      });
    } else if (!valid) {
      return swal({ text: "Please Enter Valid email", icon: "warning" });
    } else {
      fetch(`/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          objj = data;
          if (objj === 0) {
            swal("Registration", "User already exists", "error");
          } else {
            swal("YaY", "Registration successfull", "success");
            localStorage.setItem("userInfo", JSON.stringify(objj));
            navigate("/");
            dispatch(register(objj));
          }
        });
    }
  };

  return (
    <>
      <div className="bb app__wrapper app__flex">
        <Link to="/" className="return">
          <BiArrowBack /> Go back Home
        </Link>
        <div className="container">
          <div className="page" id="first" style={{ left: firstLeft }}>
            <div className="back">
              <div className="outer">
                <div className="content">
                  <div className="form-wrapper">
                    <h1 className="heading">Get's Started</h1>
                    <p className="login-link">
                      Already have an account{" "}
                      <a className="login-btn" onClick={flipForward}>
                        Login
                      </a>
                    </p>
                    {/* <div className="social-logins">
                      <div className="social-login facebook">
                        <img src={f} alt="" />
                        <span>Signup with Facebook</span>
                      </div>
                      <div className="social-login google">
                        <img src={g} alt="" />
                        <span>Signup with Google</span>
                      </div>
                    </div>
                    <div className="or"></div> */}
                    <form id="register" action="#">
                      <div className="item">
                        <label for="login-email">Username</label>
                        <div className="input">
                          <FaUser />
                          <input
                            type="text"
                            id="login-name"
                            placeholder="Enter username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <label for="email">Email address</label>
                        <div className="input">
                          <AiOutlineMail />
                          <input
                            type="email"
                            id="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={validEmail}
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <label for="password">Password</label>
                        <div className="input">
                          <AiFillLock />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={checkPasswordStrength}
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEye className="eye" />
                            ) : (
                              <FaEyeSlash className="eye" />
                            )}
                          </button>
                        </div>
                        <br />
                        <br />
                        <p>
                          Password strength:
                          {strength === "strong" && (
                            <p style={{ color: "green" }}>Strong</p>
                          )}
                          {strength === "medium" && (
                            <p style={{ color: "orange" }}>Medium</p>
                          )}
                          {strength === "weak" && (
                            <p style={{ color: "red" }}>Weak</p>
                          )}
                        </p>
                      </div>
                      <div className="item">
                        <label for="password">Re-Enter Password</label>
                        <div className="input">
                          <AiFillLock />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter Password"
                            value={passwordConfirmation}
                            onChange={(e) =>
                              setPasswordConfirmation(e.target.value)
                            }
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEye className="eye" />
                            ) : (
                              <FaEyeSlash className="eye" />
                            )}
                          </button>
                        </div>
                        <p className="error-msg">
                          Password must be at least 8 character long
                        </p>
                      </div>
                      <div className="item">
                        <button className="btn" onClick={registerSubmit}>
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="page"
            id="second"
            style={{ transform: secondTransform }}
          >
            <div className="front">
              <div className="outer">
                <div className="content">
                  <img src={bg} alt="" />
                </div>
              </div>
            </div>
            <div className="back" id="third">
              <div className="outer">
                <div className="content">
                  <div className="helper-className">
                    <img src={bg} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page" id="fourth">
            <div className="front">
              <div className="outer">
                <div className="content">
                  <div className="form-wrapper">
                    <h1 className="heading">Welcome Back</h1>
                    <p className="login-link">
                      Need a account{" "}
                      <a className="register-btn" onClick={flipBackward}>
                        Register
                      </a>
                    </p>
                    <form id="login" action="#">
                      <div className="item">
                        <label for="login-email">Email address</label>
                        <div className="input">
                          <AiOutlineMail />
                          <input
                            type="email"
                            id="login-email"
                            placeholder="example@mail.com"
                            style={{ backgroundColor: "white" }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <p className="error-msg">
                          Please enter a valid email address
                        </p>
                      </div>
                      <div className="item">
                        <label for="login-password">Password</label>
                        <div className="input">
                          <AiFillLock />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              console.log(password);
                            }}
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEye className="eye" />
                            ) : (
                              <FaEyeSlash className="eye" />
                            )}
                          </button>
                        </div>
                        <p className="error-msg">
                          Password or Email is incorrect
                        </p>
                      </div>
                      <div className="item terms">
                        <div className="input checkbox">
                          <label for="remember">
                            <Link to="/forgot">Forgot Password?</Link>
                          </label>
                        </div>
                      </div>
                      <div className="item">
                        <button className="btn" onClick={loginSubmit}>
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MotionWrap(Auth);
