import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",    
            isRegistered:false
        } 
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully registered
                { 
                    console.log("User registered and logged in")
                    
                    sessionStorage.name = res.data.name
                    sessionStorage.accessLevel = res.data.accessLevel
                    
                    this.setState({isRegistered:true})
                }        
            }
            else
            {
                console.log("Registration failed")
            }
        })   
    }
    
    render() 
    {     
        return (
            <div className="outside-form-container">
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm" onSubmit={this.handleSubmit}>
           
                {this.state.isRegistered ? <Redirect to="/DisplayAllCars"/> : null} 
            
                <div className="loginHeaderContainer">
                <Link className="anotherLoginHeader" to={"/Login"}>Login</Link>  
                <p className="loginHeaderLink">|</p>
                <h2>Sign Up</h2>
                </div>
           
                <input  
                    name = "name"              
                    type = "text"
                    placeholder = "Name"
                    autoComplete="name"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                    ref = {(input) => { this.inputToFocus = input }} 
                /><br/>           

	        <input  
                    name = "email"              
                    type = "email"
                    placeholder = "Email"
                    autoComplete="email"
                    value = {this.state.email}
                    onChange = {this.handleChange}
                /><br/>              

	        <input  
                    name = "password"           
                    type = "password"
                    placeholder = "Password"
                    autoComplete="password"
                    title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                /><br/>           

                <input          
                    name = "confirmPassword"    
                    type = "password"
                    placeholder = "Confirm password"
                    autoComplete="confirmPassword"
                    value = {this.state.confirmPassword}
                    onChange = {this.handleChange}
                /><br/><br/>
                
                <span>
                <LinkInClass value="Register New User" className="green-button" onClick={this.handleSubmit} />
                <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link> 
                </span>  
            </form>
            </div>
        )
    }
}