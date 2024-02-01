import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
// import Footer from "./components/Footer.js"

import LinkInClass from "../components/LinkInClass"


export default class Footer extends Component 
{
    // constructor(props) 
    // {
    //     super(props)

    //     this.state = {
    //         redirectToDisplayAllCars:false
    //     }
    // }
    
    render() 
    {
        return (
            <footer id="footer-container">
                <h1>FOOTER TESTING</h1>
                <p>HELLLO</p>
            </footer>
        )
    }
}