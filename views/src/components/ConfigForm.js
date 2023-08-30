import React,{ Fragment, useEffect, useState } from 'react';
import { useRef } from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FilterReports from './FilterReports';
import MenuA from './MenuA';
import Cookies from 'js-cookie';
import env from "react-dotenv";
export default function ConfigForm() {
  const navigate = useNavigate();
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
  const [selectedsectiontitle, setSelectedsectiontitle] = useState('');
  const [selectedsectionkpi, setSelectedsectionkpi] = useState('');
  const [selectedsectiongroupedby, setSelectedsectiongroupedby] = useState('');
  const [selectedsectioncharttype, setSelectedsectioncharttype] = useState('');
  const [selectedsectionstartdate, setSelectedsectionstartdate] = useState('');
  const [selectedsectionenddate, setSelectedsectionenddate] = useState('');
  
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
  const handletitleChange = (event) => {
    setSelectedsectiontitle(event.target.value);
  };
  const handlekpiChange = (event) => {
    setSelectedsectionkpi(event.target.value);
  };
  const handlegroupedbyChange = (event) => {
    setSelectedsectiongroupedby(event.target.value);
  };
  const handlecharttypeChange = (event) => {
    setSelectedsectioncharttype(event.target.value);
  };
  const handlestartdateChange = (event) => {
    setSelectedsectionstartdate(event.target.value);
  };
  const handleenddateChange = (event) => {
    setSelectedsectionenddate(event.target.value);
  };
  const handleClick = (event) => {
    const CurrentUser = Cookies.get('SessionID');
    SetConfiguration(selectedsectiontitle,selectedsectionkpi,selectedsectiongroupedby,selectedsectioncharttype,selectedsectionstartdate,selectedsectionenddate,selectedRegion,selectedDistrict,selectedCounty,selectedConstituency,selectedSubCounty,selectedParish,selectedVillage,CurrentUser);
  };

  const SetConfiguration = async (title,kpi,groupedby,charttype,startdate,enddate,region,district,county,constituency,subcounty,parish,village,User) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Add_Config/title/${title}/region/${region}/district/${district}/county/${county}/constituency/${constituency}/subcounty/${subcounty}/parish/${parish}/village/${village}/startdate/${startdate}/enddate/${enddate}/kpi/${kpi}/grougedby/${groupedby}/charttype/${charttype}/User/${User}`);
      navigate('/Dashboards')
    } catch (error) {
      console.error('Error fetching Configs', error);
    }
  };
   
  // delete
  const deleteConfig = async (id) => {
    try {
      // console.log('Selected ID : '  + id)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/DConfig/id/${id}`);
    navigate('/Dashboards')
    } catch (error) {
      console.error(error.message);
    }
  };
     
    //Load Configs
    const [Configs, setConfig] = useState([]);
    const ShowConfigs = async(CurrentUser) => {
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/AllConfigs/User/${CurrentUser}`);
      const jsonData = await response.json();  
      setConfig(jsonData);
      console.log(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const CurrentUser = Cookies.get('SessionID');
    ShowConfigs(CurrentUser);
    }, []);

  return (
    <Fragment>
         {" "}
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
    <h4 className="page-title">Configure Dashboard(s) :</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Enter Dashboard Parameters :</h4>
        </div>
        <div className="card-body">
          <p className="demo">

{/* Logic */}

  <form name="frm3" method="post">
          {/* <br />
          <h5>Dashboard Settings :</h5> 
          <br />*/}
          <div className="row">
            {/* <h6 className="Sections">
              Set Title and Key Performance Indicator [ KPI ]
            </h6>
            <hr /> */}
            <div className="col-sm-9">
              <input
                type="text"
                name="sectiontitle"
                required={true}
                className="form-control input-border-bottom borders"
                placeholder="Enter Section Title . Example : Region Vs Birth Notifications"
                title="Enter Title to be displayed on the Dashboard"
                value={selectedsectiontitle} 
                onChange={handletitleChange}
              />             
            </div>
            <div className="col-sm-3">
              <select
                className="form-control input-border-bottom borders" name="sectionkpi"  required={true}   
                value={selectedsectionkpi} 
                onChange={handlekpiChange}>
                <option value="">=== Select Dataset ===</option>
                <option value="Birth-Records">Birth-Record(s)</option>
                <option value="Death-Records">Death-Record(s)</option>      
                <option value="Adoption-Records">Adoption-Record(s)</option>
            </select>
            </div>         
     

          </div>
          <br />
          <div className="row">
            {/* <h6 className="Sections">Set Dataset Details</h6>
            <hr /> */}
            <div className="col-sm-3">
              <div id="KPI">
                <select className="form-control input-border-bottom borders" required={true} name="sectiongroupedby" 
                value={selectedsectiongroupedby} 
                onChange={handlegroupedbyChange}>
                  <option value="">======= Select Group By ==========</option>
                <option value="Region">Region</option>
                <option value="District">District</option>
                {/* <option value="County">County</option>
                <option value="Constituency">Constituency</option>   */}
                {/* <option value="Sub-County">Sub-County</option> 
                <option value="Parish">Parish</option> 
                <option value="Village">Village</option> */}
            
                </select>
              </div>
            </div>

            <div className="col-sm-3">
            <div id="sectioncharttype">
              <select  className="form-control input-border-bottom borders" required="" name="sectioncharttype" 
              value={selectedsectioncharttype} 
              onChange={handlecharttypeChange}>
                <option value="">=== Select Chart Type ===</option>
                <option value="bar">Bar Chart</option>
                <option value="column">Column Chart</option>
                {/* <option value="cylinder">Cylinder Chart</option> */}
                <option value="line">Line Graph</option>
                {/* <option value="pie">Pie Chart</option> */}
              </select>
            </div>            
          </div>
            <div className="col-sm-3">
            <select
                  className="form-control input-border-bottom borders"
                  name="region"
                  required=""
                  value={selectedRegion} 
                  onChange={handleRegionChange}                            
                >
                <option value = {1000} >=== Select Region ===</option>
                <option value ={1001}>All Regions</option>             
                {Regions.map((Region) => (
            <option key={Region.id} value={Region.id}>{Region.value}</option>
                ))}
                </select>
            </div>
            <div className="col-sm-3">
              <div id="Districtid4">
              <select
                    className="form-control input-border-bottom borders"
                    name="district"
                    value={selectedDistrict} 
                    onChange={handleDistrictChange}            
                    required="">
                    <option value={1002}>=== Select District ===</option>
                    <option value={1003}>Not-applicable</option>
                    {Districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.value}
            </option>
          ))}
             </select>
              </div>
            </div>       
          
        </div>  {/*  End - Row */}
          <br />
          <br />
            <div className="row">            
              
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


            </div>
            <br />


          <div className="row">
            {/* <h6 className="Sections">Set Other Parameters</h6>
            <hr />        */}
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
                name="sectionstartdate"
                value={selectedsectionstartdate} 
                onChange={handlestartdateChange}
                required=""
                className="form-control input-border-bottom borders"
                placeholder="StartDate"
                title="Start Date"
                defaultValue="Start Date"
              />
            </div>
            <div className="col-sm-3">
              <input
                type="date"
                name="sectionenddate"
                value={selectedsectionenddate} 
                onChange={handleenddateChange}
                required=""
                className="form-control input-border-bottom borders"
                placeholder="EndDate"
                title="End Date"
              />
            </div>

            <div className="col-sm-3">
              <button
                type="button"
                name="Set_Dashboard"
                onClick={handleClick}
                className="btn btn-dark btn-block"
                   style={{ fontSize: 14, width: "100%" ,  padding : 8 }} >
                <strong>
                  <i className="fas fa-save" /> &nbsp;&nbsp;Save Configuration 
                </strong>
              </button>
            </div>

          </div>
         
          <div className="row">
           
       
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-12">
              <h2 className="Sections">Manage Dashboard Configurations : </h2>
              <br />
              <table width="100%" className="table table-striped" id="multi-filter-select">
                <tbody>
                  <tr>
                 
                    <th>Section-Title</th>
                    <th>KPI</th>
                    <th>Dataset</th>                   
                    <th>ChartType</th>
                    <th>StartDate</th>
                    <th>EndDate</th>
                    <th align="center">
                      Actions
                    </th>
                  </tr>
                  {Configs.map((Config) => ( 
                                  
                  <tr key={Config.id}>
                    
                    <td>{Config.sectiontitle}</td>
                    <td >{Config.sectiongroupedby}</td>                
                    <td >{Config.sectionkpi}</td>
                    <td >{Config.sectioncharttype}</td>
                    <td >{Config.sectionstartdate}</td>
                    <td >{Config.sectionenddate}</td>
                    {/* <td >{Config.sectiontitle}</td>
                    <td >{Config.sectiontitle}</td>
                    <td >{Config.sectiontitle}</td> */}
                   
                    <td> <button
                    type='button'
                  className='btn btn-danger'
                  title='Delete Configuration'
                  onClick={() => deleteConfig(Config.id)}>
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

</Fragment>
  )
}
