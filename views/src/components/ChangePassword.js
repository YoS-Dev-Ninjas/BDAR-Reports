import React,{ Fragment, useEffect, useState } from 'react';
import { useRef } from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FilterReports from './FilterReports';
import MenuA from './MenuA';
import Cookies from 'js-cookie';
import env from "react-dotenv";
export default function ChangePassword() {
  const navigate = useNavigate();
  const [OldPass, setOldPass] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [NewPass2, setNewPass2] = useState('');

  const handleOldPassChange = (event) => {
    setOldPass(event.target.value);
  };
  const handleNewPassChange = (event) => {
    setNewPass(event.target.value);
  };
  const handleNewPass2Change = (event) => {
    setNewPass2(event.target.value);
  };
  const handleClick = (event) => {
    const CurrentUser = Cookies.get('SessionID');
    SetPassword(OldPass,NewPass,CurrentUser);
  };

  const SetPassword = async (OldPass,NewPass,User) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ChangePassword/OldPass/${OldPass}/NewPass/${NewPass}/User/${User}`);
      navigate('/')
    } catch (error) {
      console.error('Error Setting Password', error);
    }
  };

  return (
    <div>
     <div className="wrapper">
  <div className="main-header">
    {/* Logo Header */}
    <div
      className="logo-header"
      data-background-color=""
      style={{ backgroundColor: "white" , color: "black" }}
    >
      <a
        href="#"
        className="logo"
        style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
      >
        {/* Name */} <img
                  src="NIRA.png"
                  className="img-fluid"
                  width="120px"
                  height="50px"
                />
      </a>
      <button
        className="navbar-toggler sidenav-toggler ml-auto text-danger"
        type="button"
        data-toggle="collapse"
        data-target="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon text-danger  ">
          <i className="icon-menu" />
        </span>
      </button>
      <button className="topbar-toggler more text-danger">
        <i className="icon-options-vertical" />
      </button>
      <div className="nav-toggle">
        <button className="btn btn-toggle toggle-sidebar text-danger" >
          <i className="icon-menu" />
        </button>
      </div>
    </div>
    {/* End Logo Header */}
    {/* Navbar Header */}
    <nav
      className="navbar navbar-header navbar-expand-lg"
      data-background-color=""
      style={{ backgroundColor: "#b30000" }}
    >
      <div className="container-fluid">
        <div className="collapse" id="search-nav">
        <h3 style={{color:'white',fontWeight:'bold'}}>Birth , Death & Adoption Reporting & Statistics</h3>
        </div>
        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
          <li className="nav-item toggle-nav-search hidden-caret">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#search-nav"
              role="button"
              aria-expanded="false"
              aria-controls="search-nav"
            >
              <i className="fa fa-search" />
            </a>
          </li>
          <li className="nav-item dropdown hidden-caret">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="messageDropdown22222222222"
              role="button"
              data-toggle="dropdown2222222222"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-circle-question fa-3x" />
              
            </a>
            <ul
              className="dropdown-menu messages-notif-box animated fadeIn"
              aria-labelledby="messageDropdown">

              <li>
                <a className="see-all" href="javascript:void(0);">
                  See all messages
                  <i className="fa fa-angle-right" />{" "}
                </a>
              </li>
            </ul>
          </li>         
         
          <li className="nav-item dropdown hidden-caret">
            <a
              className="dropdown-toggle profile-pic"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              <div className="avatar-sm">
              <img src="Avatar.jpg" alt="image profile" class="avatar-img rounded img-fluid" />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-user animated fadeIn">
              <div className="dropdown-user-scroll scrollbar-outer">
                <li>
                  <div className="user-box">
                   
                    <div className="avatar-lg">
                    <img src="Avatar.jpg" alt="image profile" class="avatar-img rounded img-fluid" />
                    </div>
                   
                    <div className="u-text">
                      <h4>{Cookies.get("SessionFName") + '  ' + Cookies.get("SessionLName")}</h4>
                      <p className="text-muted">
                      {Cookies.get("SessionLevel")}
                      </p>                    
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="/ChangePassword">
                    Change Password
                  </a>                 
                  <a className="dropdown-item" href="/">
                    Logout
                  </a>
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    {/* End Navbar */}
  </div>
 {/* Sidebar */}


<MenuA />

 {/* Sidebar */}
  <div className="main-panel">
    <div className="content">
      <div className="page-inner">
        <div className="page-category">

        <div className="page-header">
    <h4 className="page-title">Edit User Account :</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Enter Password Details :</h4>
        </div>
        <div className="card-body">
          <p className="demo">

{/* Logic */}
<form
  method="post"
  action="Add_User.php"
  encType="multipart/form-data"
  className="navbar-left navbar-form nav-search mr-md-3"
>
  <div className="row">
    
    <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="OldPass"
          name="OldPass"
          type="password"
          className="form-control input-border-bottom"
          required=""
          value={OldPass} 
          onChange={handleOldPassChange}
          style={{ borderBottom: "2px solid black" }}
        />
        <label For="Cpass" className="placeholder">
          Current Password *
        </label>
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="NewPass"
          name="NewPass"
          type="password"
          className="form-control input-border-bottom"
          required=""
          value={NewPass} 
          onChange={handleNewPassChange}
          style={{ borderBottom: "2px solid black" }}
        />
        <label For="pass" className="placeholder">
          New Password *
        </label>
      </div>
    </div>

    <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="NewPass2"
          name="NewPass2"
          type="password"
          className="form-control input-border-bottom"
          required=""
          value={NewPass2} 
          onChange={handleNewPass2Change}
          style={{ borderBottom: "2px solid black" }}
        />
        <label For="pass2" className="placeholder">
          Confirm New Password *
        </label>
      </div>
    </div>
  </div>
  {/* End row */}
  <div style={{ margin: 30 }}> </div>

  <div style={{ margin: 30 }}> </div>
  <div className="row">
    <div className="col-md-12">
    &nbsp;&nbsp;&nbsp;&nbsp; <button type="button" name="Submit" className="btn btn-dark"
     onClick={handleClick}
      style={{ fontSize: 14, padding : 12 ,fontWeight : 'bold' }}      >
        <i className="fas fa-save" /> &nbsp;&nbsp;Update User Account Password
      </button>{" "}      
    </div>
  </div>{" "}
  {/* End row */}
</form>


{/* End Logic */}


 </p>
								</div>
							</div>
						</div>
					
						
						
					</div>

	</div>
	</div>
	</div>
<footer class="footer">
				<div class="container-fluid">
				
					<div class="copyright ml-auto" align="center">
				<strong>Copyright &copy; 2023 <img
                  src="NIRA.png"
                  className="img-fluid"
                  width="80px"
                  height="30px"
                /></strong>
					</div>				
				</div>
			</footer>
		</div>
		
	</div>           
    </div>
  )
}

