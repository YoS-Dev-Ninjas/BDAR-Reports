import React from 'react';
import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes , Link, useNavigate } from 'react-router-dom';
import FilterReports from './components/FilterReports';
import AddUser from './components/AddUser';
import Users from './components/Users';
import ConfigForm from './components/ConfigForm';
import AdoptionForm from './components/AdoptionForm';
import DeathForm from './components/DeathForm';
import BirthForm from './components/BirthForm';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import ChangePassword from './components/ChangePassword';
import Filter1 from './components/Filter1';
import AdoptionFilter from './components/AdoptionFilter';
import BirthFilter from './components/BirthFilter';
import DeathFilter from './components/DeathFilter';
// import { Link, useNavigate } from "react-router-dom";
function App() {
  
  return (
    <Fragment>
   <div className="App">

   <Router>
       <Routes>
         <Route exact path="/" element={<LoginPage />} />
         <Route path="/AddUser" element={<AddUser />} />
         <Route exact path="/Users" element={<Users />} />
         <Route exact path="/ChangePassword" element={<ChangePassword />} />
         <Route path="/Config" element={<ConfigForm />} />
         <Route exact path="/Births" element={<BirthForm />} />
         <Route path="/Deaths" element={<DeathForm />} />
         <Route exact path="/Adoptions" element={<AdoptionForm />} />
         <Route path="/Dashboards" element={<Dashboard />} />
         <Route path="/Filter" element={<Filter1 />} />
         <Route path="/AFilter" element={<AdoptionFilter />} />
         <Route path="/BFilter" element={<BirthFilter />} />
         <Route path="/DFilter" element={<DeathFilter />} />
       </Routes>
     </Router>

   </div>  
    </Fragment>

  );
}

export default App;
