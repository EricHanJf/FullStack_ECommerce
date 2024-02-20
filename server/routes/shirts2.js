const router = require(`express`).Router()
var createError = require('http-errors')

const shirtsModel = require(`../models/shirts`)

const fs = require('fs')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const createNewShirtDocument = (req, res, next) => 
{           
    // Use the new car details to create a new car document                
    let shirtDetails = new Object()
                
    shirtDetails.name = req.body.name
    shirtDetails.colour = req.body.colour
    shirtDetails.size = req.body.size
    shirtDetails.price = req.body.price
    shirtDetails.shirtPhotoFilename = req.body.shirtPhotoFilename
    shirtDetails.sold = req.body.sold
    shirtDetails.quantity = req.body.quantity
    shirtDetails.description = req.body.description

    // add the shirt's photos to the shirtDetails JSON object
    shirtDetails.photos = []
                
    req.files.map((file, index) =>
    {
        shirtDetails.photos[index] = {filename:`${file.filename}`}
    })
        
    shirtsModel.create(shirtDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAllShirtDocuments = (req, res, next) => 
{   
    
    //user does not have to be logged in to see car details WHAT 
    shirtsModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        return res.json(data)
    })
}


const getShirtPhotoAsBase64 = (req, res, next) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


const getShirtDocument = (req, res, next) => 
{
    shirtsModel.findById(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}


const updateShirtDocument = (req, res, next) => 
{
    shirtsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteShirtDocument = (req, res, next) => 
{
    shirtsModel.findByIdAndRemove(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}


// read all records
router.get(`/shirts`, getAllShirtDocuments)

// get one car photo
router.get(`/shirts/photo/:filename`, getShirtPhotoAsBase64)

// Read one record
router.get(`/shirts/:id`, verifyUsersJWTPassword, getShirtDocument)

// Add new record
router.post(`/shirts`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("shirtPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewShirtDocument)

// Update one record
router.put(`/shirts/:id`, verifyUsersJWTPassword, updateShirtDocument)

// Delete one record
router.delete(`/shirts/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteShirtDocument)


module.exports = router