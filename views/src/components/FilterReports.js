import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import ConfigForm from './ConfigForm';
import AdoptionForm from './AdoptionForm';
import DeathForm from './DeathForm';
import BirthForm from './BirthForm';
import Dashboard from './Dashboard';

  const FilterReports = () => {
     return (
<div>
 <>
   {/*<div class="page-inner">*/}
   <div className="page-header">
    <h4 className="page-title">{/*?php echo "Today : ".date("d F, Y");?*/}</h4>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">System Users</h4>
        </div>
        <div className="card-body">{/* <p class="demo"> */}


  {/* <div className="container">
    <div className="tab-wrap"> */}
      <input type="radio" id="tab1"  name="tabGroup1"  className="tab"  defaultChecked="true"  />
      <label htmlFor="tab1">
        <i className="fa-solid fa-bars fa-xl" style={{ marginBottom: 5 }} />
        <br />
        Dashboard
      </label>
      <input type="radio" id="tab2" name="tabGroup1" className="tab" />
      <label htmlFor="tab2">
        <i className="fas fa-users fa-xl" style={{ marginBottom: 5 }} />
        <br />
        Birth Report(s)
      </label>
      <input type="radio" id="tab3" name="tabGroup1" className="tab" />
      <label htmlFor="tab3">
        <i className="fas fa-users-slash fa-xl" style={{ marginBottom: 5 }} />
        <br />
        Death Report(s)
      </label>
      <input type="radio" id="tab4" name="tabGroup1" className="tab" />
      <label htmlFor="tab4">
        <i className="fas fa-user-plus fa-xl" style={{ marginBottom: 5 }} />
        <br />
        Adoption Report(s)
      </label>
      <input type="radio" id="tab5" name="tabGroup1" className="tab" />
      <label htmlFor="tab5">
        <i className="fa-solid fa-gears fa-xl" style={{ marginBottom: 5 }} />
        <br />
        Configure Dashboard
      </label>
      <div className="tab__content">
        <br />

       <Dashboard />
       <div className="footer" align="left">
    <img src="NIRA.png" className="img-fluid" width="100px" height="30px"  alt=""/>
  </div>

      </div>
      <div className="tab__content">
       
      <BirthForm />       

      </div>
      <div className="tab__content">

      <DeathForm />

      </div>
      <div className="tab__content">

        <AdoptionForm />
        
      </div>

      <div className="tab__content">

      <ConfigForm />
      
      </div>
    {/* </div>
  </div> */}

	{/* <!-- </p> --> */}
								</div>
							</div>
						</div> 
				</div>
				










  
</>        
        
        
        
        
        
        
</div>
   
  )
}

export default FilterReports;

