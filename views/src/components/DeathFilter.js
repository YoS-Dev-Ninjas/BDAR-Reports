//import * as React from 'react';
import React,{ Fragment, useEffect, useState , useRef} from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef ,slots,GridToolbar} from '@mui/x-data-grid';
import PropTypes from "prop-types";
import { getGridStringOperators } from "@mui/x-data-grid";
import { Box, MenuItem, Select } from "@mui/material";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import MenuA from './MenuA';
import Cookies from 'js-cookie';
import env from "react-dotenv";

export default function DeathFilter() {


 //Load Data
 const [Configs, setConfig] = useState([]);
 const ShowConfigs = async() => {
 try {
 const response = await fetch(`${process.env.REACT_APP_API_URL}/DeathDataGrid`);
   const jsonData = await response.json();  
   setConfig(jsonData);
   console.log(jsonData)
 } catch (err) {
   console.error(err.message);
 }
};
useEffect(() => {
 ShowConfigs();
 }, []);

//     const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];
const rows = Configs
const columns = [
// { field: 'id', headerName: 'SystemID', width: 100},
{ field: 'application_number', headerName: 'Application-Number', width: 200 },
{ field: 'first_name', headerName: 'FirstName', width: 200 },
{ field: 'last_name', headerName: 'SurName', width: 200 },
{ field: 'other_names', headerName: 'Other-Name', width: 200 },
{ field: 'sex_id', headerName: 'Gender', width: 100 },
{ field: 'date_of_birth', headerName: 'Date-Of-Birth', width: 200 },
{ field: 'age', headerName: 'Age', width: 100 },
{ field: 'nationality_id', headerName: 'Nationality', width: 100 },
{ field: 'date_of_death', headerName: 'Date-Of-Death', width: 200 },
{ field: 'time_of_death', headerName: 'Time-Of-Death', width: 200 },
{ field: 'cause_of_death', headerName: 'Death-Cause', width: 100 },
{ field: 'place_of_death', headerName: 'Death-Place', width: 200 },
{ field: 'date_of_submission', headerName: 'Submission-Date', width: 200 },
{ field: 'state', headerName: 'State', width: 300 },
{ field: 'date_of_approval', headerName: 'Date-Of-Approval', width: 200 },
{ field: 'generate_death_certificate', headerName: 'Ordered-Certificate', width: 200 },
];


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
    <h4 className="page-title">Filter Death Record(s) :</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">:</h4>
        </div>
        <div className="card-body">
          <p className="demo"> 

{/* Logic */}
<div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns}  slots={{ toolbar: GridToolbar}} />
    </div>
    {/* Logic */}
    
   

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
