import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class AddShirt extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            colour:"",
            size:"",
            price:"",
            shirtPhotoFilename:"",
            sold:"",
            quantity:"",
            description:"",
            redirectToDisplayAllCars:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }

    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()                  
        formData.append("name", this.state.name)
        formData.append("colour", this.state.colour)
        formData.append("size", this.state.size)
        formData.append("price", this.state.price)
        formData.append("shirtPhotoFilename", this.state.shirtPhotoFilename)
        formData.append("sold", this.state.sold)
        formData.append("quantity", this.state.quantity)
        formData.append("description", this.state.description)
        
        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("carPhotos", this.state.selectedFiles[i])
            }
        }

        axios.post(`${SERVER_HOST}/cars`, formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        .then(res => 
        {           
            this.setState({redirectToDisplayAllCars:true})
        })
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
    }


    render()
    {   
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        }        
        return (
            <div className="form-container"> 
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}                                            
                    
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group> 

                    <Form.Group controlId="shirtPhotoFilename">
                        <Form.Label>Shirt Photo</Form.Label>
                        <Form.Control type="text" name="shirtPhotoFilename" value={this.state.shirtPhotoFilename} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="sold">
                        <Form.Label>Sold</Form.Label>
                        <Form.Control type="text" name="sold" value={this.state.sold} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}