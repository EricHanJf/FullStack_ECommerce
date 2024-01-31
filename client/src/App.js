import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./scss/style.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import Main from "./components/Main"
import About from "./components/About"
import Contact from "./components/Contact"
import Search from "./components/Search"
import Cart from "./components/Cart"
import Logout from "./components/Logout"


import LoggedInRoute from "./components/LoggedInRoute"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof sessionStorage.accessLevel === "undefined")
{
    sessionStorage.name = "GUEST"
    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
}
    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    {/* <Route exact path="/" component={DisplayAllCars} /> */}
                    <Route exact path="/Login" component={Login} />                 
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    {/* <Route path="*" component={DisplayAllCars}/>                             */}
                    <Route exact path="/Main" component={Main} /> 
                    {/* <Route exact path="/About" component={About} /> 
                    <Route exact path="/Contact" component={Contact} /> 
                    <Route exact path="/Search" component={Search} /> 
                    <Route exact path="/Cart" component={Cart} />  */}
                    <Route exact path="/" component={Main} />
                    <Route path="*" component={Main}/>  
                    
                    
                </Switch>
            </BrowserRouter>
        )
    }
}