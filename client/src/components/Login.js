import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            email:"",
            password:"",
            isLoggedIn:false
        }
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            // default if not logged in
            sessionStorage.name = "GUEST"
            sessionStorage.accessLevel = ACCESS_LEVEL_GUEST 
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    
                    sessionStorage.name = res.data.name
                    sessionStorage.accessLevel = res.data.accessLevel
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })                
    }

    render() {
        return (
            <div className="outside-form-container">
                <form className="form-container" noValidate={true} id="loginOrRegistrationForm">
                    <div className="loginHeaderContainer">
                        <h2>Login</h2>
                        <p className="loginHeaderLink">|</p>
                        <Link className="anotherLoginHeader" to={"/Register"}>Sign Up</Link>
                    </div>
                    {this.state.isLoggedIn ? <Redirect to="/DisplayAllCars" /> : null}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    /><br />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br /><br />
                    <span>
                        <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit} />
                        <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                    </span>
                </form>
            </div>
        )
    }
}