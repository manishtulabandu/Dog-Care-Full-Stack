import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, InputGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./TopHeader/Header";
import {projectUrl} from "./configure";
function Login(props) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState("Send OTP");
  const [verify, setVerify] = useState("Verify");
  const [otp2, setotp2] = useState("");
  const handleOtp = async (e) => {
    e.preventDefault();
    setSend("Sending...");
    try {
      const response = await fetch(
          `${projectUrl}` + "generate-otp?user=" + email,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();
        if (json.message != "Fail") {
          setOtp(json.message);
          setSend("Sent");
          setMessage("OTP sent to your email address. Please enter it below.");
        } else {
          setSend("Resend");
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async () => {
    if (otp == otp2) {
      setMessage("");
      setSend("Verified");
    } else {
      setMessage("verification Failed,Try Again...");
      setSend("Resend");
    }
  };
  const {
    page,
    changePage,
    startUp,
    changeStartUp,
    User,
    changeUser,
    product,
    cartItems,
    addItemToCart,
    setProduct,
    showCart,
    setShowCart,
  } = props;
  const [isVisible, setIsVisible] = useState(true);
  const [failMsg, setFailMsg] = useState(false);
  const navigate = useNavigate();

  const [passCheck, setPassCheck] = useState(1);
  const [emailCheck, setEmailCheck] = useState(1);

  const [password, setPassword] = useState("");

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isLengthValid = password.length >= 8;

  const getValidationMessage = () => {
    let message = "";

    if (!hasLowerCase) {
      message += " At least one lowercase letter";
    }

    if (!hasUpperCase) {
      message += " At least one uppercase letter";
    }

    if (!hasNumber) {
      message += " At least one number";
    }

    if (!hasSpecialChar) {
      message += " At least one special character";
    }

    if (!isLengthValid) {
      message += " Minimum length of 8 characters";
    }

    return message;
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData2, setFormData2] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "hi man",
    password: "",
  });
  const [val, setVal] = useState("Submit");
  const [err, setErr] = useState("");
  const handleSubmit = async () => {
    if (formData2.password == formData2.confirmPassword) {
      setVal("saving...");

      try {
        const response = await fetch(
            `${projectUrl}` +
                "/api/user/forgetPassword/" +
            formData2.email +
            "?password=" +
            formData2.password,
            {
              method: "PUT",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const text = await response.json();
          if (text.message == "success") {
            setVal("Submit");
            setShow(false);
            setErr("");
          } else {
            setVal("Submit");
            setErr(text.message);
          }
        }
      } catch (error) {
        setVal("Submit");
        setErr("Network error");
        console.error(error);
      }
    } else {
      setErr("Password and ConfirmPassword are not Matched...");
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const [error, setError] = useState(null);

  const handleChange2 = (event) => {
    if (event.target.name == "email") {
      if (/\S+@\S+\.\S+/.test(event.target.value)) setEmailCheck(1);
      else setEmailCheck(0);
      setEmail(event.target.value);
    }
    if (event.target.name == "otp") {
      setotp2(event.target.value);
    }
    if (event.target.name == "password") {
      setPassword(event.target.value);
    }
    if (event.target.name == "confirmPassword") {
      if (event.target.value != formData2.password) setPassCheck(0);
      else setPassCheck(1);
    }
    setFormData2({
      ...formData2,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = async () => {
    if (formData.password == "admin") {
      console.log("in if");
      navigate("/admin");
    }
    if (formData.password == "inventory") {
      console.log("in if");
      navigate("/im");
    }
    try {
      const response = await fetch(
          `${projectUrl}` +
              "/login?email=" +
          formData.email +
          "&password=" +
          formData.password,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      console.log(response);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();

        console.log(json.message);
        if (json.message == "user") {
          changePage("home");
          changeUser(formData.email);
          navigate("/home");
        } else {
          setFailMsg(true);
        }
        setError(null);
      } else {
        const text = await response.text();

        setError(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const footerScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
      <div>
        <Header
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            product={product}
            setProduct={setProduct}
            setShowCart={setShowCart}
            showCart={showCart}
        />
        <div className="background-image">
          {isVisible ? (
              <div className="auth-wrapperq" style={{ marginTop: "100px" }}>
                <div className="auth-innerq">
                  <>
                    <h3>Sign In</h3>
                    <div>
                      <label>Email address</label>
                      <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          onChange={handleChange}
                          name="email"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Password</label>
                      <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          onChange={handleChange}
                          name="password"
                      />
                    </div>

                    <div className="d-grid" style={{ marginTop: "30px" }}>
                      <button
                          className="btn btn-secondary"
                          href="#"
                          onClick={handleClick}
                      >
                        Submit
                      </button>
                    </div>

                    <>
                      <p className="forgot-password text-right">
                        Forgot <a onClick={handleShow}>password?</a>
                      </p>
                      <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Change Password</Modal.Title>
                        </Modal.Header>
                        <div>
                          <div style={{ margin: "20px 20px" }}>
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Label>Email</Form.Label>
                              <InputGroup>
                                <input
                                    disabled={send == "Verified"}
                                    style={{ width: "70%" }}
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={handleChange2}
                                    name="email"
                                />
                                <Button
                                    style={{ width: "30%" }}
                                    onClick={handleOtp}
                                    disabled={send == "Verified"}
                                >
                                  {send}{" "}
                                </Button>
                              </InputGroup>
                              {message && (
                                  <div className="mb-3">
                                    <p style={{ color: "red" }}>{message}</p>
                                    <div class="buttonIn">
                                      <InputGroup>
                                        <input
                                            style={{ width: "70%" }}
                                            className="form-control"
                                            placeholder={message}
                                            onChange={handleChange2}
                                            name="otp"
                                        />
                                        <Button
                                            style={{ width: "30%" }}
                                            onClick={handleVerify}
                                        >
                                          {verify}
                                        </Button>
                                      </InputGroup>
                                    </div>{" "}
                                  </div>
                              )}
                              {emailCheck == 0 ? (
                                  <p style={{ color: "red", marginTop: "1px" }}>
                                    Invalid Email
                                  </p>
                              ) : null}
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                controlId="formGridPassword"
                                style={{ marginTop: "10px" }}
                            >
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                  type="password"
                                  placeholder="Password"
                                  title={getValidationMessage()}
                                  value={formData2.password}
                                  onChange={handleChange2}
                                  name="password"
                              />
                              {password != "" &&
                              (!hasLowerCase ||
                                  !hasUpperCase ||
                                  !hasNumber ||
                                  !hasSpecialChar ||
                                  !isLengthValid) ? (
                                  <p style={{ color: "red", marginTop: "1px" }}>
                                    Password is too weak
                                  </p>
                              ) : null}
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="formGridPassword"
                                style={{ marginTop: "10px" }}
                            >
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                  type="password"
                                  placeholder="Confirm Password"
                                  onChange={handleChange2}
                                  name="confirmPassword"
                              />
                              {passCheck == 0 ? (
                                  <p style={{ color: "red", marginTop: "1px" }}>
                                    Password Not Matched
                                  </p>
                              ) : null}
                            </Form.Group>
                            <Button
                                className="nav-link"
                                onClick={handleSubmit}
                                style={{
                                  WebkitTextFillColor: "white",
                                  margin: "10px",
                                  width: "100px",
                                  height: "35px",
                                  backgroundColor: "green",
                                  border: "white",
                                  borderRadius: "5px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  float: "right",
                                }}
                                disabled={send != "Verified"}
                            >
                              {val}
                            </Button>

                            {err != "" ? (
                                <p style={{ color: "red" }}>{err}</p>
                            ) : null}
                          </div>
                        </div>
                      </Modal>
                    </>
                  </>
                  {failMsg == true ? (
                      <p style={{ color: "red" }}>Invalid UserName or Password</p>
                  ) : (
                      ""
                  )}
                </div>
              </div>
          ) : null}
        </div>
      </div>
  );
}
export default Login;