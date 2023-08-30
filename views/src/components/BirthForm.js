import React,{ Fragment, useEffect, useState , useRef} from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import MenuA from './MenuA';
import env from "react-dotenv";
import Cookies from 'js-cookie';
export default function BirthForm() {

   const printContent = () => {
      const printableContent = document.getElementById("printable-content");
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

  useEffect(() => {
    if (selectedDistrict) {
      fetchCounties(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedCounty) {
      fetchConstituencies(selectedCounty);
    }
  }, [selectedCounty]);

  useEffect(() => {
    if (selectedConstituency) {
      fetchSubCounties(selectedConstituency);
    }
  }, [selectedConstituency]);

  useEffect(() => {
    if (selectedSubCounty) {
      fetchParishes(selectedSubCounty);
    }
  }, [selectedSubCounty]);

  useEffect(() => {
    if (selectedParish) {
      fetchVillages(selectedParish);
    }
  }, [selectedParish]);

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
  const fetchCounties = async (district) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/counties/${district}`);
      const data = await response.json();
      setCounties(data);
    } catch (error) {
      console.error('Error fetching Counties', error);
    }
  };
  const fetchConstituencies = async (county) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/constituencies/${county}`);
      const data = await response.json();
      setConstituencies(data);
    } catch (error) {
      console.error('Error fetching Constituencies', error);
    }
  };
  const fetchSubCounties = async (constituency) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subcounties/${constituency}`);
      const data = await response.json();
      setSubCounties(data);
    } catch (error) {
      console.error('Error fetching SubCounties', error);
    }
  };

  const fetchParishes = async (subcounty) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/parishes/${subcounty}`);
      const data = await response.json();
      setParishes(data);
    } catch (error) {
      console.error('Error fetching Parishes', error);
    }
  };

  const fetchVillages = async (parish) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/villages/${parish}`);
      const data = await response.json();
      setVillages(data);
    } catch (error) {
      console.error('Error fetching Villages', error);
    }
  };

  const fetchReportData = async (report,region,district,county,constituency,subcounty,parish,village,StartDate,EndDate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/BReports/report/${report}/region/${region}/district/${district}/county/${county}/constituency/${constituency}/subcounty/${subcounty}/parish/${parish}/village/${village}/StartDate/${StartDate}/EndDate/${EndDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching ReportData', error);
    }
  };
  
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedDistrict('');
    setSelectedCounty('');
    setSelectedConstituency('');
  };
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedCounty('');
    setSelectedConstituency('');
  };
  const handleCountyChange = (event) => {
    setSelectedCounty(event.target.value);
    setSelectedConstituency('');
  };
  const handleConstituencyChange = (event) => {
    setSelectedConstituency(event.target.value);
    setSelectedSubCounty('');
  };
  const handleSubCountyChange = (event) => {
    setSelectedSubCounty(event.target.value);
    setSelectedParish('');
  };
  const handleParishChange = (event) => {
    setSelectedParish(event.target.value);
    setSelectedVillage('');
  };
  const handleVillageChange = (event) => {
    setSelectedVillage(event.target.value);
  };
  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
    // if (selectedReport === 'General-Births-Region') {
    //   return <BReportRegionalStats />      
    //  }
    //  if (selectedReport === 'General-Births-Revenue-Region') {
    //   return <BReportRegionalRevenue />      
    //  }
     console.log(selectedReport)
  };
  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };
  const handleSubmit = (event) => {
    fetchReportData(selectedReport,selectedRegion,selectedDistrict,selectedCounty,selectedConstituency,selectedSubCounty,selectedParish,selectedVillage,selectedStartDate,selectedEndDate);
    // ShowReportData();
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


{/* Logic */}
<form name="frm0" method="post">
          {/* <br />
          <h5 align="left">Generate Birth Report(s)</h5> */}
          <div className="container-fluid">
            {/* <br /> */}
            <div className="row">
              <div className="col-sm-9">
                <select className="form-control input-border-bottom borders"  
                name="reporttype"                 
                value={selectedReport} 
                onChange={handleReportChange}
                required="">
                  <option value="">=== Select Birth Report ===</option>
                  {/* <optgroup label="General Reports">
                    <option value="General-Births">
                      General Statistics Report - [
                      Notifications,Registrations,Sex/Gender ]
                    </option>
                    <option value="General-Births-Revenue">
                      General Revenue Report - [ Birth Certificates ]
                    </option>
                  </optgroup> */}
                  <optgroup label="Regional Reports">
                    <option value="General-Births-Region">
                      Regional Statistics Report - [
                      Notifications,Registrations,Sex/Gender ] -- Grouped By
                      Region
                    </option>
                    <option value="General-Births-Revenue-Region">
                      Regional Revenue Report - [ Birth Certificates ] --
                      Grouped By Region
                    </option>
                    <option value="Birth-Regional-District">
                      Regional Report [ Notifications,Registrations,Sex/Gender]
                      -- Grouped By District
                    </option>
                    <option value="Birth-Regional-District-Revenue">
                      Regional Revenue Report [ Birth Certificates ] -- Grouped
                      By District
                    </option>
                    <option
                      value="Birth-Regional-Mother-Age"
                      className="Missing2"
                    >
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Age-of-Mother
                    </option>
                    <option value="Birth-Regional-Citizenship">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Citizenship
                    </option>
                    {/* <option value="Birth-Regional-Tribe" className="Missing2">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Tribe
                    </option> */}
                    <option value="Birth-Regional-Birth-Place">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Place-Of-Birth
                    </option>
                    <option value="Birth-Regional-Nationality">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Nationality
                    </option>
                    <option value="Birth-Regional-Birth-Weight">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Weight-At-Birth
                    </option>
                    <option value="Birth-Regional-Birth-Outside">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Birth-Outside-Uganda
                    </option>
                    <option value="Birth-Regional-Birth-Disability">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Children-Born-With-Disability
                    </option>
                    <option value="Birth-Regional-Birth-Facility">
                      Regional Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By District , Facility
                    </option>
                  </optgroup>
                  <optgroup label="District Reports">
                    <option value="Birth-District">
                      District Report [ Notifications,Registrations,Sex/Gender]
                    </option>
                    <option value="Birth-District-Revenue">
                      District Revenue Report [ Birth Certificates ]
                    </option>
                    <option value="Birth-District-Sub-County">
                      District Report [ Notifications,Registrations,Sex/Gender]
                      -- Grouped By Sub-County
                    </option>
                    <option value="Birth-District-Revenue-Sub-County">
                      District Revenue Report [ Birth Certificates ] -- Grouped
                      By Sub-County
                    </option>
                    <option
                      value="Birth-District-Mother-Age"
                      className="Missing2"
                    >
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Age-of-Mother
                    </option>
                    <option value="Birth-District-Citizenship">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Citizenship
                    </option>
                    {/* <option value="Birth-District-Tribe" className="Missing22">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Tribe
                    </option> */}
                    <option value="Birth-District-Birth-Place">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Place-Of-Birth
                    </option>
                    <option value="Birth-District-Nationality">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Nationality
                    </option>
                    <option value="Birth-District-Birth-Weight">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Weight-At-Birth
                    </option>
                    <option value="Birth-District-Birth-Outside">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Birth-Outside-Uganda
                    </option>
                    <option value="Birth-District-Birth-Disability">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Children-Born-With-Disability
                    </option>
                    <option value="Birth-District-Birth-Facility">
                      District Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Sub-County , Facility
                    </option>
                  </optgroup>
                  <optgroup label="Sub-County Reports">
                    <option value="Birth-Sub-County">
                      Sub-County Report [
                      Notifications,Registrations,Sex/Gender]
                    </option>
                    <option value="Birth-Sub-County-Revenue">
                      Sub-County Revenue Report [ Birth Certificates ]
                    </option>
                    <option value="Birth-Sub-County-Parish">
                      Sub-County Report [
                      Notifications,Registrations,Sex/Gender] -- Grouped By
                      Parish
                    </option>
                    <option value="Birth-Sub-County-Revenue-Parish">
                      Sub-County Revenue Report [ Birth Certificates ] --
                      Grouped By Parish
                    </option>
                    <option
                      value="Birth-Sub-County-Mother-Age"
                      className="Missing2"
                    >
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Age-of-Mother
                    </option>
                    <option value="Birth-Sub-County-Citizenship">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Citizenship
                    </option>
                    {/* <option value="Birth-Sub-County-Tribe" className="Missing2">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Tribe
                    </option> */}
                    <option value="Birth-Sub-County-Birth-Place">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Place-Of-Birth
                    </option>
                    <option value="Birth-Sub-County-Nationality">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Nationality
                    </option>
                    <option value="Birth-Sub-County-Birth-Weight">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Weight-At-Birth
                    </option>
                    <option value="Birth-Sub-County-Birth-Outside">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Birth-Outside-Uganda
                    </option>
                    <option value="Birth-Sub-County-Birth-Disability">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Children-Born-With-Disability
                    </option>
                    <option value="Birth-Sub-County-Birth-Facility">
                      Sub-County Report [ Notifications,Registrations,Sex/Gender
                      ]-- Grouped By Parish , Facility
                    </option>
                  </optgroup>
                  <optgroup label="Parish Reports">
                    <option value="Birth-Parish">
                      Parish Report [ Notifications,Registrations,Sex/Gender]
                    </option>
                    <option value="Birth-Parish-Revenue">
                      Parish Revenue Report [ Birth Certificates ]
                    </option>
                    <option value="Birth-Parish-Village">
                      Parish Report [ Notifications,Registrations,Sex/Gender] --
                      Grouped By Village
                    </option>
                    <option value="Birth-Parish-Revenue-Village">
                      Parish Revenue Report [ Birth Certificates ] -- Grouped By
                      Village
                    </option>
                    <option value="Birth-Parish-Mother-Age" className="Missing2">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Age-of-Mother
                    </option>
                    <option value="Birth-Parish-Citizenship">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Citizenship
                    </option>
                    {/* <option value="Birth-Parish-Tribe" className="Missing2">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Tribe
                    </option> */}
                    <option value="Birth-Parish-Birth-Place">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Place-Of-Birth
                    </option>
                    <option value="Birth-Parish-Nationality">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Nationality
                    </option>
                    <option value="Birth-Parish-Birth-Weight">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Weight-At-Birth
                    </option>
                    <option value="Birth-Parish-Birth-Outside">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Birth-Outside-Uganda
                    </option>
                    <option value="Birth-Parish-Birth-Disability">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Children-Born-With-Disability
                    </option>
                    <option value="Birth-Parish-Birth-Facility">
                      Parish Report [ Notifications,Registrations,Sex/Gender ]--
                      Grouped By Village , Facility
                    </option>
                  </optgroup>
                  <optgroup label="Village Reports">
                    <option value="Birth-Village">
                      Village Report [ Notifications,Registrations,Sex/Gender]
                    </option>
                    <option value="Birth-Village-Revenue">
                      Village Revenue Report [ Birth Certificates ]
                    </option>
                    <option
                      value="Birth-Village-Mother-Age"
                      className="Missing2"
                    >
                      Village Report [ Notifications,Registrations,Sex/Gender
                      ]-- Age-of-Mother
                    </option>
                    <option value="Birth-Village-Citizenship">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Citizenship
                    </option>
                    {/* <option value="Birth-Village-Tribe" className="Missing22">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Tribe
                    </option> */}
                    <option value="Birth-Village-Birth-Place">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Place-Of-Birth
                    </option>
                    <option value="Birth-Village-Nationality">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Nationality
                    </option>
                    <option value="Birth-Village-Birth-Weight">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Weight-At-Birth
                    </option>
                    <option value="Birth-Village-Birth-Outside">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Birth-Outside-Uganda
                    </option>
                    <option value="Birth-Village-Birth-Disability">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Children-Born-With-Disability
                    </option>
                    <option value="Birth-Village-Birth-Facility">
                      Village Report [ Notifications,Registrations,Sex/Gender ]
                      -- Facility
                    </option>
                  </optgroup>
                </select>
              </div>
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
            </div>
            <br />
            <div className="row">
             
              <div className="col-sm-3">
                <div id="Districtid">
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
                <div id="Countyid">
                  <select
                    className="form-control input-border-bottom borders"
                    name="County"
                    value={selectedCounty} 
                    onChange={handleCountyChange} 
                    // disabled={!selectedDistrict}
                    required=""
                  >
                    <option key={1000004} value={1000004}>=== Select County ===</option>
                    <option key={1000005} value={1000005}>Not-applicable</option>                   
                    {Counties.map((county) => (
            <option key={county.id} value={county.id}>
              {county.value}
            </option>
          ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div id="constituencyid">
                  <select
                    className="form-control input-border-bottom borders"
                    name="Constituency" 
                    value={selectedConstituency} 
                    onChange={handleConstituencyChange} 
                    // disabled={!selectedCounty}            
                    required=""
                  > <option key={1000006} value={1000006}>=== Select Constituency ===</option>
                    <option key={1000007} value={1000007}>Not-applicable</option>
              
                    {Constituencies.map((constituency) => (
            <option key={constituency.id} value={constituency.id}>
              {constituency.value}
            </option>
          ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div id="SubCountyid">
                  <select
                    className="form-control input-border-bottom borders"
                    name="SubCounty"
                    value={selectedSubCounty} 
                    onChange={handleSubCountyChange} 
                    // disabled={!selectedConstituency}                
                    required=""
                  > <option key={1000008} value={1000008}>=== Select Sub-County ===</option>
                    <option key={1000009} value={1000009}>Not-applicable</option>
                   
                    {SubCounties.map((subcounty) => (
            <option key={subcounty.id} value={subcounty.id}>
              {subcounty.value}
            </option>
          ))}
                  </select>
                </div>
              </div>

            </div>
            <br />
            <div className="row">

            <div className="col-sm-3">
                <div id="Parishid">
                  <select className="form-control input-border-bottom borders"
                  name="Parish" 
                  value={selectedParish} 
                  onChange={handleParishChange} 
                  // disabled={!selectedSubCounty}  
                  required="">
                    <option key={1000010} value={1000010}>=== Select Parish ===</option>
                    <option key={1000011} value={1000011}>Not-applicable</option>
                
                    {Parishes.map((parish) => (
            <option key={parish.id} value={parish.id}>
              {parish.value}
            </option>
          ))}
                  </select>
                </div>
              </div>
         
              <div className="col-sm-3">
                <div id="Villageid">
                  <select className="form-control input-border-bottom borders" 
                  name="village" 
                  value={selectedVillage} 
                  onChange={handleVillageChange} 
                  // disabled={!selectedParish}  
                  required="">
                    <option key={1000012} value={1000012}>=== Select Village ===</option>
                    <option key={1000013} value={1000013}>Not-applicable</option>
                 
                    {Villages.map((village) => (
            <option key={village.id} value={village.id}>
              {village.value}
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
                />
              </div>           
            </div>
            <div className="row">
           
            <div className="col-sm-3"> <br />
            <br />
                <button
                  type="button"
                  name="Show_Births"
                  onClick = {handleSubmit}
                  className="btn btn-dark btn-block"
                  style={{ fontSize: 14, width: "100%" ,  padding : 8 }}                          
                > <strong>
                    <i className="fas fa-print" /> Generate Birth Report
                  </strong>
                </button>
              </div>
            </div>
            <br />
            <br />
          </div>
        </form>
{/* <div style={{ margin: "5px" }}>&nbsp;</div> */}


<div id="printable-content">{/*start print */}


<If condition={selectedReport === 'General-Births-Region'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onClick={printContent}
                />{" "}
                Print */}
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
              <h4><strong>REGIONAL BIRTH STATISTICS REPORT</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'General-Births-Revenue-Region'}>
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
            {/* <i
              className="fa fa-print"
              aria-hidden="true"
              onclick="printDiv(to_print);"
            />{" "}
            Print */}
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
            <h4><strong>REGIONAL REVENUE REPORT</strong></h4>
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
              <strong>Birth Cerificates Revenue</strong>
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
          {0}
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



        <ElseIf condition={selectedReport === 'Birth-Regional-District'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong> Regional Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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

        <ElseIf condition={selectedReport === 'Birth-Regional-District-Revenue'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
                  <strong>Birth Cerificates Revenue [ UGX ]</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Regional-Birth-Place'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong> Regional Birth Statistics Report </strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Regional-Citizenship'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Regional-Mother-Age'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
                <strong>12 - 17 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>18 - 35 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt;= 36 Years</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Regional-Nationality'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Regional-Birth-Weight'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
                <strong> &lt; 2.5Kg </strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>2.5 and 4.5Kg</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt; 4.5Kg</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Regional-Birth-Outside'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
                <strong>Births-In-Uganda</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Births-Outside-Uganda</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Regional-Birth-Disability'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
                <strong>Children-Born-With-Disability</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Children-Born-WithOut-Disability</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Regional-Birth-Facility'}>
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
                {/* <i
                  className="fa fa-print"
                  aria-hidden="true"
                  onclick="printDiv(to_print);"
                />{" "}
                Print */}
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
              <h4><strong>Regional Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <Else>
          <p>&nbsp;</p>
        </Else>
</If>
{/* //////////////// DISTRICT ////////////////////////// */}
<If condition={selectedReport === 'Birth-District'}>
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
              <h4><strong>DISTRICT BIRTH STATISTICS REPORT</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'Birth-District-Revenue'}>
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
            <i
              className="fa fa-print"
              aria-hidden="true"
              onclick="printDiv(to_print);"
            />{" "}
            Print
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
            <h4><strong>DISTRICT REVENUE REPORT</strong></h4>
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
              <strong>Birth Cerificates Revenue</strong>
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
          {0}
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



        <ElseIf condition={selectedReport === 'Birth-District-Sub-County'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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

        <ElseIf condition={selectedReport === 'Birth-District-Revenue-Sub-County'}>
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
                  <strong>Birth Cerificates Revenue [ UGX ]</strong>
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
        <ElseIf condition={selectedReport === 'Birth-District-Birth-Place'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <ElseIf condition={selectedReport === 'Birth-District-Citizenship'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-District-Mother-Age'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
                <strong>12 - 17 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>18 - 35 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt;= 36 Years</strong>
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
        <ElseIf condition={selectedReport === 'Birth-District-Nationality'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-District-Birth-Weight'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
                <strong> &lt; 2.5Kg </strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>2.5 and 4.5Kg</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt; 4.5Kg</strong>
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
        <ElseIf condition={selectedReport === 'Birth-District-Birth-Outside'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
                <strong>Births-In-Uganda</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Births-Outside-Uganda</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-District-Birth-Disability'}>
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
              <h4><strong>District Birth Statistics Report</strong></h4>
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
                <strong>Children-Born-With-Disability</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Children-Born-WithOut-Disability</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-District-Birth-Facility'}>
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
              <h4><strong> District Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <Else>
          <p>&nbsp;</p>
        </Else>
</If>
{/* ///////////////// SUB-COUNTY //////////// */}
<If condition={selectedReport === 'Birth-Sub-County'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'Birth-Sub-County-Revenue'}>
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
            <i
              className="fa fa-print"
              aria-hidden="true"
              onclick="printDiv(to_print);"
            />{" "}
            Print
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
            <h4><strong>Sub-County Revenue Report</strong></h4>
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
              <strong>Birth Cerificates Revenue</strong>
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
          {0}
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



        <ElseIf condition={selectedReport === 'Birth-Sub-County-Parish'}>
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
              <h4><strong> Sub-County Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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

        <ElseIf condition={selectedReport === 'Birth-Sub-County-Revenue-Parish'}>
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
              <h4><strong> Sub-County Revenue Report</strong></h4>
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
                  <strong>Birth Cerificates Revenue [ UGX ]</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Birth-Place'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Citizenship'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Mother-Age'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
                <strong>12 - 17 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>18 - 35 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt;= 36 Years</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Nationality'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Birth-Weight'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
                <strong> &lt; 2.5Kg </strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>2.5 and 4.5Kg</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt; 4.5Kg</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Birth-Outside'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
                <strong>Births-In-Uganda</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Births-Outside-Uganda</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Birth-Disability'}>
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
              <h4><strong>Sub-County Birth Statistics Report</strong></h4>
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
                <strong>Children-Born-With-Disability</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Children-Born-WithOut-Disability</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Sub-County-Birth-Facility'}>
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
              <h4><strong> Sub-County Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <Else>
          <p>&nbsp;</p>
        </Else>
</If>

{/* //////////// PARISH //////////////// */}
<If condition={selectedReport === 'Birth-Parish'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'Birth-Parish-Revenue'}>
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
            <i
              className="fa fa-print"
              aria-hidden="true"
              onclick="printDiv(to_print);"
            />{" "}
            Print
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
            <h4><strong>Parish Revenue Report</strong></h4>
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
              <strong>Birth Cerificates Revenue</strong>
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
          {0}
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



        <ElseIf condition={selectedReport === 'Birth-Parish-Village'}>
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
              <h4><strong> Parish Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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

        <ElseIf condition={selectedReport === 'Birth-Parish-Revenue-Village'}>
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
              <h4><strong> Parish Revenue Report</strong></h4>
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
                  <strong>Birth Cerificates Revenue [ UGX ]</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Parish-Birth-Place'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Parish-Citizenship'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Parish-Mother-Age'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
                <strong>12 - 17 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>18 - 35 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt;= 36 Years</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Parish-Nationality'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Parish-Birth-Weight'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
                <strong> &lt; 2.5Kg </strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>2.5 and 4.5Kg</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt; 4.5Kg</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Parish-Birth-Outside'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
                <strong>Births-In-Uganda</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Births-Outside-Uganda</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Parish-Birth-Disability'}>
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
              <h4><strong>Parish Birth Statistics Report</strong></h4>
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
                <strong>Children-Born-With-Disability</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Children-Born-WithOut-Disability</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Parish-Birth-Facility'}>
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
              <h4><strong> Parish Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <Else>
          <p>&nbsp;</p>
        </Else>
</If>
{/* ///////////////// VILLAGE /////////////////////////// */}
<If condition={selectedReport === 'Birth-Village'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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
        </div>
        </Then>



        <ElseIf condition={selectedReport === 'Birth-Village-Revenue'}>
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
            <i
              className="fa fa-print"
              aria-hidden="true"
              onclick="printDiv(to_print);"
            />{" "}
            Print
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
            <h4><strong>Village Revenue Report</strong></h4>
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
              <strong>Birth Cerificates Revenue</strong>
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
          {0}
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



        <ElseIf condition={selectedReport === 'Birth-Village-Village'}>
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
              <h4><strong> Village Birth Statistics Report</strong></h4>
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
                <strong>Birth Notifications</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Birth Registrations</strong>
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

        <ElseIf condition={selectedReport === 'Birth-Village-Revenue-Village'}>
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
              <h4><strong> Village Revenue Report</strong></h4>
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
                  <strong>Birth Cerificates Revenue [ UGX ]</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Village-Birth-Place'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Village-Citizenship'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Village-Mother-Age'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
                <strong>12 - 17 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>18 - 35 Years</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt;= 36 Years</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Village-Nationality'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
        <ElseIf condition={selectedReport === 'Birth-Village-Birth-Weight'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
                <strong> &lt; 2.5Kg </strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>2.5 and 4.5Kg</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>&gt; 4.5Kg</strong>
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
        <ElseIf condition={selectedReport === 'Birth-Village-Birth-Outside'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
                <strong>Births-In-Uganda</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Births-Outside-Uganda</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Village-Birth-Disability'}>
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
              <h4><strong>Village Birth Statistics Report</strong></h4>
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
                <strong>Children-Born-With-Disability</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Children-Born-WithOut-Disability</strong>
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
          </tr> */}
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </ElseIf>
        <ElseIf condition={selectedReport === 'Birth-Village-Birth-Facility'}>
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
              <h4><strong> Village Birth Statistics Report</strong></h4>
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
                <strong>Health Facility</strong>
              </div>
            </td>
            <td colSpan={3}>
              <div align="center" className="Title3">
                <strong>Community</strong>
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
