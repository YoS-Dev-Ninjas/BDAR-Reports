import React from 'react';
import { Fragment } from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import MenuA from './MenuA';
import BirthForm from './BirthForm';

export default function Header() {
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
                      <h4>{/*?php echo $_SESSION['Session_Name'];?*/} Admin Ken</h4>
                      <p className="text-muted">
                        {/*?php echo $_SESSION['Position'];?*/}Administrator
                      </p>
                      {/*<a href="profile.html" class="btn btn-xs btn-secondary btn-sm">View Profile</a>*/}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="Change_Password.php">
                    Change Password
                  </a>                 
                  <a className="dropdown-item" href="index.php">
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
    <h4 className="page-title">Generate Birth Report(s) :</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Enter Report Parameters :</h4>
        </div>
        <div className="card-body">
          <p className="demo">

            

<BirthForm />







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
					{/* <nav class="pull-left">
						<ul class="nav">
							<li class="nav-item">
								<a class="nav-link" href="#">
								<strong>For Inquiries : </strong>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
								<strong><?php //echo $Contacts;?></strong>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
								(+256)200-902481 / (+256)701-509346
								</a>
							</li>
						</ul>
					</nav> */}
					<div class="copyright ml-auto">
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
