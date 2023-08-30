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
//const _ = require("lodash"); 

export default function Filter1() {
  const printContent = () => {
    const printableContent = document.getElementById("printable-content");
    const printWindow = window.open("", "", "height=1000,width=1000");
    printWindow.document.write(printableContent.innerHTML);
    printWindow.print();
};      
      //Load RegionData
      const [ReportData, setReportData] = useState([]);
      const [G_T_Notifications, setG_T_Notifications] = useState([]);
      const [G_T_Registrations, SetG_T_Registrations] = useState([]);      
      const [G_M_Notifications, setG_M_Notifications] = useState([]);
      const [G_F_Notifications, SetG_F_Notifications] = useState([]);
      const [G_M_Registrations, setG_M_Registrations] = useState([]);
      const [G_F_Registrations, SetG_F_Registrations] = useState([]);
      const [T_Notifications, setT_Notifications] = useState([]);
      const [M_Notifications, SetM_Notifications] = useState([]);
      const [F_Notifications, SetF_Notifications] = useState([]);
      const [T_Registrations, SetT_Registrations] = useState([]);
      const [M_Registrations, SetM_Registrations] = useState([]);
      const [F_Registrations, SetF_Registrations] = useState([]);
      const ShowReport = async() => {
      try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/test`);
        const jsonData = await response.json();
        setReportData(jsonData.RData)  
        setT_Notifications(jsonData.T_N)
        SetM_Notifications(jsonData.M_N)
        SetF_Notifications(jsonData.F_N)
        SetT_Registrations(jsonData.T_R)
        SetM_Registrations(jsonData.M_R)
        SetF_Registrations(jsonData.F_R)
        setG_T_Notifications(jsonData.G_N)
        SetG_T_Registrations(jsonData.G_R)
        setG_M_Notifications(jsonData.G_M_N)
        SetG_F_Notifications(jsonData.G_F_N)
        setG_M_Registrations(jsonData.G_M_R)
        SetG_F_Registrations(jsonData.G_F_R)
        console.log(jsonData)
      } catch (err) {
        console.error(err.message);
      }
    };

  

    useEffect(() => {
      ShowReport();
      // fetchRegions();
      // const NewData =  _.merge(Configs, Regions)
      // console.log(_.merge(Configs, Regions))
      }, []);
  return (
    <div>
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
              <h4><strong>DEATH STATISTICS REPORT</strong></h4>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div align="center" />
            </td>
            <td colSpan={3} className="Title3">
              <div align="left">Start-Date : {}</div>
            </td>
            <td colSpan={3} className="Title3">
              <div align="right">End-Date : {}</div>
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
                <strong>{details.value} </strong>
              </div>
            </td>
            <td>
              <div align="center">
                <strong>
                {M_Notifications.filter(data => data.region == details.id).map(filteredData => (
                   <>
                    {filteredData.value}
                  </>
                    ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center">
                <strong>
                {F_Notifications.filter(data => data.region == details.id).map(filteredData => (
                   <>
                    {filteredData.value }
                  </>
                    ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center">
                <strong>
                {T_Notifications.filter(data => data.region == details.id).map(filteredData => (
                   <>
                    {filteredData.value}
                  </>
                    ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center">
                <strong>
                {M_Registrations.filter(data => data.region == details.id).map(filteredData => (
                   <>
                    {filteredData.value}
                  </>
                    ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center">
                <strong>
                {F_Registrations.filter(data => data.region == details.id).map(filteredData => (
                   <>
                    {filteredData.value}
                  </>
                    ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center">
                <strong>
                {T_Registrations.filter(data => data.region == details.id).map(filteredData => (
                   <>
                    {filteredData.value}
                  </>
                    ))}
                </strong>
              </div>
            </td>
          </tr>
 ))}

          <tr>
            <td>
              <div align="right" className="Title3">
                <strong>Grand-Total :</strong>
              </div>
            </td>
            <td>
              <div align="center" className="Title3">
                <strong>
                {G_M_Notifications.map(filteredData => (
                   <>
                    <h2> {filteredData.value}</h2>
                  </>
                ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center" className="Title3">
                <strong>
                {G_F_Notifications.map(filteredData => (
                   <>
                    <h2> {filteredData.value}</h2>
                  </>
                ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center" className="Title3">
                <strong>
                {G_T_Notifications.map(filteredData => (
                   <>
                    <h2> {filteredData.value}</h2>
                  </>
                ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center" className="Title3">
                <strong>
                {G_M_Registrations.map(filteredData => (
                   <>
                   <h2> {filteredData.value}</h2> 
                  </>
                ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center" className="Title3">
                <strong>
                {G_F_Registrations.map(filteredData => (
                   <>
                   <h2>  {filteredData.value}</h2>
                  </>
                ))}
                </strong>
              </div>
            </td>
            <td>
              <div align="center" className="Title3">
                <strong>
                {G_T_Registrations.map(filteredData => (
                   <>
                   <h2> {filteredData.value}</h2>
                  </>
                ))}
                </strong>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={7}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
        </div>
        
  
    
    
    
    </div>
  );
}