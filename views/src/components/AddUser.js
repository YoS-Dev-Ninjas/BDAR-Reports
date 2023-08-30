import React,{ Fragment, useEffect, useState } from 'react';
import { useRef } from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import Cookies from 'js-cookie';
// import FilterReports from './FilterReports';
import MenuA from './MenuA';
export default function AddUser() {
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Role, setRole] = useState('');

  const handleFNameChange = (event) => {
    setFName(event.target.value);
  };
  const handleLNameChange = (event) => {
    setLName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClick = (event) => {
    SetUser(FName,LName,Email,PhoneNumber,Role);
  };

  const SetUser = async (FName,LName,Email,PhoneNumber,Role) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Add_User/FName/${FName}/LName/${LName}/Email/${Email}/PhoneNumber/${PhoneNumber}/Role/${Role}`);
    } catch (error) {
      console.error('Error fetching Users', error);
    }
  };

  // delete User
  const deleteUser = async (id) => {
    try {
      // console.log('Selected ID : '  + id)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/DUser/id/${id}`);
    } catch (error) {
      console.error(error.message);
    }
  };
      
    //Load Users
    const [Users, setUsers] = useState([]);
    const ShowUsers = async() => {
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/AllUsers`);
      const jsonData = await response.json();  
      setUsers(jsonData);
      console.log(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    ShowUsers();
    }, []);

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
    <h4 className="page-title">Create User Account :</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Enter User Details :</h4>
        </div>
        <div className="card-body">
          <p className="demo">

{/* Logic */}
<form
  method="post"
  encType="multipart/form-data"
  className="navbar-left navbar-form nav-search mr-md-3"
>
  {/* <div className="row">
    <div className="col-md-3">
      <div className="form-group form-floating-label">
        <input
          id="Photo"
          name="Photo"
          type="file"
          className="form-control input-border-bottom"
          style={{ borderBottom: "2px solid black" }}
        />
        <label htmlFor="Photo" className="placeholder">
          &nbsp;
        </label>
      </div>
    </div>
  </div>
  <div style={{ margin: 30 }}> </div> */}
  <div className="row">
   <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="FirstName"
          name="FirstName"
          type="text"
          className="form-control input-border-bottom"
          required=""
          value={FName} 
          onChange={handleFNameChange}
          style={{ borderBottom: "2px solid black" }}
        />
        <label For="FirstName" className="placeholder">
          FirstName *
        </label>
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="SecondName"
          name="SecondName"
          type="text"
          className="form-control input-border-bottom"
          required=""
          value={LName} 
          onChange={handleLNameChange}
          style={{ borderBottom: "2px solid black" }}
        />
        <label For="SecondName" className="placeholder">
          LastName *
        </label>
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="Email"
          name="Email"
          type="text"
          className="form-control input-border-bottom"
          required=""
          value={Email} 
          onChange={handleEmailChange}
          style={{ borderBottom: "2px solid black" }}
        />
        <label htmlFor="Email" className="placeholder">
          Email
        </label>
      </div>
    </div>
  </div>
  {/* End row */}
  <div style={{ margin: 30 }}> </div>
  <div className="row">
  <div className="col-md-4">
      <div className="form-group form-floating-label">
        <input
          id="Telephone"
          name="Telephone"
          type="text"
          className="form-control input-border-bottom"
          required=""
          value={PhoneNumber} 
          onChange={handlePhoneChange}
          style={{ borderBottom: "2px solid black" }}
        />
        <label htmlFor="Telephone" className="placeholder">
          Telephone *
        </label>
      </div>
    </div>

    <div className="col-md-4">
      <div className="form-group form-floating-label">
        <select
          name="Position"
          className="form-control input-border-bottom"
          id="Position"
          required=""
          value={Role} 
          onChange={handleRoleChange}
          style={{ borderBottom: "2px solid black" }}
        >
          <option value="">==== Select ====</option>
          <option value="System Administrator">System Administrator</option>
          <option value="User">User</option>         
        </select>
        <label htmlFor="Position" className="placeholder">
          System / User Role *
        </label>
      </div>
    </div>


  </div>
  {/* End row */}
  <div style={{ margin: 30 }}> </div>
  <div className="row">
    <div className="col-md-12">
    &nbsp;&nbsp;&nbsp;&nbsp; <button type="button" name="Submit" className="btn btn-dark"
      style={{ fontSize: 14, padding : 12 ,fontWeight : 'bold' }}
      onClick={handleClick}
      >
        <i className="fas fa-save" /> &nbsp;&nbsp;Create User Account
      </button>{" "}      
    </div>
  </div>{" "}
  {/* End row */}
  <div className="row">
           
       
           </div>
           <div className="row">
             <div className="col-sm-12">
               <h1 className="Sections">Manage User Accounts : </h1>
               <br />
               <table width="100%" className="table table-striped" id="multi-filter-select">
                 <tbody>
                   <tr>                  
                     <th>#UserID</th>
                     <th>FirstName</th>
                     <th>LastName</th>                   
                     <th>Email</th>
                     <th>PhoneNumber</th>
                     <th>SystemRole</th>
                     <th>UserName</th>
                     <th align="center">
                       Actions
                     </th>
                   </tr>
                   {Users.map((User) => ( 
                                   
                   <tr key={User.id}>
                     
                     <td>{User.id}</td>
                     <td >{User.firstname}</td>                
                     <td >{User.lastname}</td>
                     <td >{User.email}</td>
                     <td >{User.phonenumber}</td>
                     <td >{User.userrole}</td>
                     <td >{User.username}</td>
                     {/* <td >{Config.sectiontitle}</td>
                     <td >{Config.sectiontitle}</td>
                     <td >{Config.sectiontitle}</td> */}
                    
                     <td> <button
                     type='button'
                   className='btn btn-danger'
                   title='Delete User Account'
                   onClick={() => deleteUser(User.id)}>
                   <i className='fa fa-trash'></i>
                 </button>
                 </td>
                   </tr>
                    ))}
                 </tbody>
               </table>
             </div>
           </div>
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
