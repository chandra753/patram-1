import axios from 'axios'

import React, { useState, useEffect, useStyles } from "react";
import { Slides } from "@mui/material";
//import { Component, Fragment } from "react-boostrap";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from 'sweetalert2';
//import { Link, NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  SxProps,
  TextField,
  Modal,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rsuite/dist/rsuite.min.css";
import { Checkbox, CheckboxGroup } from "rsuite";

import "./Navbar.css";
import Profile from "./Profile.jsx";
import CreateAWB from "./CreateAWB.jsx";
import Print from "./Print";
import TrackShipment from "./TrackShipment";
import { Link } from "@mui/material";
import Search from "./Search";
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from "date-fns";
import Skeleton from 'react-loading-skeleton'
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import Moment from 'moment';

const Navbar = () => {

const [filteredData, setFilteredData] = useState([]);
 const [startDate, setStartDate] = useState();
  const [value, setValue] = useState();
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [user, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [slide, setSlide] = useState([]);
  const [date1, setdate] = useState();
const [rs,setrs] = useState([]
    ); 
// const [startDate, setStartDate] = useState();
const [isShown, setIsShown] = useState(false);
const [email,setemail]=useState();
//   const [value, setValue] = useState();
//   const [apiData, setApiData] = useState([])
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slide, setSlide] = useState([
    // { freight: "Jan", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Feb", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Mar", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Apr", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "May", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Jun", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Jul", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Aug", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Sep", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Oct", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Nov", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    // { freight: "Dec", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
  ]);
  const [countsData, setCountsData] = useState({});
console.log(date1);
 // console.log(typeOf(date))
    const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    // useEffect(() => {
    //     axios.post('http://localhost:5000/subscription', {startDate})
    //         .then((response) => {
    //             setApiData(response.data);
    //             console.log(response.data);
    //         }).catch((err) => {
    //             console.log(err)
    //         });
    // }, [startDate])
// const handleSubmit = async (e) => {
// e.preventDefault();
//         try {
//         const response = await axios.post('http://localhost:5000/subscription', { startDate }); 
        
//      //   setGreeting(response.data);
//       setApiData(response.data);
//         console.log(startDate)
//         console.log(response)
//          } catch (error) {
//          console.error('Error:', error);
//          }
//         }
        
        
// useEffect(() => {
//         handleSubmit();
//          }, [startDate]);


const showDetail = (Customer_Id) =>
    {
       
      fetch(`http://localhost:5000/invoicedetails/${Customer_Id}`)
      .then(resposne=> resposne.json())
      .then(res=>setrs(res))
      }

      useEffect(() => {
        showDetail();
     },[])

const emailremainder = (Customer_Id) =>
      {
         
        fetch(`http://localhost:5000/gmailremainder/${Customer_Id}`)
        .then(resposne=> resposne.json())
        .then(res=>setemail(res));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Remainder sent successfully',
            width:400,
            showConfirmButton: false,
            timer: 1500
          })
      }
console.log(rs);   
const [api, setApi] = useState("");
console.log(startDate);
   const [date, setDate] = useState(startDate);
    const [filterOptions, setFilterOptions] = useState({ 
        Input_date: startDate,
        Input_array: {
          allRecords: "1",
          activeRecords: "1",
          additionData: "1",
          expiryData: "1",
        },
      });
    console.log(filterOptions);

    useEffect(() => {
        fetchData();
      }, [filterOptions]);
    
      const fetchData = async () => {
        console.log(filterOptions, "filterOptionsfilterOptionsfilterOptions");
        if (api?.length > 0) {
          const response = await fetch("http://127.0.0.1:5000/filtering", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filterOptions),
          });
    
          const responseData = await response.json();
          console.log(responseData, "hmhmhh");
          setApiData(responseData);
          setFilteredData(responseData)
        }
      };
    
      // Function to handle checkbox changes
      const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setApi(name);
        if (name === "activeRecords") {
          setFilterOptions({
            ...filterOptions,
            Input_array: {
              allRecords: "0",
              activeRecords: "1",
              additionData: "0",
              expiryData: "0",
            },
          });
        } else if (name === "additionData") {
          setFilterOptions({
            ...filterOptions,
            Input_array: {
              allRecords: "0",
              activeRecords: "0",
              additionData: "1",
              expiryData: "0",
            },
          });
        } else if (name === "expiryData") {
          setFilterOptions({
            ...filterOptions,
            Input_array: {
              allRecords: "0",
              activeRecords: "0",
              additionData: "0",
              expiryData: "1",
            },
          });
        } else {
          setFilterOptions({
            ...filterOptions,
            Input_array: {
              allRecords: "1",
              activeRecords: "1",
              additionData: "1",
              expiryData: "1",
            },
          });
        }
    
        // setFilterOptions((prevOptions) => ({
        //   ...prevOptions,
        //   Input_array: {
        //     ...prevOptions.Input_array,
        //     [name]: checked ? "1" : "0",
        //   },
        // }));
      };
    
      console.log(filterOptions, "filterOptionsfilterOptions");
      // Function to handle date input change
      const handleDateInputChange = (e) => {
        const { value } = e.target;
        const real = Moment(value).format("YYYY-MM");
    
        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          input_date: real,
        }));
      };

      const handleMonth = (data) => {
        JSON.stringify(slide);
        console.log("handleMonth",data)
        console.log("tabledata", apiData)
        let month=['Jan','Feb','Mar','Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
        //let d = new Date("Sun, 05 May 2024 00:00:00 GMT")
        const d = new Date(2018, 11);
        console.log(month[d.getMonth()])
        let data1 = []
        apiData?.map((item1)=>{
          let date = new Date(item1.Subscription_End)
          if(month[date.getMonth()]==data.Freight){       
            console.log("Badave",typeof(item1.forwarders), item1.forwarders)
            data1.push(item1)
          }
        })
        // setApiData(data1)
        setMahesh(data1)
        console.log("filteredData",data1)
      };
      const [MAHESH, setMahesh] = useState();
      const fetchCountsData = async () => {
        try {
          const response = await axios.post("http://127.0.0.1:5000/Counts", {startDate});
          setCountsData(response.data);
        } catch (error) {
          console.error("Error fetching counts data:", error);
        }
      };
      console.log(countsData)
    
      useEffect(() => {
        if (startDate) {
          fetchCountsData();
        }
      }, [startDate]);
    
      useEffect(() => {
        if (startDate) {
          fetchCountsData();
        }
      }, []);
    
    
      const [isMinimized, setIsMinimized] = useState(false);
    
      const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
      };
    
    

return (
    <>

        {/* <img style={{ height: "40px", paddingTop: "-80px", }} className="logo" src="https://www.aircargoweek.com/wp-content/uploads/2015/06/IATA_Logo.svg_.png"/> */}
            <AppBar elevation={20} position="static" style={{ height: "40px", width: "100%", backgroundColor: "#1e90ff", fontWeight: "14px",  boxShadow: "initial", display: "flex"   }}>
                <Toolbar>
                    <Grid item xs={6} className="navbar" style={{ justifyContent:"flex-start"}}>
            
                        <Box p={2} sx={{  alignItems: "center", paddingTop: "1px", display: "flex", justifyContent:"flex-start"}}>
                        <a href="createAWB" component={CreateAWB} style={{ color: "#fff", textDecoration: "none", fontSize: "1rem", fontFamily: "sans-serif" }}>
                            CreateAWB
                        </a>
                        </Box>

                        <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", justifyContent:"flex-start" }}>
                        <Link href="print" style={{ color: "#fff", textDecoration: "none", fontSize: "1rem", fontFamily: "sans-serif" }}>
                            Print
                        </Link>
                        </Box>

                        <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex" }}>
                        <a href="trackshipment" component={TrackShipment} style={{ color: "#fff", textDecoration: "none", fontSize: "1rem", fontFamily: "sans-serif" }}>
                            Track Shipment
                        </a>
                        </Box>

                        <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex" }}>
                        <a href="search" component={Search} style={{ color: "#fff", textDecoration: "none", fontSize: "1rem", fontFamily: "sans-serif" }}>
                            Search
                        </a>
                        </Box>
                    </Grid>

                    <Grid item xs={1} />

                <Grid style={{ display: "flex" }}>
                <Grid item xs={5}>
                    <Box sx={{ display: "flex", spacing: "20px", justifyContent:"flex-end" }}>
                        <Box style={{ display: "flex", textAlign: "center", color: "#fff"}} value={value} onChange={(e, val) => setValue(val)}>
                            <Box className="company_name" p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", fontFamily: "sans-serif", fontSize: "1rem" }}>
                                MPHASIS
                            </Box>
                            <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", color: "#fff" }}>
                                <a href="/profile">
                                <PersonIcon style={{ color: "#fff" }} />
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", color: "#fff" }}>
                                <a href="/setting">
                                <SettingsIcon style={{ color: "fff", size:"small" }}/>
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", color: "#fff" }}>
                                <a href="/home">
                                <HomeIcon className="home" style={{ color: "fff" }} />
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", color: "#fff" }}>
                                <a href="/help">
                                <HelpIcon className="help" style={{ color: "fff" }} />
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "1px", display: "flex", color: "#fff" }}>
                                <a href="/logout">
                                <LogoutIcon className="logout" style={{ color: "fff" }} />
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

        <Paper elevation={23} style={{ height: "80vh", maxWidth: "94.3%", marginTop: "2px", marginLeft: "29px", borderRadius: "initial"}}>
        <div style={{marginLeft: "10px", paddingTop: "20px",paddingBottom:"26px", color: "rgb(4, 121, 199)",}}>
          {isMinimized ? (
            <FaArrowAltCircleUp size={22} onClick={toggleMinimize} />
          ) : (
            <FaArrowAltCircleDown size={22} onClick={toggleMinimize} />
          )}
        </div>
       
        <h4
          style={{
            paddingLeft: "39px",
            textAlign: "left",
            fontSize: "20px",
            paddingTop: "25px",
            marginTop: "-80px",
            fontFamily: "sans-serif",
          }}
        >
          Manage Subscription
        </h4>
        <div className="date" style={{ display:"flex", justifyContent: "flex-end", marginTop: "-20px", marginRight:"40px",paddingTop:"-10px"}}>
              <input type="month" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div> 
        {/* <div class="wrap" style={{marginRight:"-50px"}}>
        <button onClick={handleClick} style={{paddingLeft: "-19px",borderRadius:2, textAlign: "center", fontSize: "20px", paddingTop: "15px", marginTop: "47px",marginBottom:"-8px",background: "#0479C7", fontFamily: "sans-serif",color:"white",height:"40px"}}>Manage Subscription</button>
        </div> */}
            {/* <div style={{display: isShown ? 'block' : 'none'}}> */}
            {!isMinimized && (
               <div id="main-slider-container" style={{marginTop:"4px"}}>
                   <div style={{ marginLeft: "25px", color: "#fff", fontFamily: "sans-serif"}}>
                   <div  style={{fontFamily: "sans-serif", fontColor: "#fff",marginTop: "-18px",marginRight:"-10px" }}>
                        <p style={{marginTop: "20px",marginBottom:"-10px",fontColor: "#fff"}}>Freight</p>
                        <p style={{marginTop: "10px",marginBottom:"-10px",fontColor: "white"}}>Forwarders</p>
                        <p style={{marginTop: "10px",marginBottom:"-10px"}}>Renewed</p>
                        <p style={{marginTop: "10px",marginBottom:"-10px"}}>Expiry</p>
                        <p style={{marginTop: "10px",marginBottom:"-10px"}}>Active</p>
                    </div>
                </div>

                

                <div>
                  {" "}
                  {Object.keys(countsData).map((month) => (
                    <div  className="slider-card" key={month} style={{ cursor: "pointer" }} onClick={() => handleMonth(slide)}>
                      <p className="slider-card-freight" style={{ marginTop: "0px", textAlign: "center" }}>{countsData[month].Freight}</p>
                      <p className="slider-card-forwarders" style={{ marginTop: "-15px", textAlign: "center",fontSize: "12px", }}>{countsData[month].forwarders}</p>
                      <p className="slider-card-renewed" style={{ marginTop: "15px", textAlign: "center" }}>{countsData[month].Re_new}</p>
                      <p className="slider-card-forcasted" style={{ marginTop: "15px",marginBottom:"10px", textAlign: "center" }}>{countsData[month].Expired}</p>
                      <p className="slider-card-active" style={{ marginTop: "25px", textAlign: "center" }}>{countsData[month].Active}</p>
                    </div>
                    ))}
                 </div>
               </div> 
            )}  
            {/* </div> */}

            <div inline style={{display:"flex",margin:"1px",marginRight:"30px",marginTop:"1px",marginBottom:"-15px"}}> 
              {/* Checkbox for all records */}

              <label style={{paddingLeft:"100px",paddingTop:"-10px",marginTop:"10px"}}>
                <input
                  type="checkbox"
                  name="allRecords"
                  checked={filterOptions.Input_array.allRecords === "1" ? 1 : 0}
                  onChange={handleCheckboxChange}
                />
                Show All
              </label>
              <br />

              {/* Checkbox for active records */}
              <label style={{paddingLeft:"70px",paddingTop:"-10px",marginTop:"10px"}}>
                <input
                  type="checkbox"
                  name="activeRecords"
                  checked={filterOptions.Input_array.activeRecords === "1"}
                  onChange={handleCheckboxChange}
                />
                Active
              </label>
              <br />

              {/* Checkbox for additional data */}
              <label style={{paddingLeft:"70px",paddingTop:"-10px",marginTop:"10px"}}>
                <input
                  type="checkbox"
                  name="additionData"
                  checked={filterOptions.Input_array.additionData === "1"}
                  onChange={handleCheckboxChange}
                />
                New/Renewed
              </label>
              <br />

              {/* Checkbox for expiry data */}
              <label style={{paddingLeft:"70px",paddingTop:"-10px",marginTop:"10px",marginRight:"180px"}}>
                <input
                  type="checkbox"
                  name="expiryData"
                  checked={filterOptions.Input_array.expiryData === "1"}
                  onChange={handleCheckboxChange}
                />
                Expiry
              </label>
              <br />

              {/* Display your filtered data */}
              {apiData.map((item) => (
                // Render your data items

                <div key={item.id}>{item.name}</div>
              ))}

<div style={{marginTop: "3px",paddingRight:"80px",marginBottom: "-10px",justifyContent: "Right"}}>

  <TablePagination 

    rowsPerPageOptions={[10, 25, 100]}

    component="div"

    count={apiData.length}

    rowsPerPage={rowsPerPage}

    page={page}

    onPageChange={handleChangePage}

    onRowsPerPageChange={handleChangeRowsPerPage}

    />
</div>
            </div>
     


            {/* < className="App" style={{
            display: "flex", alignItems: "center",
            flexDirection: "column"
        }}>
            {/* <CheckboxGroup inline name="checkboxGroup1" style={{display:"flex",margin:"1px",marginRight:"30px",marginTop:"1px",marginBottom:"-15px"}}>
                <Checkbox value={1}>Show All</Checkbox>
                <Checkbox value={2}>Active</Checkbox>
                <Checkbox  value={3}>Expiry</Checkbox>
                <Checkbox value={4}>New/Renew</Checkbox>
            </CheckboxGroup> */}
         
            
            {/* <h4 style={{margin:0, paddingTop:"15px", fontFamily:"sans-serif", fontWeight:"bold", paddingLeft:"40px"}}>Search Results for :{""}</h4> */}
          
        
            {/* <Box sx={{ display: 'flex', flexDirection: 'row', border: 0.6, borderColor: "text.secondary",paddingRight: "10px"}} /> */}
            <hr Color="text.secondary" width="100%" />


            <Paper sx={{ width: '98%',height:"56vh", marginLeft:"15px",marginRight:"-5px",marginTop:"-16px",paddingTop:"1px",paddingRight: "-1px",paddingLeft: "35px",borderRadius: "6px",display: 'flex' }}>
                <TableContainer style={{height:"55vh",display: 'flex'}}>
                <Paper sx={{width:"97.7%",borderRadius: "0px",marginTop:""}}>
                    <Table className={'classes.table'} stickyHeader size="small" aria-label="a dense table" style={{marginTop:""}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{ paddingRight: "0px", fontSize:"0.8rem",width:"90px",fontWeight:"bold", backgroundColor:"ButtonShadow"}}>Date Of Registration</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"10px", backgroundColor:"ButtonShadow"}}>Company Name</TableCell>
                                <TableCell align="center" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"2px", backgroundColor:"ButtonShadow"}}>Email ID</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Date of Approval</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px",width:"90px", backgroundColor:"ButtonShadow"}}>Prev Renew Date</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px",width:"90px", backgroundColor:"ButtonShadow"}}>Next Renew Date</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"2px", backgroundColor:"ButtonShadow"}}>Expired</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Payment/<br/>Renew Status</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px",width:"90px", backgroundColor:"ButtonShadow"}}>Payment Date</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Payment Mode</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>AWB <br/>Submitted Date</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>AWB Count</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Email Remainder</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow", width:"80px"}}>Action</TableCell>
            
                            </TableRow>
                    
                        </TableHead>  
                                              
                        <TableBody>
                            
                            {apiData
                            .map((data,index) => (
                                    <TableRow key={index} sx={{padding:0}}>
                                    <td align="left" style={{height:"50px",textAlign:"center"}} >{Moment(data.Date_Of_Registration).format('DD-MMM-YY')}</td>
                                    <td align="left" >{data.Company_Name}</td>
                                    <td align="left" style={{textAlign:"center"}}>{data.Register_Email}</td>
                                    <td align="left" style={{textAlign:"center"}}>{Moment(data.Approved_Date).format('DD-MMM-YY')}</td>
                                    <td align="left" style={{textAlign:"center"}}>{Moment(data.Prev_Renew_Date).format('DD-MMM-YY')}</td>
                                    <td align="left" style={{textAlign:"center"}}>{Moment(data.Next_Renewal).format('DD-MMM-YY')}</td>
                                    <td align="left" >{data.Expired}</td>
                                    <td align="left" >{data.Renew_status}</td>
                                    <td align="left" style={{textAlign:"center"}}>{Moment(data.Payment_Date).format('DD-MMM-YY')}</td>
                                    <td align="left" style={{textAlign:"center"}}>{data.Payment_Type}</td>
                                    <td align="left" >{data.AWB_Submitted_Date}</td>
                                    <td align="left" >{data.AWB_count}</td>
                                    <td align="left" >{data.Email_Remainder}</td>
                                    <td><span><DescriptionIcon onClick={(e)=>showDetail(data.Customer_Id)} style={{ paddingRight:"3px",color: "#0479C7"}} data-bs-toggle="modal" data-bs-target="#myModal"/></span>
                                        <span><EmailIcon onClick={(e)=>emailremainder(data.Customer_Id)} style={{paddingLeft:"5px",color:"#4F7942"}}/></span></td>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                    </Paper>
                </TableContainer>             
    </Paper>
    </Paper>
         
       
    <div class="modal" id="myModal">
               <div class="modal-dialog" style={{height:"90%",width:"900px", paddingTop:"100px"}}>
                  <div class="modal-content" style={{ background: "#F5F5F5"}}>
                     <div class="menu">
                      
                       <div class="modal-header" style={{height:"50px", background: "#0479C7",textAligin:"center"  }}>
                       <h5 class="modal-tittle" id="exampleModalLabel" style={{ fontFamily: "sans-serif", fontColor: "white",color: "#D5F2E3",}}>Invoice Details</h5>
                       </div>
                     </div>
                     <div class="modal-body">
                    
                     <table class="table table-striped table-sm">
                        <thead class="thead-light" style={{ paddingRight: "0px", fontSize:"0.8rem",width:"90px",fontWeight:"bold", backgroundColor:"ButtonShadow"}}>
                            <tr>
                                <th>Customer Id</th>
                                <th>Invoice Amount</th>
                                <th>Invoice Currency</th>
                                <th>Invoice Number</th>       
                            </tr>
                        </thead>
                        <tbody>
                        {rs.map((names,index)=>
                           <tr key={index} >
                              <td>{names.Customer_Id}</td>
                              <td>{names.Invoice_Amount}</td>
                              <td>{names.Invoice_Currency}</td>
                              <td>{names.Invoice_Number}</td>   
                           </tr>
                        )}
                        </tbody>
                    </table>
                    
                     </div>             
                     <div class="modal-footer" style={{ height:"50px"}} >
                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  style={{background: "#0479C7", height:"30px"}}>Close</button>
                     </div>  
                  </div>
               </div>
            </div>

        <div className="footer" style={{height:"20px"}}>
            <p style={{ marginLeft:"30px",fontFamily: "sans-serif", fontWeight: "bold", fontSize: "14px",height:"10px",display: 'flex'}}>
            © 2021 Mphasis
            </p>
        </div>
    </>
  );
};

export default Navbar;
