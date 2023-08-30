import React,{ Fragment, useEffect, useState , useRef} from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import MenuA from './MenuA';
import env from "react-dotenv";
import Cookies from 'js-cookie';
export default function AdoptionForm() {

  const printContent = () => {
    const printableContent = document.getElementById("printable-content3");
    const printWindow = window.open("", "", "height=1000,width=1000");
    printWindow.document.write(printableContent.innerHTML);
    printWindow.print();
};

  const [Regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [Districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [Counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [Constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');   
  const [SubCounties, setSubCounties] = useState([]);
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [Parishes, setParishes] = useState([]);
  const [selectedParish, setSelectedParish] = useState('');
  const [Villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedReport, setSelectedReport] = useState('');  
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [ReportData, setReportData] = useState([]);
  
  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchDistricts(selectedRegion);
    }
  }, [selectedRegion]);

 const fetchRegions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/regions`);
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error('Error fetching regions', error);
    }
  };
  const fetchDistricts = async (region) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/districts/${region}`);
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts', error);
    }
  };
  

  const fetchReportData = async (report,region,district,StartDate,EndDate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/AReports/report/${report}/region/${region}/district/${district}/StartDate/${StartDate}/EndDate/${EndDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching ReportData', error);
    }
  };
  
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedDistrict('');
   
  };
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
   
  };
  
  const handleReportChange = (event) => {
    setSelectedReport(event.target.value); 
  };
  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };
  const handleSubmit = (event) => {
    fetchReportData(selectedReport,selectedRegion,selectedDistrict,selectedStartDate,selectedEndDate);
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
    <h4 className="page-title">Generate Adoption Report(s) :</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Enter Report Parameters :</h4>
        </div>
        <div className="card-body">
          <p className="demo">

{/* Logic*/}
<form name="frm2" method="post">
          {/* <br />
          <h5 align="left">Generate Adoption Report(s)</h5> */}
          <div className="container-fluid">
            {/* <br /> */}
            <div className="row">
              <div className="col-sm-12">
              <select className="form-control input-border-bottom borders" name="reporttype" 
                value={selectedReport} 
                onChange={handleReportChange}
                required="">
                  <option value="">=== Select Adoption Report ===</option>
                  {/* <optgroup label="General Reports">
                    <option value="General-Adoption">
                      General Statistics Report - [
                      Notifications,Registrations,Sex/Gender ]
                    </option>
                    <option value="General-Adoption-Revenue">
                      General Revenue Report - [ Certificates ]
                    </option>
                  </optgroup> */}
                  <optgroup label="Regional Reports">
                    <option value="General-Adoption-Region">
                      Regional Statistics Report - [
                      Notifications,Registrations,Sex/Gender ] -- Grouped By
                      Region
                    </option>
                    <option value="General-Adoption-Revenue-Region">
                      Regional Revenue Report - [ Certificates ] -- Grouped By
                      Region
                    </option>
                    <option value="Adoption-Regional-District">
                      Regional Report [ Notifications,Registrations,Sex/Gender]
                      -- Grouped By District
                    </option>
                    <option value="Adoption-Regional-District-Revenue">
                      Regional Revenue Report [ Certificates ] -- Grouped By
                      District
                    </option>
                    <option value="Adoption-Regional-Age-Group">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Age-Group
                    </option>
                    <option value="Adoption-Regional-Citizenship">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Citizenship
                    </option>
                    <option value="Adoption-Regional-Nationality">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Nationality
                    </option>
                  </optgroup>
                  <optgroup label="District Reports">
                    <option value="Adoption-District">
                      District Statistics Report - [
                      Notifications,Registrations,Sex/Gender ]
                    </option>
                    <option value="Adoption-District-Revenue">
                      District Revenue Report - [ Certificates ]
                    </option>
                    <option value="Adoption-District-Sub-County">
                      District Report [ Notifications,Registrations,Sex/Gender]
                      -- Grouped By Sub-County
                    </option>
                    <option value="Adoption-District-Sub-County-Revenue">
                      District Revenue Report [ Certificates ] -- Grouped By
                      Sub-County
                    </option>
                    <option value="Adoption-District-Age-Group">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Age-Group
                    </option>
                    <option value="Adoption-District-Citizenship">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Citizenship
                    </option>
                    <option value="Adoption-District-Nationality">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Nationality
                    </option>
                  </optgroup>
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">
              <select
                  className="form-control input-border-bottom borders"
                  name="region"
                  required=""
                  value={selectedRegion} 
                  onChange={handleRegionChange}                            
                >
                <option key={1000000} value={1000000} >=== Select Region ===</option>
                <option key={1000001} value={1000001} >All - Regions</option>
                      
                {Regions.map((Region) => (
            <option key={Region.id} value={Region.id}>{Region.value}</option>
                ))}
                </select>
              </div>
              <div className="col-sm-3">
                <div id="Districtid3">
                <select
                    className="form-control input-border-bottom borders"
                    name="district"
                    value={selectedDistrict} 
                    onChange={handleDistrictChange} 
                    // disabled={!selectedRegion}              
                    required="">
                    <option key={1000002} value={1000002}>=== Select District ===</option>
                    <option key={1000003} value={1000003}>Not-applicable</option>
                   
                    {Districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.value}
            </option>
          ))}
             </select>
                </div>
              </div>
              <div className="col-sm-3">
                <input
                   type="date"
                   name="startdate"
                   value={selectedStartDate} 
                   onChange={handleStartDateChange}
                  required=""
                  className="form-control input-border-bottom borders"
                  placeholder="StartDate"
                  title="Start Date"
                />
              </div>
              <div className="col-sm-3">
                <input
                 type="date"
                 name="enddate"
                 value={selectedEndDate} 
                 onChange={handleEndDateChange}
                  required=""
                  className="form-control input-border-bottom borders"
                  placeholder="EndDate"
                  title="End Date"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">
                <button
                   type="button"
                   name="Show_Births"
                   onClick = {handleSubmit}
                   className="btn btn-dark btn-block"
                   style={{ fontSize: 14, width: "100%" ,  padding : 8 }}                           
                 >
                  <strong>
                    <i className="fas fa-print" /> Generate Adoption Report
                  </strong>
                </button>
              </div>
            </div>
            <br />
            <br />
          </div>
        </form>

<div style={{ margin: "20px" }}>&nbsp;</div>

<div id="printable-content3">{/*start print */}

<If condition={selectedReport === 'General-Adoption-Region'}>
        <Then>
        <div>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={6}>
                <div align="center" className="Title2">
                 <h4><strong>Regional Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Notifications</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Registrations</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={147}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={137}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={103}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={148}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={154}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={164}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
        {ReportData.map((details) => ( 
          
          <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
            </tr>
            ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  {/* </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong> 
                    {0}
                 </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr>*/}
            <tr>
              <td colSpan={7}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'General-Adoption-Revenue-Region'}>
        <div>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={214}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={4}>
                <div align="center" className="Title2">
                <h4><strong>Regional Revenue Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td width={365} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td width={503} colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={4}>
                <div align="center" className="Title3">
                  <div align="left" className="Title3">
                    <strong>Adoption Cerificates Revenue</strong>
                  </div>
                </div>
              </td>
            </tr>
            {ReportData.map((details) => ( 
            <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr>
          ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left" className="Title3">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </div>
        </ElseIf>



        <ElseIf condition={selectedReport === 'Adoption-Regional-District'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={6}>
                <div align="center" className="Title2">
                <h4><strong>Regional Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Notifications</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Registrations</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={147}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={137}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={103}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={148}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={154}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={164}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
           
         {ReportData.map((details) => ( 
          
          <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
            </tr>
          ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={7}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>

        <ElseIf condition={selectedReport === 'Adoption-Regional-District-Revenue'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={214}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={4}>
                <div align="center" className="Title2">
                <h4><strong> Regional Revenue Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td width={365} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td width={503} colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={4}>
                <div align="center" className="Title3">
                  <div align="left" className="Title3">
                    <strong>Adoption Cerificates Revenue [ UGX ]</strong>
                  </div>
                </div>
              </td>
            </tr>
            {ReportData.map((details) => ( 
            <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr>
           ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total [ UGX ]:</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left" className="Title3">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Adoption-Regional-Citizenship'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={6}>
                <div align="center" className="Title2">
             <h4><strong>Regional Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Citizen</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Alien</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={147}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={137}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={103}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={148}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={154}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={164}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
    {ReportData.map((details) => ( 
          <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
            </tr>
      ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={7}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Adoption-Regional-Age-Group'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={179}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={9}>
                <div align="center" className="Title2">
                <h4><strong>Regional Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={6} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>0- 11 Month(s)</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>1 - 17 Years</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>&gt;= 18 Years</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={86}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={102}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={67}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
        {ReportData.map((details) => (     
      <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr>
    ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={10}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Adoption-Regional-Nationality'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={179}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={9}>
                <div align="center" className="Title2">
                <h4><strong> Regional Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={6} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Citizen</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Alien</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Refugee</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={86}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={102}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={67}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
        {ReportData.map((details) => ( 
        <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr>
        ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={10}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
      
       
        <Else>
          <p>&nbsp;</p>
        </Else>
</If>

{/* ///////////////////////// DISTRICT ///////////////// */}
<If condition={selectedReport === 'Adoption-District'}>
        <Then>
        <div>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={6}>
                <div align="center" className="Title2">
                 <h4><strong>District Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Notifications</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Registrations</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={147}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={137}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={103}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={148}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={154}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={164}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
        {ReportData.map((details) => ( 
          
          <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
            </tr>
            ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  {/* </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong> 
                    {0}
                 </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr>*/}
            <tr>
              <td colSpan={7}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'Adoption-District-Revenue'}>
        <div>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={214}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={4}>
                <div align="center" className="Title2">
                <h4><strong>District Revenue Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td width={365} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td width={503} colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={4}>
                <div align="center" className="Title3">
                  <div align="left" className="Title3">
                    <strong>Adoption Cerificates Revenue</strong>
                  </div>
                </div>
              </td>
            </tr>
            {ReportData.map((details) => ( 
            <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr>
          ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left" className="Title3">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </div>
        </ElseIf>



        <ElseIf condition={selectedReport === 'Adoption-District-Sub-County'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={6}>
                <div align="center" className="Title2">
                <h4><strong>District Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Notifications</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Adoption Registrations</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={147}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={137}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={103}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={148}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={154}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={164}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
           
         {ReportData.map((details) => ( 
          
          <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
            </tr>
          ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={7}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>

        <ElseIf condition={selectedReport === 'Adoption-District-Sub-County-Revenue'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={214}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={4}>
                <div align="center" className="Title2">
                <h4><strong> District Revenue Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td width={365} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td width={503} colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={4}>
                <div align="center" className="Title3">
                  <div align="left" className="Title3">
                    <strong>Adoption Cerificates Revenue [ UGX ]</strong>
                  </div>
                </div>
              </td>
            </tr>
            {ReportData.map((details) => ( 
            <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr>
           ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total [ UGX ]:</strong>
                </div>
              </td>
              <td colSpan={4}>
                <div align="left" className="Title3">
                  <strong>{0}</strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Adoption-District-Citizenship'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={6}>
                <div align="center" className="Title2">
             <h4><strong>District Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Citizen</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Alien</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={147}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={137}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={103}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={148}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={154}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={164}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
    {ReportData.map((details) => ( 
          <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
            </tr>
      ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={7}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Adoption-District-Age-Group'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={179}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={9}>
                <div align="center" className="Title2">
                <h4><strong>District Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={6} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>0- 11 Month(s)</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>1 - 17 Years</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>&gt;= 18 Years</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={86}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={102}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={67}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
        {ReportData.map((details) => (     
      <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr>
    ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={10}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Adoption-District-Nationality'}>
        <table width="100%" className="table table-striped">
          <tbody>
            <tr>
              <td>
                <div align="center">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">&nbsp;</div>
              </td>
              <td colSpan={3} className="Title3">
                <div align="right">
                  <button onClick={printContent}>Print Report</button>
                </div>
              </td>
            </tr>
            <tr>
              <td width={179}>
                <div align="center" className="Title2">
                  <img
                    src="NIRA.png"
                    className="img-fluid"
                    width="80px"
                    height="30px"
                  />
                </div>
              </td>
              <td colSpan={9}>
                <div align="center" className="Title2">
                <h4><strong> District Adoption Statistics Report</strong></h4>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3} className="Title3">
                <div align="left">Start-Date : {selectedStartDate}</div>
              </td>
              <td colSpan={6} className="Title3">
                <div align="right">End-Date : {selectedEndDate}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                <div align="center" />
              </td>
            </tr>
            <tr>
              <td>
                <div align="center" />
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Citizen</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Alien</strong>
                </div>
              </td>
              <td colSpan={3}>
                <div align="center" className="Title3">
                  <strong>Refugee</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div align="left" />
              </td>
              <td width={86}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={102}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={67}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Male</strong>
                </div>
              </td>
              <td width={89}>
                <div align="center">
                  <strong>Female</strong>
                </div>
              </td>
              <td width={100}>
                <div align="center">
                  <strong>Total</strong>
                </div>
              </td>
            </tr>
        {ReportData.map((details) => ( 
        <tr>
              <td>
                <div align="left">
                  <strong>{details.value}</strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {details.num}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr>
        ))}
            {/* <tr>
              <td>
                <div align="right" className="Title3">
                  <strong>Grand-Total :</strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
              <td>
                <div align="center" className="Title3">
                  <strong>
                    {0}
                  </strong>
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={10}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </ElseIf>
      
       
        <Else>
          <p>&nbsp;</p>
        </Else>
</If>


</div>{/*End print */}




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
