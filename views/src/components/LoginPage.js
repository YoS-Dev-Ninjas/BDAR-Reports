import React,{ Fragment, useEffect, useState} from 'react';
import { useRef } from 'react';
import Axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
import env from "react-dotenv";
export default function LoginPage() {

const navigate = useNavigate();
const [Values , SetValues] = useState({
  UserName : '',
  UserPass : ''
})
// console.log(Values);
  Axios.defaults.withCredentials = true;
  const HandleSubmit = (e) =>{
    e.preventDefault();
    Axios.post(`${process.env.REACT_APP_API_URL}/Login`,Values)
    .then(res => {
      if(res.data.Message === 'Successful-Login') {
        Cookies.set('SessionFName', res.data.FirstName, { expires: 1 });
        Cookies.set('SessionLName', res.data.LastName, { expires: 1 });
        Cookies.set('SessionID', res.data.UserID, { expires: 1 });
        Cookies.set('SessionLevel', res.data.Level, { expires: 1 });
        Cookies.set('SessionToken', res.data.Token, { expires: 1 });
        navigate('/Dashboards')
        //alert(res.data.FirstName + ' ' + res.data.LastName + ' SessionID : ' + res.data.UserID)
      }
      else
      {
        Cookies.set('SessionError', res.data.Message, { expires: 1 });
        alert(res.data.Message)
      }
      })
    .catch(err => console.log(err))
  }
  useEffect(() => {
        Cookies.remove('SessionFName');
        Cookies.remove('SessionLName');
        Cookies.remove('SessionID');
        Cookies.remove('SessionLevel');
        Cookies.remove('SessionToken');
        Cookies.remove('SessionError');
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
        <form id="sign_in"
          method="post"
          onSubmit={HandleSubmit}        
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
               <h4>BIRTH , DEATH & ADOPTION REGISTRATON SYSTEM</h4>
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
                  name="UserName"
                  placeholder="Enter Username or Email"
                  required=""
                  autofocus=""
                  onChange={e => SetValues({...Values,UserName:e.target.value})}
                  
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
                  name="UserPass"
                  placeholder="Enter Password"
                  required=""
                  onChange={e => SetValues({...Values,UserPass:e.target.value})}
               
                  className="form-control input-border-bottom borders"
                  style={{borderBottom : "3px solid black",padding:"10px"}}
                />
              </div>
            </div>
            <div className="row">
               <div className="col-xs-6 p-t-10">
              </div>
              <div className="col-xs-6">
                <button
                  className="btn btn-block waves-effect"
                  type="submit"
                  name="Login"
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
                  {" ||  USPC"} 
                </span>
                .
              </strong>
            </div>
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
