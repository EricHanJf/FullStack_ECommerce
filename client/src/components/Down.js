import React, { Component } from "react"

import { Link } from "react-router-dom"

export default class Down extends Component {
    // constructor(props) 
    // {
    //     super(props)

    //     this.state = {
    //         redirectToDisplayAllCars:false
    //     }
    // }

    render() {
        console.log("down")
        return (
            <footer id="footer-container">
                <span id="block">
                    <div>
                        <Link to={"/DisplayAllCars"}>Shop</Link><br/>
                        <Link to={"/DisplayAllCars"}>Men</Link><br/>
                        <Link to={"/DisplayAllCars"}>Women</Link><br/>
                        <Link to={"/DisplayAllCars"}>Kid</Link>
                    </div>

                    <div>
                        <Link to={"/DisplayAllCars"}>About US</Link><br/>
                        <Link to={"/DisplayAllCars"}>Our Story</Link><br/>
                        <Link to={"/DisplayAllCars"}>Quality Matters</Link><br/>
                        <Link to={"/DisplayAllCars"}>Style for Every Occasion</Link>
                    </div>
                    <div>
                        <Link to={"/DisplayAllCars"}>Contact US</Link><br/>
                        <a href="https://www.facebook.com" target="_blank">Facebook</a><br/>
                        <a href="https://www.instagram.com" target="_blank">Instagram</a>
                    </div>
                    
                </span>
                <span id="copyright">Copyright © 2024 T-Shirts Store | Powered By Kim Fui Leung, Yee Chean Chang and Jianfeng Han</span>
            </footer>
        )
    }
}
