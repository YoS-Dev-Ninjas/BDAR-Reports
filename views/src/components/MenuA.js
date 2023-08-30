import React from 'react'
import { Fragment } from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Routes , useNavigate , Link} from 'react-router-dom';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import FilterReports from './FilterReports';
import Header from './Header';
import ConfigForm from './ConfigForm';
import AdoptionForm from './AdoptionForm';
import DeathForm from './DeathForm';
import BirthForm from './BirthForm';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import ChangePassword from './ChangePassword';
import Filter1 from './Filter1';
import AdoptionFilter from './AdoptionFilter';
import BirthFilter from './BirthFilter';
import DeathFilter from './DeathFilter';
import Cookies from 'js-cookie';
export default function MenuA() {
  return (
    <div> 

  {/* Sidebar */}
  <div className="sidebar sidebar-style-2">
    <div className="sidebar-wrapper scrollbar scrollbar-inner">
      <div className="sidebar-content">
        <div className="user">
          <div className="avatar-sm float-left mr-2">
            <img
              src="Avatar.jpg"
              alt="image profile"
              className="avatar-img rounded img-fluid"
            />
          </div>
          <div className="info">
            <a
              data-toggle="collapse"
              href="#collapseExample"
              aria-expanded="true"
            >
              <span>
                {Cookies.get("SessionFName") + '  ' + Cookies.get("SessionLName")}
                <span className="user-level">
                  {Cookies.get("SessionLevel")}
                </span>
                <span className="caret" />
              </span>
            </a>
            <div className="clearfix" />
            <div className="collapse in" id="collapseExample22222222222222">
              <ul className="nav">
               
                <li>
                  <a href="/">
                    <span className="link-collapse">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="nav nav-danger">
        <li class="nav-item active">
							<a data-toggle="collapse" href="#dashboard" class="collapsed" aria-expanded="false">
								<i class="fas fa-home"></i>&nbsp;&nbsp;&nbsp;
								<p>DASHBOARD</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="dashboard">
								<ul class="nav nav-collapse">
									<li>
										<a href="/Dashboards">
											<span class="sub-item"> My Dashboard</span>
										</a>
									</li>
								
								</ul>
							</div>
						</li>
          <li className="nav-section">
            <span className="sidebar-mini-icon">
              <i className="fa fa-ellipsis-h" />
            </span>
            <h4 className="text-section">MENU</h4>
          </li>
          <If condition={Cookies.get("SessionLevel") == 'System Administrator'}>
          <Then>
          <li className="nav-item">
            <a data-toggle="collapse" href="#base">
              <i className="fas fa-layer-group" /> &nbsp;&nbsp;&nbsp;
              <p>System Setting(s)</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="base">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/AddUser">
                    <span className="sub-item">Create New User</span>
                  </a>
                </li>
                <li>
                  <a href="/AddUser">
                    <span className="sub-item">View System Users</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          </Then>
          </If>
     
          <li className="nav-item">
            <a data-toggle="collapse" href="#maps4442">
              <i className="fas fa-users" /> &nbsp;&nbsp;&nbsp;
              <p>Birth Report(s)</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="maps4442">
              <ul className="nav nav-collapse">
               <li>
                  <a href="/Births">
                    <span className="sub-item">Generate Birth Report</span>
                  </a>
                </li>
                <li>
                  <a href="/BFilter">
                    <span className="sub-item">Filter Birth Record(s) </span>
                  </a>
                </li>              
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-toggle="collapse" href="#maps44433">
              <i className="fas fa-users-slash" />  &nbsp;&nbsp;&nbsp;
              <p>Death Report(s)</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="maps44433">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/Deaths">
                    <span className="sub-item">Generate Death Report</span>
                  </a>
                </li>
                <li>
                  <a href="/DFilter">
                    <span className="sub-item">Filter Death Record(s)
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a data-toggle="collapse" href="#maps444">
              <i className="fas fa-users" /> &nbsp;&nbsp;&nbsp;
              <p>Adoption Report(s)</p>
              <span className="caret" />
            </a>
            <div className="collapse" id="maps444">
              <ul className="nav nav-collapse">
                <li>
                  <a href="/Adoptions">
                    <span className="sub-item">Generate Adoption Report</span>
                  </a>
                </li>
                <li>
                  <a href="/AFilter">
                    <span className="sub-item">Filter Adoption Record(s)</span>
                  </a>
                </li>                
              </ul>
            </div>
          </li>    
          <li className="nav-item">
            <a data-toggle="collapse" href="#maps44423">
              <i className="fa-solid fa-bars" /> &nbsp;&nbsp;&nbsp;
              <p>Manage Dashboard(s)</p> 
              <span className="caret" />
            </a>
            <div className="collapse" id="maps44423">
              <ul className="nav nav-collapse">
               <li>
                  <a href="/Config">
                    <span className="sub-item">Set Dashboard</span>
                  </a>
              </li>               
              </ul>
            </div>
          </li>

          <li class="mx-4 mt-2">
							<a href="/" class="btn btn-danger btn-block"><span class="btn-label mr-2"> <i class="fa fa-lock"></i> </span>LOGOUT</a> 
						</li>

        </ul>
      </div>
    </div> 
  
  
 
  {/* End Sidebar */}
 

  </div>
        
    </div>
  )
}
