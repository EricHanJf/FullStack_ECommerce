import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

// import CarTable from "./CarTable"

import {SERVER_HOST} from "../config/global_constants"


export default class Main extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            t_shirts:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/t_shirts`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")   
                    this.setState({t_shirts: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

  // <div className="form-container">
//   <div className="table-container">
//   <CarTable cars={this.state.cars} /> 
      
  
//       <div className="add-new-car">
//           <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
//       </div>
  
// </div>
   // </div> 
    render() 
    {   
        return (           
            
        
                    <header>
                    <div>
                        <Link className="green-button" to={"/Main"}>Main</Link>
                        <Link className="blue-button" to={"/About"}>About</Link>  
                        <Link className="red-button" to={"/Contact"}>Contact</Link>  
                        </div>
                        <div>
                        <img src="../images/web_logo.png"/>
                        </div>
                        <div>
                        <Link className="green-button" to={"/Search"}></Link>
                        <Link className="blue-button" to={"/Cart"}>Cart</Link>  
                        <Link className="red-button" to={"/Login"}>Login</Link>  
                        </div>
               </header>
                

               
        )
    }
}