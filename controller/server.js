const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./dbConfig');
const pool2 = require('./dbConfig2');
const { createHash }  = require('crypto');
const bcrypt = require('bcrypt');
const { hash } = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// middlewares
app.use(cors(
    {
      origin: process.env.ORIGIN_URL,
      methods: ['GET, POST'],
      credentials : true  
    }
))
app.use(cookieParser())
app.use(express.urlencoded({extended: false})); // To process data from forms
app.use(express.json({ extended: false }));

//Load regions
app.get('/regions', async (req, res) => {
    try {
        const regionslist = await pool.query('SELECT * FROM crs_common_data_service_cms.region ORDER BY value ASC');
        res.json(regionslist.rows);
    } catch (error) {
        console.error(error.message);
    }
});
//Load Districts
app.get('/districts/:region', async (req, res) => {
    const { region } = req.params;
    console.log(region)
    try {
        const districts = await pool.query("SELECT * FROM crs_common_data_service_cms.district WHERE region_id=$1 ORDER BY value ASC", 
        [region]);
        res.json(districts.rows);       
    } catch (error) {
        console.error(error.message);
    }
});
//Load Counties
app.get('/counties/:district', async (req, res) => {
    const { district } = req.params;
    console.log(district)
    try {
        const Counties = await pool.query("SELECT * FROM crs_common_data_service_cms.county WHERE district_id=$1 ORDER BY value ASC", 
        [district]);
        res.json(Counties.rows);       
    } catch (error) {
        console.error(error.message);
    }
});
//Load constituencies
app.get('/constituencies/:county', async (req, res) => {
    const { county } = req.params;
    console.log(county)
    try {
        const Constituencies = await pool.query("SELECT * FROM crs_common_data_service_cms.constituency WHERE county_id=$1 ORDER BY value ASC", 
        [county]);
        res.json(Constituencies.rows);       
    } catch (error) {
        console.error(error.message);
    }
});
//Load SubCounties
app.get('/subcounties/:constituency', async (req, res) => {
    const { constituency } = req.params;
    console.log(constituency)
    try {
        const SubCounties = await pool.query("SELECT * FROM crs_common_data_service_cms.sub_county WHERE constituency_id=$1 ORDER BY value ASC", 
        [constituency]);
        res.json(SubCounties.rows);       
    } catch (error) {
        console.error(error.message);
    }
});
//Load Parishes
app.get('/parishes/:subcounty', async (req, res) => {
    const { subcounty } = req.params;
    console.log(subcounty)
    try {
        const Parishes = await pool.query("SELECT * FROM crs_common_data_service_cms.parish WHERE sub_county_id=$1 ORDER BY value ASC", 
        [subcounty]);
        res.json(Parishes.rows);       
    } catch (error) {
        console.error(error.message);
    }
});
//Load Villages
app.get('/villages/:parish', async (req, res) => {
    const { parish } = req.params;
    console.log(parish)
    try {
        const Villages = await pool.query("SELECT * FROM crs_common_data_service_cms.village WHERE parish_id=$1 ORDER BY value ASC", 
        [parish]);
        res.json(Villages.rows);   
        // console.log(Villages.rows)    
    } catch (error) {
        console.error(error.message);
    }
});

// Birth Reports --- GET URL Values from reactjs
app.get('/BReports/report/:report/region/:region/district/:district/county/:county/constituency/:constituency/subcounty/:subcounty/parish/:parish/village/:village/StartDate/:StartDate/EndDate/:EndDate', async (req, res) => {
    const report = req.params.report
    const region = req.params.region
    const  district= req.params.district
    const  county = req.params.county
    const  constituency= req.params.constituency
    const  subcounty= req.params.subcounty
    const parish= req.params.parish
    const village= req.params.village
    const StartDate= req.params.StartDate
    const EndDate= req.params.EndDate
    // console.log(req.params.report)
    try {
        let ReportData =""
        if(report == 'General-Births-Region')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.region ON crs_birth_data_service_application.birth_record.region_of_birth_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
        }
        else if(report == 'General-Births-Revenue-Region')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.region ON crs_birth_data_service_application.birth_record.region_of_birth_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
        }
        else if(report == 'Birth-Regional-District')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-District-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Mother-Age')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Birth-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Birth-Weight')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Birth-Outside')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Birth-Disability')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Birth-Facility')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Birth-Regional-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id WHERE crs_birth_data_service_application.birth_record.region_of_birth_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        ////////////////////////////// DISTRICT /////////////////////////////////////////////////////////////////////////
        else if(report == 'Birth-District')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id;");
        }
        else if(report == 'Birth-District-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id;");
        }
        else if(report == 'Birth-District-Sub-County')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Revenue-Sub-County')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Mother-Age')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Birth-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Birth-Weight')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Birth-Outside')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Birth-Disability')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Birth-Facility')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Birth-District-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id WHERE crs_birth_data_service_application.birth_record.district_of_birth_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        /////////////// SUB - COUNTY /////////////////////////////////////////////////////////
        else if(report == 'Birth-Sub-County')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id GROUP BY crs_common_data_service_cms.sub_county.id;");
        }
        else if(report == 'Birth-Sub-County-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.sub_county ON crs_birth_data_service_application.birth_record.sub_county_of_birth_id = crs_common_data_service_cms.sub_county.id GROUP BY crs_common_data_service_cms.sub_county.id;");
        }
        else if(report == 'Birth-Sub-County-Parish')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Revenue-Parish')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Mother-Age')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Birth-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Birth-Weight')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Birth-Outside')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Birth-Disability')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Birth-Facility')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Birth-Sub-County-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id WHERE crs_birth_data_service_application.birth_record.sub_county_of_birth_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        /////////////  PARISH /////////////////////////////////////////////////////////////
        else if(report == 'Birth-Parish')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id GROUP BY crs_common_data_service_cms.parish.id;");
        }
        else if(report == 'Birth-Parish-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.parish ON crs_birth_data_service_application.birth_record.parish_of_birth_id = crs_common_data_service_cms.parish.id GROUP BY crs_common_data_service_cms.parish.id;");
        }
        else if(report == 'Birth-Parish-Village')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Revenue-Village')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Mother-Age')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Birth-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Birth-Weight')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Birth-Outside')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Birth-Disability')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Birth-Facility')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Birth-Parish-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.parish_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        /////////////   VILLAGE ///////////////////////////////////////////////////////////
        else if(report == 'Birth-Village')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }              
        else if(report == 'Birth-Village-Mother-Age')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Birth-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Birth-Weight')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Birth-Outside')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Birth-Disability')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Birth-Facility')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        else if(report == 'Birth-Village-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.village ON crs_birth_data_service_application.birth_record.village_of_birth_id = crs_common_data_service_cms.village.id WHERE crs_birth_data_service_application.birth_record.village_of_birth_id = $1 GROUP BY crs_common_data_service_cms.village.id;", 
            [village]);
        }
        ///////////////////////////////////////////////////////////////////////////////////
        res.json(ReportData.rows);
        console.log(ReportData.rows)
        // console.log(ReportData2.rows[2].num)        
    } catch (error) {
        console.error(error.message);
    }
});

// Death Reports --- GET URL Values from reactjs
app.get('/DReports/report/:report/region/:region/district/:district/county/:county/constituency/:constituency/subcounty/:subcounty/parish/:parish/village/:village/StartDate/:StartDate/EndDate/:EndDate', async (req, res) => {
    const report = req.params.report
    const region = req.params.region
    const  district= req.params.district
    const  county = req.params.county
    const  constituency= req.params.constituency
    const  subcounty= req.params.subcounty
    const parish= req.params.parish
    const village= req.params.village
    const StartDate= req.params.StartDate
    const EndDate= req.params.EndDate
    // console.log(req.params.report)
    try {
        let ReportData =""
        if(report == 'General-Deaths-Region')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.region ON crs_death_data_service_application.death_record.region_of_death_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
        }
        else if(report == 'General-Deaths-Revenue-Region')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.region ON crs_death_data_service_application.death_record.region_of_death_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
        }
        else if(report == 'Death-Regional-District')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Death-Regional-District-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Death-Regional-Death-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Death-Regional-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Death-Regional-Age-Group')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Death-Regional-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        else if(report == 'Death-Regional-Death-Cause')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id WHERE crs_death_data_service_application.death_record.region_of_death_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
            [region]);
        }
        ////////// DISTRICT /////////////////////
        if(report == 'Death-District')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id;");
        }
        else if(report == 'Death-District-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.district ON crs_death_data_service_application.death_record.district_of_death_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id;");
        }
        else if(report == 'Death-District-Sub-County')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Death-District-Revenue-Sub-County')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Death-District-Age-Group')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Death-District-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Death-District-Death-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Death-District-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        else if(report == 'Death-District-Death-Cause')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id WHERE crs_death_data_service_application.death_record.district_of_death_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
            [district]);
        }
        ///////// SUB-COUNTY /////////////
        if(report == 'Death-Sub-County')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id GROUP BY crs_common_data_service_cms.sub_county.id;");
        }
        else if(report == 'Death-Sub-County-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.sub_county ON crs_death_data_service_application.death_record.sub_county_of_death_id = crs_common_data_service_cms.sub_county.id GROUP BY crs_common_data_service_cms.sub_county.id;");
        }
        if(report == 'Death-Sub-County-Parish')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Death-Sub-County-Revenue-Parish')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);        
        }
        else if(report == 'Death-Sub-County-Age-Group')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]); 
        }
        else if(report == 'Death-Sub-County-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]); 
        }
        else if(report == 'Death-Sub-County-Death-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]); 
        }
        else if(report == 'Death-Sub-County-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]);
        }
        else if(report == 'Death-Sub-County-Death-Cause')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.parish.id,crs_common_data_service_cms.parish.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.parish ON crs_death_data_service_application.death_record.parish_of_death_id = crs_common_data_service_cms.parish.id WHERE crs_death_data_service_application.death_record.sub_county_of_death_id = $1 GROUP BY crs_common_data_service_cms.parish.id", 
            [subcounty]); 
        }
        //////// PARISH ////////////////
        if(report == 'Death-Parish')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id GROUP BY crs_common_data_service_cms.village.id;");
        }
        else if(report == 'Death-Parish-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id GROUP BY crs_common_data_service_cms.village.id;");
        }
        if(report == 'Death-Parish-Village')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Death-Parish-Revenue-Village')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);        
        }
        else if(report == 'Death-Parish-Age-Group')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]); 
        }
        else if(report == 'Death-Parish-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]); 
        }
        else if(report == 'Death-Parish-Death-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]); 
        }
        else if(report == 'Death-Parish-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]);
        }
        else if(report == 'Death-Parish-Death-Cause')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.parish_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [parish]); 
        }
        /////// VILLAGE //////////////
        if(report == 'Death-Village')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        else if(report == 'Death-Village-Revenue')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        else if(report == 'Death-Village-Age-Group')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        else if(report == 'Death-Village-Citizenship')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        else if(report == 'Death-Village-Death-Place')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        else if(report == 'Death-Village-Nationality')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        else if(report == 'Death-Village-Death-Cause')
        {
            ReportData = await pool.query("SELECT crs_common_data_service_cms.village.id,crs_common_data_service_cms.village.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.village ON crs_death_data_service_application.death_record.village_of_death_id = crs_common_data_service_cms.village.id WHERE crs_death_data_service_application.death_record.village_of_death_id = $1 GROUP BY crs_common_data_service_cms.village.id", 
            [village]); 
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        res.json(ReportData.rows);
        console.log(ReportData.rows)
        // console.log(ReportData2.rows[2].num)        
    } catch (error) {
        console.error(error.message);
    }
});

// Adoption Reports --- GET URL Values from reactjs
app.get('/AReports/report/:report/region/:region/district/:district/StartDate/:StartDate/EndDate/:EndDate', async (req, res) => {
    const report = req.params.report
    const region = req.params.region
    const  district= req.params.district
    const StartDate= req.params.StartDate
    const EndDate= req.params.EndDate
    try {
        let ReportData =""
            if(report == 'General-Adoption-Region')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.region ON crs_adoption_data_service_application.adopter_guardian_record.region_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
            }
            else if(report == 'General-Adoption-Revenue-Region')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.region ON crs_adoption_data_service_application.adopter_guardian_record.region_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
            }
            else if(report == 'Adoption-Regional-District')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id WHERE crs_adoption_data_service_application.adopter_guardian_record.region_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
                [region]);
            }
            else if(report == 'Adoption-Regional-District-Revenue')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id WHERE crs_adoption_data_service_application.adopter_guardian_record.region_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
                [region]);
            }
            else if(report == 'Adoption-Regional-Citizenship')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id WHERE crs_adoption_data_service_application.adopter_guardian_record.region_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
                [region]);
            }
            else if(report == 'Adoption-Regional-Age-Group')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id WHERE crs_adoption_data_service_application.adopter_guardian_record.region_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
                [region]);
            }
            else if(report == 'Adoption-Regional-Nationality')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id WHERE crs_adoption_data_service_application.adopter_guardian_record.region_id = $1 GROUP BY crs_common_data_service_cms.district.id", 
                [region]);
            }
            //////////  DISTRICT /////////
            if(report == 'Adoption-District')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id;");
            }
            else if(report == 'Adoption-District-Revenue')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.district ON crs_adoption_data_service_application.adopter_guardian_record.district_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id;");
            }
            else if(report == 'Adoption-District-Sub-County')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.sub_county ON crs_adoption_data_service_application.adopter_guardian_record.sub_county_id = crs_common_data_service_cms.sub_county.id WHERE crs_adoption_data_service_application.adopter_guardian_record.district_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
                [district]);
            }
            else if(report == 'Adoption-District-Citizenship')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.sub_county ON crs_adoption_data_service_application.adopter_guardian_record.sub_county_id = crs_common_data_service_cms.sub_county.id WHERE crs_adoption_data_service_application.adopter_guardian_record.district_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
                [district]);
            }
            else if(report == 'Adoption-District-Age-Group')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.sub_county ON crs_adoption_data_service_application.adopter_guardian_record.sub_county_id = crs_common_data_service_cms.sub_county.id WHERE crs_adoption_data_service_application.adopter_guardian_record.district_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
                [district]);
            }
            else if(report == 'Adoption-District-Nationality')
            {
                ReportData = await pool.query("SELECT crs_common_data_service_cms.sub_county.id,crs_common_data_service_cms.sub_county.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.sub_county ON crs_adoption_data_service_application.adopter_guardian_record.sub_county_id = crs_common_data_service_cms.sub_county.id WHERE crs_adoption_data_service_application.adopter_guardian_record.district_id = $1 GROUP BY crs_common_data_service_cms.sub_county.id", 
                [district]);
            }
            /////////////////////////////
        res.json(ReportData.rows);
        console.log(ReportData.rows)
        // console.log(ReportData2.rows[2].num)        
    } catch (error) {
        console.error(error.message);
    }
});

//fetch Configs
app.get('/AllConfigs/User/:User', async (req, res) => {
    const User = req.params.User
    try {
        const Configs = await pool2.query("SELECT * FROM crs_reporting.dashboards WHERE userid = $1 ORDER BY id DESC", 
        [User]);
        res.json(Configs.rows);
        //const regionslist = await pool.query('SELECT * FROM crs_common_data_service_cms.region ORDER BY value ASC');
        //return res.json({ConfigData : Configs.rows , RegionData : regionslist.rows}) 
        //console.log(Configs.rows[1].sectionkpi)
    } catch (error) {
        console.error(error.message);
    }
});

//fetch Dashboard Configs
app.get('/DashboardConfigs/User/:User', async (req, res) => {
    const User = req.params.User
    try {
        const Configs = await pool2.query("SELECT * FROM crs_reporting.dashboards WHERE userid = $1 ORDER BY id DESC", 
        [User]);
        res.json(Configs.rows);       
    } catch (error) {
        console.error(error.message);
    }
});

// Dashboards
//fetch Dashboards
app.get('/DashboardData/CID/:CID/region/:region/district/:district/county/:county/constituency/:constituency/subcounty/:subcounty/parish/:parish/village/:village/startdate/:startdate/enddate/:enddate/kpi/:kpi/grougedby/:grougedby', async (req, res) => {
    try {
    const CID = req.params.CID
    const region = req.params.region
    const  district= req.params.district
    const  county = req.params.county
    const  constituency= req.params.constituency
    const  subcounty= req.params.subcounty
    const parish= req.params.parish
    const village= req.params.village
    const  startdate = req.params.startdate
    const  enddate= req.params.enddate
    const  kpi= req.params.kpi
    const grougedby= req.params.grougedby
    if (kpi == 'Birth-Records')
    {
        ChartData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.region ON crs_birth_data_service_application.birth_record.region_of_birth_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
    // res.json(ChartData.rows)
    }
    if (kpi == 'Death-Records')
    {
    ChartData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_death_data_service_application.death_record JOIN crs_common_data_service_cms.region ON crs_death_data_service_application.death_record.region_of_death_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
    //res.json(ChartData.rows);
    // res.json(ChartData.rows)  
    }
    if (kpi == 'Adoption-Records')
    {
        ChartData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_adoption_data_service_application.adopter_guardian_record JOIN crs_common_data_service_cms.region ON crs_adoption_data_service_application.adopter_guardian_record.region_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
        // res.json(ChartData.rows)
    }   
    res.json(ChartData.rows)
    console.log(ChartData.rows)
    } catch (error) {
        console.error(error.message);
    }
});

//Load Region dashboard Birth Data
app.get('/BirthDataRegion', async (req, res) => {
    try {
        DashboardData = await pool.query("SELECT crs_common_data_service_cms.region.id,crs_common_data_service_cms.region.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.region ON crs_birth_data_service_application.birth_record.region_of_birth_id = crs_common_data_service_cms.region.id GROUP BY crs_common_data_service_cms.region.id;");
        res.json(DashboardData.rows)      
    } catch (error) {
        console.error(error.message);
    }
});
//Load District dashboard Birth Data
app.get('/BirthDataDistrict', async (req, res) => {
    try {
        DashboardData = await pool.query("SELECT crs_common_data_service_cms.district.id,crs_common_data_service_cms.district.value,COUNT(*) AS Num FROM crs_birth_data_service_application.birth_record JOIN crs_common_data_service_cms.district ON crs_birth_data_service_application.birth_record.district_of_birth_id = crs_common_data_service_cms.district.id GROUP BY crs_common_data_service_cms.district.id");
        res.json(DashboardData.rows);       
    } catch (error) {
        console.error(error.message);
    }
});

// Configs --- GET URL Values from reactjs
app.get('/Add_Config/title/:title/region/:region/district/:district/county/:county/constituency/:constituency/subcounty/:subcounty/parish/:parish/village/:village/startdate/:startdate/enddate/:enddate/kpi/:kpi/grougedby/:grougedby/charttype/:charttype/User/:User', async (req, res) => {
    try {    
    const title = req.params.title
    const region = req.params.region
    const  district= req.params.district
    const  county = req.params.county
    const  constituency= req.params.constituency
    const  subcounty= req.params.subcounty
    const parish= req.params.parish
    const village= req.params.village
    const  startdate = req.params.startdate
    const  enddate= req.params.enddate
    const  kpi= req.params.kpi
    const grougedby= req.params.grougedby
    const charttype= req.params.charttype
    const CurrentUser= req.params.User
    const newConfig = await pool2.query (
                    'INSERT INTO crs_reporting.dashboards (sectiontitle, sectionkpi, sectiongroupedby, sectionwidth, sectioncharttype, sectionstartdate, sectionenddate,region, district, county,constituency,subcounty, parish, village,userid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',
                    [title,kpi,grougedby,'',charttype,startdate,enddate,region,district,county,constituency,subcounty,parish,village,CurrentUser]
                );
                res.json(newConfig);       
                } catch (error) {
                console.error(error.message);
            }
});
// delete config
app.get('/DConfig/id/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        console.log('Deleted :' + id)
        const newConfig = await pool2.query('DELETE from crs_reporting.dashboards WHERE id = $1', [id]);
        res.json(newConfig);        
    } catch (error) {
        console.error(error.message);
    }
});

// Create User
app.get('/Add_User/FName/:FName/LName/:LName/Email/:Email/PhoneNumber/:PhoneNumber/Role/:Role', async (req, res) => {
    try {    
    const FName = req.params.FName
    const LName = req.params.LName
    const Email= req.params.Email
    const PhoneNumber = req.params.PhoneNumber
    const Role= req.params.Role
    ///////////////////////////////////////
    // const hashedPassword = await hash(Email, 10)
    //const password = "password";
    const salt = process.env.JWT_SECRET;
    const hashedPassword = createHash("sha3-512")
    .update(Email)
    .update(createHash("sha3-512").update(salt, "utf8").digest("hex"))
    .digest("hex");
    //console.log(hashedPassword);
    //////////////////////////////////////
    const newUser = await pool2.query (
                    'INSERT INTO crs_reporting.users (firstName,lastName,email,phoneNumber,userRole,username,userPass) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                    [FName,LName,Email,PhoneNumber,Role,Email,hashedPassword]
                );
                res.json(newUser);       
                } catch (error) {
                console.error(error.message);
            }
});

// Update Password
app.get('/ChangePassword/OldPass/:OldPass/NewPass/:NewPass/User/:User', async (req, res) => {
    try {    
    const OldPass = req.params.OldPass
    const NewPass = req.params.NewPass
    const User= req.params.User
    ///////////////////////////////////////
    const salt = process.env.JWT_SECRET;
    const hashedPassword = createHash("sha3-512")
    .update(NewPass)
    .update(createHash("sha3-512").update(salt, "utf8").digest("hex"))
    .digest("hex");
    //console.log(hashedPassword);
    //////////////////////////////////////
    const newUser = await pool2.query (
                    'UPDATE crs_reporting.users SET userPass = $1 WHERE id = $2',[hashedPassword,User]
                );
                res.json(newUser);
                console.log("Password updated !!!");       
                } catch (error) {
                console.error(error.message);
            }
});

//Logged-In
app.post('/Login', async (req, res) => {
    try {    
            const UserName = req.body.UserName
            const PassW = req.body.UserPass
            ///////////////////////////////////////
            const salt = process.env.JWT_SECRET;
            const hashedPassword = createHash("sha3-512")
            .update(PassW)
            .update(createHash("sha3-512").update(salt, "utf8").digest("hex"))
            .digest("hex");
            //console.log(hashedPassword);
            //console.log(process.env.JWT_SECRET) 
            //////////////////////////////////////
     const UserProfile = await pool2.query (
                            'SELECT * FROM crs_reporting.users WHERE username = $1 AND userpass = $2',
                            [UserName,hashedPassword]
                        );
                        if (UserProfile.rows.length > 0) {       
                         const UserID = UserProfile.rows[0].id
                         const firstname = UserProfile.rows[0].firstname
                         const lastname = UserProfile.rows[0].lastname
                         const Level = UserProfile.rows[0].userrole
                         const token = jwt.sign({UserID} , 'Secret@!!!' ,{expiresIn :'1Hr'})   
                        res.cookie('token', token)
                        //console.log(UserProfile.rows)
                        return res.json({Message : "Successful-Login",UserID : UserID,FirstName:firstname,LastName:lastname,Token:token,Level:Level})
                                  
                        }
                        else
                        {
                          console.log("Invalid UserName and/or Password")
                          return res.json({Message : "INVALID-UserName/Password!!!"})                         
                        }                     
                        } catch (error) {
                        console.error(error.message);
                    }
    });

//fetch Users
app.get('/AllUsers', async (req, res) => {
    try {
        const Users = await pool2.query('SELECT * FROM crs_reporting.users ORDER BY id DESC');
        res.json(Users.rows);
    } catch (error) {
        console.error(error.message);
    }
});
// delete user
app.get('/DUser/id/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        console.log('Deleted :' + id)
        const newUser = await pool2.query('DELETE from crs_reporting.users WHERE id = $1', [id]);
        res.json(newUser);        
    } catch (error) {
        console.error(error.message);
    }
});

//Create Table
app.get('/CreateUser', async (req, res) => {
    try {
        const SQL = "CREATE TABLE  crs_reporting.users (id serial NOT NULL,firstname character varying(50) NOT NULL,lastname character varying(50) NOT NULL,email character varying(50) NOT NULL,phonenumber character varying(50),username character varying(50)  NOT NULL,userpass character varying(250) NOT NULL,userrole character varying(150)  NOT NULL, CONSTRAINT admins_pkey PRIMARY KEY (id))";
        const Users = await pool2.query(SQL);
        res.send("Users Table Created !!!")
        // console.log("Admin Table Created !!!")
    } catch (error) {
        res.send(error.message)
        console.error(error.message);
    }
});

//Create Dashboard
app.get('/CreateDashboard', async (req, res) => {
    try {
        const SQL = "CREATE TABLE crs_reporting.dashboards (id serial NOT NULL,sectiontitle character varying(255),sectionkpi character varying(255),sectiongroupedby character varying(255),sectionwidth character varying(255),sectioncharttype character varying(255),sectionstartdate date,sectionenddate date,region integer,district integer,county integer,subcounty integer,parish integer,userid integer,village integer,constituency integer,CONSTRAINT dashboard22_pkey PRIMARY KEY (id))";
        const Users = await pool2.query(SQL);
        res.send("Dashboards Table Created !!!")
        // console.log("Dashboards Table Created !!!")
    } catch (error) {
        res.send(error.message)
        console.error(error.message);
    }
});

// Create User
app.get('/Add_User22', async (req, res) => {
    try {    
    const FName = "Mable"
    const LName = "Namusisi"
    const Email= "mable@gmail.com"
    const PhoneNumber = "+256702666666"
    const Role= "User"
    ///////////////////////////////////////
    // const hashedPassword = await hash(Email, 10)
    //const password = "password";
    const salt = process.env.JWT_SECRET;
    const hashedPassword = createHash("sha3-512")
    .update(Email)
    .update(createHash("sha3-512").update(salt, "utf8").digest("hex"))
    .digest("hex");
    //console.log(hashedPassword);
    //////////////////////////////////////
    const newUser = await pool2.query (
                    'INSERT INTO crs_reporting.users (firstName,lastName,email,phoneNumber,userRole,username,userPass) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                    [FName,LName,Email,PhoneNumber,Role,Email,hashedPassword]
                );
                res.json(newUser); 
                res.send("User Account Created !!!")      
                } catch (error) {
                res.send(error.message)
                console.error(error.message);
            }
});

//Load DataGrid Birth Data
app.get('/BirthDataGrid', async (req, res) => {
    try {
        const SQL = "SELECT crs_birth_data_service_application.birth_application.id ,crs_birth_data_service_application.birth_application.application_number,crs_birth_data_service_application.birth_application.date_of_approval,crs_birth_data_service_application.birth_application.date_of_submission,crs_birth_data_service_application.birth_application.order_certificate,crs_birth_data_service_application.birth_application.state,crs_birth_data_service_application.birth_record.place_of_birth,crs_birth_data_service_application.birth_record.date_of_birth,crs_birth_data_service_application.birth_record.time_of_birth,crs_birth_data_service_application.birth_record.weight_on_birth,crs_birth_data_service_application.child_record.sex_id,crs_birth_data_service_application.person_record.first_name,crs_birth_data_service_application.person_record.last_name,crs_birth_data_service_application.person_record.other_names FROM crs_birth_data_service_application.birth_application INNER JOIN crs_birth_data_service_application.birth_record ON crs_birth_data_service_application.birth_application.id = crs_birth_data_service_application.birth_record.application_id INNER JOIN crs_birth_data_service_application.child_record ON crs_birth_data_service_application.birth_application.id = crs_birth_data_service_application.child_record.application_id INNER JOIN crs_birth_data_service_application.person_record ON crs_birth_data_service_application.child_record.id = crs_birth_data_service_application.person_record.id"
        
        BirthData = await pool.query(SQL);
        res.json(BirthData.rows)
        console.log(BirthData.rows)      
    } catch (error) {
        console.error(error.message);
    }
});

//Load DataGrid Birth Data
app.get('/DeathDataGrid', async (req, res) => {
    try {
        const SQL = "SELECT crs_death_data_service_application.death_application.id,crs_death_data_service_application.death_application.application_number,crs_death_data_service_application.death_application.date_of_approval,crs_death_data_service_application.death_application.date_of_submission,crs_death_data_service_application.death_application.generate_death_certificate,crs_death_data_service_application.death_application.state,crs_death_data_service_application.death_record.place_of_death,crs_death_data_service_application.death_record.date_of_death,crs_death_data_service_application.death_record.time_of_death,crs_death_data_service_application.death_record.cause_of_death,crs_death_data_service_application.deceased_record.sex_id,crs_death_data_service_application.deceased_record.date_of_birth,crs_death_data_service_application.deceased_record.age,crs_death_data_service_application.deceased_record.nationality_id,crs_death_data_service_application.person_record.first_name,crs_death_data_service_application.person_record.last_name,crs_death_data_service_application.person_record.other_names FROM crs_death_data_service_application.death_application INNER JOIN crs_death_data_service_application.death_record ON crs_death_data_service_application.death_application.id = crs_death_data_service_application.death_record.death_application_id INNER JOIN crs_death_data_service_application.deceased_record ON crs_death_data_service_application.death_application.id = crs_death_data_service_application.deceased_record.death_application_id INNER JOIN crs_death_data_service_application.person_record ON crs_death_data_service_application.deceased_record.id = crs_death_data_service_application.person_record.id"
        DeathData = await pool.query(SQL);
        res.json(DeathData.rows)
        console.log(DeathData.rows)      
    } catch (error) {
        console.error(error.message);
    }
});

//Load DataGrid Adoption Data
app.get('/AdoptionDataGrid', async (req, res) => {
    try {
        const SQL = "SELECT a.id,a.application_number,a.date_of_approval,a.date_of_submission,a.state,d.id,crs_adoption_data_service_application.adopter_guardian_record.email,crs_adoption_data_service_application.adopter_guardian_record.nationality_id,crs_adoption_data_service_application.adopter_guardian_record.occupation,crs_adoption_data_service_application.adopter_guardian_record.primary_phone_number,crs_adoption_data_service_application.child_record.sex_id,crs_adoption_data_service_application.child_record.date_of_birth,crs_adoption_data_service_application.child_record.nationality_id,crs_adoption_data_service_application.adoption_record.birth_certificate_number,crs_adoption_data_service_application.adoption_record.court_adoption_order_date_of_issue,crs_adoption_data_service_application.adoption_record.court_adoption_order_number,crs_adoption_data_service_application.adoption_record.date_of_adoption,crs_adoption_data_service_application.guardianship_record.birth_certificate_number,crs_adoption_data_service_application.guardianship_record.court_guardianship_order_date_of_issue,crs_adoption_data_service_application.guardianship_record.court_guardianship_order_number,crs_adoption_data_service_application.guardianship_record.date_of_guardianship,crs_adoption_data_service_application.guardianship_record.end_date_of_guardianship,crs_adoption_data_service_application.guardianship_record.latency_reason,crs_adoption_data_service_application.person_record.first_name,crs_adoption_data_service_application.person_record.last_name,crs_adoption_data_service_application.person_record.other_names  FROM crs_adoption_data_service_application.application INNER JOIN crs_adoption_data_service_application.adoption_application ON crs_adoption_data_service_application.application.id = crs_adoption_data_service_application.adoption_application.id INNER JOIN crs_adoption_data_service_application.adopter_guardian_record ON crs_adoption_data_service_application.adoption_application.id = crs_adoption_data_service_application.adopter_guardian_record.adoption_application_id INNER JOIN crs_adoption_data_service_application.adoption_record ON crs_adoption_data_service_application.adoption_application.id = crs_adoption_data_service_application.adoption_record.adoption_application_id INNER JOIN crs_adoption_data_service_application.child_record ON crs_adoption_data_service_application.adoption_application.id = crs_adoption_data_service_application.child_record.adoption_application_id INNER JOIN crs_adoption_data_service_application.guardianship_application ON crs_adoption_data_service_application.application.id = crs_adoption_data_service_application.guardianship_application.id INNER JOIN crs_adoption_data_service_application.guardianship_record ON crs_adoption_data_service_application.guardianship_record.guardianship_application_id = crs_adoption_data_service_application.guardianship_application.id INNER JOIN crs_adoption_data_service_application.person_record ON crs_adoption_data_service_application.person_record.id = crs_adoption_data_service_application.adopter_guardian_record.id";
        AdoptionData = await pool.query(SQL);
        res.json(AdoptionData.rows)
        console.log(AdoptionData.rows)      
    } catch (error) {
        console.error(error.message);
    }
});




app.listen(5000, () => console.log('Server started at Port : 5000'))


