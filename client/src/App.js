import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./scss/App.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import AddCar from "./components/AddCar"
import AddShirt from "./components/AddShirt"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"
import BuyCar from "./components/BuyCar"
import PayPalMessage from "./components/PayPalMessage"
import NavigationBar from "./components/NavigationBar"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"

if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/Register" component={Register} />
                        <Route exact path="/ResetDatabase" component={ResetDatabase} />
                        <Route exact path="/" component={DisplayAllCars} />
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/BuyCar/:id" component={BuyCar} />
                        <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>      
                        <Route exact path="/NavigationBar" component={NavigationBar}/>               
                        <LoggedInRoute exact path="/Logout" component={Logout} />
                        <Route exact path="/AddCar" component={AddCar} />
                        <Route exact path="/AddShirt" component={AddShirt} />
                        <Route exact path="/EditCar/:id" component={EditCar} />
                        <Route exact path="/DeleteCar/:id" component={DeleteCar} />
                        <Route exact path="/DisplayAllCars" component={DisplayAllCars} />
                        <Route path="*" component={DisplayAllCars} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}