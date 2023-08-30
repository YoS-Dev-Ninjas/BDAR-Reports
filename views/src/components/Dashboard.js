import React,{ Fragment, useEffect, useState } from 'react';
import { render } from 'react-dom';
import Highcharts, { keys } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MenuA from './MenuA';
import Cookies from 'js-cookie';
import { Link, redirect, useNavigate } from "react-router-dom";
import env from "react-dotenv";
require("highcharts/modules/exporting")(Highcharts);

export default function Dashboard() {
const navigate = useNavigate();
//Load Configs
const [Configs, setConfig] = useState([]);
const ShowConfigs = async(CurrentUser) => {
try {
const response = await fetch(`${process.env.REACT_APP_API_URL}/DashboardConfigs/User/${CurrentUser}`);
  const jsonData = await response.json();  
  setConfig(jsonData);
  // console.log(jsonData)
} catch (err) {
  console.error(err.message);
}
};

const CallConfig = (event) => {
  navigate('/Config');
};



useEffect(() => {
const CurrentUser = Cookies.get('SessionID');
ShowConfigs(CurrentUser);
// fetchRegionBirthData();
// fetchDistrictBirthData();
}, []);
// 
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

        {/* <div className="page-header">
    <h4 className="page-title">Generate Birth Report(s) :</h4>
  </div> */}
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
                <button
                type='button'
                  className='btn btn-dark'
                  title='Add New Dashboard'
                  onClick={CallConfig}
                  >
                  <strong><i className='fa fa-plus'></i> &nbsp; Add New Dashboard</strong>
                </button>
        </div>
        <div className="card-body">
          <p className="demo">

          

        <div className="row">
         
        {Configs.map((Config) => (     

         
        <div className="col-sm-6">        
             {/* {getChartData(Config.id,Config.sectionkpi,Config.sectiongroupedby,Config.sectionstartdate,Config.sectionenddate,Config.region,Config.district,Config.county,Config.constituency,Config.subcounty,Config.parish,Config.village)} */}
          <hr/>                    
            <figure className="highcharts-figure" style={{width:'100% !important',height:'100% !important'}}>
              <div id="container" >          
              <HighchartsReact
              highcharts={Highcharts}
              options={
                { 
                  chart: {
                    type: Config.sectioncharttype
                },
                exporting: {
                  allowHTML: true
              },
                title: {
                    text: Config.sectiontitle
                },
                subtitle: {
                    text: Config.sectionkpi 
                },
                xAxis: {
                    categories: ['Central', 'Eastern', 'Northern', 'Western']
                },
                yAxis: {
                    title: {
                        text: Config.sectionkpi
                    }
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    }
                },
                series: [{
                    name: 'Notifications',
                    data: [46, 0, 45, 0]
                }, 
                  {name: 'Registrations',
                    data: [23, 0, 34, 0]
                  }, {
                    name: 'Certificates',
                    data: [0, 23, 78, 0]
                }]
            
            
            
                }
              }
              />
              </div>
            </figure>
          </div>
        
        ))}
          {/* <div className="col-sm-6">
          <hr/>            
            <figure className="highcharts-figure">
              <div id="container1" >
              <HighchartsReact
              highcharts={Highcharts}
              options={options1}
              />
              </div>
            </figure>
          </div>
        </div>
        <div style={{margin:'20px'}}>&nbsp;</div>
        <div className="row">
          <div className="col-sm-6">
          <hr/>
            <figure className="highcharts-figure" style={{width:'100% !important',height:'100% !important'}}>
              <div id="container">          
              <HighchartsReact
              highcharts={Highcharts}
              options={options2}
              />
              </div>
            </figure>
          </div>
          <div className="col-sm-6">
          <hr/>          
            <figure className="highcharts-figure">
              <div id="container1" >
              <HighchartsReact
              highcharts={Highcharts}
              options={options3}
              />
              </div>
            </figure>
          </div> */}
        </div>

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
