import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CakeMasters from './pages/CakeMasters';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Shop from './pages/Shop';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import CakePricing from './pages/CakePricing';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Revenue from './pages/Revenue';
import NoAuthorization from './pages/NoAuthorization';
import Footer from './components/Footer';
import { Box, makeStyles } from '@material-ui/core';
import API from './utils/API';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginBottom: 50,
    },
}));

function App() {
    const classes = useStyles();
    const [profileState, setProfileState] = useState({
        name: "",
        email: "",
        token: "",
        id: "",
        phone: "",
        address: "",
        isOwner: false,
        isLoggedIn: false,
        loginError: "",
        signUpError: ""
    });

    const [buyerProfileState, setBuyerProfileState] = useState({
        message: "please log in"
    });

    const [bakerProfileState, setBakerProfileState] = useState({
        message: "please log in"
    });

    const [cakeState, setCakeState] = useState({
        allCakes: [],
        filteredCakes: []
    });

    const [customState, setCustomState] = useState({
        allCustom: [],
        filteredCustom: []
    });

    const [bakerState, setBakerState] = useState({
        allBakers: [],
        filteredBakers: []
    });

    useEffect(function () {
        fetchUserData();
        fetchCakes();
        fetchCustom();
        fetchBakers();
    }, []);

    function fillProfile() {
        const token = localStorage.getItem("token");
        API.getBuyer(token).then(function (buyerData) {
            if (buyerData) {
                setBuyerProfileState({ orders: buyerData.Orders });
                API.getBaker(token).then(function (bakerData) {
                    if (bakerData) {
                        setBakerProfileState({ orders: bakerData.Orders, inventory: bakerData.Inventories, invChanges: bakerData.InvChanges, preMade: bakerData.PreMades, pricing: bakerData.Pricings, revenue: bakerData.Revenues });
                    }
                    else {
                        setBakerProfileState({
                            message: "please log in"
                        });
                    }
                });
            }
            else {
                localStorage.removeItem("token");
                setProfileState({
                    name: "",
                    email: "",
                    token: "",
                    id: "",
                    isOwner: false,
                    isLoggedIn: false,
                    loginError: "",
                    signUpError: ""
                });
                setBuyerProfileState({
                    message: "please log in"
                });
                setBakerProfileState({
                    message: "please log in"
                });
            }
        });
    }

    function fetchBakers() {
        API.getAllUsers().then(data => {
            if (data) {
                let newArray = [];
                let newArray2 = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].isOwner) {
                        newArray.push({ id: data[i].id, username: data[i].username, address: data[i].address, phone: data[i].phone, email: data[i].email });
                        newArray2.push({ id: data[i].id, username: data[i].username, address: data[i].address, phone: data[i].phone, email: data[i].email });
                    }
                }
                setBakerState({
                    allBakers: newArray,
                    filteredBakers: newArray2
                });
            } else {
                console.log("nothing to see here");
            }
        });
    }

    function fetchCakes() {
        API.getAllPreMade().then(data => {
            if (data) {
                let newArray = [];
                let newArray2 = [];
                for (let i = 0; i < data.length; i++) {
                    newArray.push(data[i]);
                    newArray2.push(data[i]);
                }
                setCakeState({
                    allCakes: newArray,
                    filteredCakes: newArray2
                });
            } else {
                console.log("nothing to see here");
            }
        });
    }

    function fetchCustom() {
        API.getAllPricing().then(data => {
            if (data) {
                let newArray3 = [];
                let newArray4 = [];
                for (let i = 0; i < data.length; i++) {
                    newArray3.push(data[i]);
                    newArray4.push(data[i]);
                }
                setCustomState({
                    allCustom: newArray3,
                    filteredCustom: newArray4
                });
            } else {
                console.log("nothing to see here");
            }
        });
    }

    function fetchUserData() {
        const token = localStorage.getItem("token");
        API.getProfile(token).then(function (profileData) {
            if (profileData) {
                setProfileState({
                    name: profileData.username,
                    email: profileData.email,
                    phone: profileData.phone,
                    token: token,
                    address: profileData.address,
                    id: profileData.id,
                    isOwner: profileData.isOwner,
                    isLoggedIn: true,
                    loginError: "",
                    signUpError: ""
                });
                fillProfile();
            }
            else {
                localStorage.removeItem("token");
                setProfileState({
                    name: "",
                    email: "",
                    token: "",
                    id: "",
                    address: "",
                    phone: "",
                    isOwner: false,
                    isLoggedIn: false,
                    loginError: "",
                    signUpError: ""
                });
                setBuyerProfileState({
                    message: "please log in"
                });
                setBakerProfileState({
                    message: "please log in"
                });
            }
        });
    }

    function deleteOne(type, id) {
        const token = localStorage.getItem("token");
        if (type === "premade") {
            API.deletePreMade(token, id).then(function (res) {
                if (res) {
                    fetchCakes();
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "custom") {
            API.deletePricing(token, id).then(function(res) {
                if(res){
                    fetchCustom();
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "order") {
            API.deleteOrder(token, id).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "inventory") {
            API.deleteInventory(token, id).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "invChange") {
            API.deleteInvChanges(token, id).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "revenue") {
            API.deleteRevenue(token, id).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else {
            console.log("not sure what you're doing");
        }
    }

    function addOne(type, data) {
        const token = localStorage.getItem("token");
        if (type === "premade") {
            API.createPreMade(token, data).then(function (res) {
                if (res) {
                    fetchCakes();
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "custom") {
            API.createPricing(token, data).then(function(res) {
                if (res) {
                    fetchCustom();
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "order") {
            API.createOrder(token, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "inventory") {
            API.createInventory(token, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "invChange") {
            API.createInvChanges(token, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "revenue") {
            API.createRevenue(token, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else {
            console.log("not sure what you're doing");
        }
    }

    function editOne(type, id, data) {
        const token = localStorage.getItem("token");
        if (type === "premade") {
            API.editPreMade(token, id, data).then(function (res) {
                if (res) {
                    fetchCakes();
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "custom") {
            API.editPricing(token, id, data).then(function(res) {
                if (res) {
                    fetchCustom();
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "order") {
            API.editOrder(token, id, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "inventory") {
            API.editInventory(token, id, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "invChange") {
            API.editInvChanges(token, id, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else if (type === "revenue") {
            API.editRevenue(token, id, data).then(function (res) {
                if (res) {
                    fillProfile();
                }
                else {
                    console.log("something went wrong");
                }
            });
        }
        else {
            console.log("not sure what you're doing");
        }
    }

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <NavBar profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                <Switch>
                    <Route exact path="/">
                        <Home profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/cakemasters">
                        <CakeMasters cakes={cakeState} setCakeState={setCakeState} bakers={bakerState} setBakerState={setBakerState} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup profile={profileState} setProfileState={setProfileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/login">
                        <Login profile={profileState} setProfileState={setProfileState} fillProfile={fillProfile} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/logout">
                        <Logout profile={profileState} setProfileState={setProfileState} setBuyerProfileState={setBuyerProfileState} setBakerProfileState={setBakerProfileState} />
                    </Route>
                    <Route exact path="/shop">
                        <Shop custom={customState} setCustomState={setCustomState} cakes={cakeState} setCakeState={setCakeState} bakers={bakerState} setBakerState={setBakerState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/profile">
                        <UserProfile buyer={buyerProfileState} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard baker={bakerProfileState} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/premade">
                        <CakePricing baker={bakerProfileState} editOne={editOne} addOne={addOne} deleteOne={deleteOne} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} isPreMade={true} />
                    </Route>
                    <Route exact path="/custom">
                        <CakePricing baker={bakerProfileState} editOne={editOne} addOne={addOne} deleteOne={deleteOne} profile={profileState} isPreMade={false} />
                    </Route>
                    <Route exact path="/orders">
                        <Orders baker={bakerProfileState} editOne={editOne} addOne={addOne} deleteOne={deleteOne} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/inventory">
                        <Inventory baker={bakerProfileState} editOne={editOne} addOne={addOne} deleteOne={deleteOne} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/revenue">
                        <Revenue baker={bakerProfileState} editOne={editOne} addOne={addOne} deleteOne={deleteOne} profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/noauth">
                        <NoAuthorization mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    {/* <Route>
                        <Home />
                    </Route> */}
                </Switch>

            </div>
            <Box >
                <Footer />
            </Box>

        </BrowserRouter>
    );
}

export default App;
