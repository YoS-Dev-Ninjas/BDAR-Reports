import React,{ Fragment, useEffect, useState} from 'react';
import { useRef } from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function LoginPage() {
  
  const navigate = useNavigate();
  
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');
  
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
  };
  const handleClick = (event) => {
    SetCredentials(User,Pass)

  };
  const SetCredentials = async (User,Pass) => {
    try {
      const response = await fetch(`http://10.50.4.10:5000/Login/UserName/${User}/PassW/${Pass}`).then(response =>
      {
        navigate("/Dashboards")
      // if(response.data == 'Logged-In')
      // {
      //   alert("User logged in")
      // }
      // else
      // {
      //   alert(response.data)
      // }
      })
    } catch (error) {
      console.error('Error Verifying Credentials', error);
    }
  };


useEffect(() => {
    Axios.get("http://10.50.4.10:5000/LoggedIn").then((resp) => {
      if (resp.data == 'Valid')
      {
        alert("Logged in");
      }
      else
      {
        alert("INVALID CREDENTIALS");
      }
    });
  }, []);

  return (
    <div>
<>
  <meta charSet="UTF-8" />
  <meta
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    name="viewport"
  />
  <title>BDAR Reports| Login</title>
  {/* Favicon*/}
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  {/* Google Fonts */}
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext"
    rel="stylesheet"
    type="text/css"
  />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
    type="text/css"
  />
  {/* Bootstrap Core Css */}
  <link href="plugins2/bootstrap/css/bootstrap.css" rel="stylesheet" />
  {/* Waves Effect Css */}
  <link href="plugins2/node-waves/waves.css" rel="stylesheet" />
  {/* Animation Css */}
  <link href="plugins2/animate-css/animate.css" rel="stylesheet" />
  {/* Custom Css */}
  <link href="css/style.css" rel="stylesheet" />
<div className="login-box" style={{ backgroundColor: "transparent" , width : "35%",margin:"auto"}} align="center">
    <div className="logo" style={{marginTop : "100px",backgroundColor:"white",borderRadius:"8px"}}>
      <a href="javascript:void(0);">        
        <img src="NIRA.png" width="150px" height="60px" />
      </a>
    </div>
    <a href="javascript:void(0);"></a>
    <div className="card">
      <a href="javascript:void(0);"></a>
      <div className="body">
        <a href="javascript:void(0);"></a>
        <form
          id="sign_in"
          method="post"        
          style={{ backgroundColor: "transparent" , width : "100%"}}
        >       
            <div className="msg">
              <h1
                className="btn btn-block  waves-effect"
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  backgroundColor: "black",
                  color: "white",
                  textDecoration : "none",
                  marginBottom : "30px",
                  borderRadius : "5px"
                }}
              >
               <h5>BIRTH, DEATH & ADOPTION REGISTRATON SYSTEM</h5>
               <h5>REPORTING & VITAL STATISTICS</h5>
              </h1>
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="material-icons">person</i>
              </span>
              <div className="form-line">
                <input
                  type="text"
                  className="form-control input-border-bottom borders"
                  name="User"
                  placeholder="Enter Username or Email"
                  required=""
                  autofocus=""
                  value={User} 
                  onChange={handleUserChange}
                  style={{borderBottom : "3px solid black",padding:"10px"}}
                />
              </div>
            </div>
            <div className="input-group">
              <span className="input-group-addon">
                <i className="material-icons">lock</i>
              </span>
              <div className="form-line">
                <input
                  type="password"                  
                  name="Pass"
                  placeholder="Enter Password"
                  required=""
                  value={Pass} 
                  onChange={handlePassChange}
                  className="form-control input-border-bottom borders"
                  style={{borderBottom : "3px solid black",padding:"10px"}}
                />
              </div>
            </div>
            <div className="row">
               <div className="col-xs-6 p-t-10">
              {/* <input
                  type="checkbox"
                  name="rememberme"
                  id="rememberme"
                  className="filled-in chk-col-pink"
                />
                 <label
                  htmlFor="rememberme"
                  style={{ fontWeight: "bold", color: "black" }}
                >
                  Remember Me
                </label>*/}
              </div>
              <div className="col-xs-6">
                <button
                  className="btn btn-block waves-effect"
                  type="button"
                  name="Login"
                  onClick={handleClick}
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    backgroundColor: "#b30000",
                    color: "white",
                    padding: "7px",
                    borderRadius : "8px"
                  }}
                >
                  Login
                </button>
              </div>
            </div>
        
          <div className="row m-t-15 m-b--20">
            <a href="javascript:void(0);"></a>
            <div className="col-xs-12">
             
              <span href="#" style={{ fontWeight: "bold", color: "#b30000" }}>
                <strong>COPYRIGHT © { 2023 }&nbsp;</strong>
              </span>
              <strong>
                <span style={{ fontWeight: "bold", color: "#b30000" }}>
                  {" "}
                  {"|  USPC"} 
                </span>
                .
              </strong>
            </div>
            {/* <div class="col-xs-6 align-right">
                      <a href="forgot-password.html">Forgot Password?</a>
                  </div> */}
          </div>
        </form>
      </div>
    </div>
  </div>

    <script src="plugins2/jquery/jquery.min.js"></script>

    <script src="plugins2/bootstrap/js/bootstrap.js"></script>

    
    <script src="plugins2/node-waves/waves.js"></script>

   
    <script src="plugins2/jquery-validation/jquery.validate.js"></script>

  
    <script src="js/admin.js"></script>
    <script src="js/pages/examples/sign-in.js"></script>
</>


    </div>
  )
}
