const router = require(`express`).Router()
var createError = require('http-errors')

const salesModel = require(`../models/tshirts`)

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const emptyFolder = require('empty-folder')

const checkThatShirtExistsInShirtsCollection = (req, res, next) =>
{
    shirtsModel.findOne({name:req.params.name}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }        

        req.data = data            
        return next()        
    })    
}

const checkThatFileIsUploaded = (req, res, next) =>
{
    if(!req.file)
    {
        return next(createError(400, `No file was selected to be uploaded`))
    }
    
    return next()
}

const checkThatFileIsAnImageFile = (req, res, next) =>
{
    if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (err) => {return next(err)})                
    }
    
    return next()
}

const checkThatShirtIsNotAlreadyInShirtsCollection = (req, res, next) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({name:req.params.name}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(data)
        {
            return next(createError(401))
        }
    })
    
    return next()
}

const addNewShirtToShirtsCollection = (req, res, next) =>
{
        if(err)
        {
            return next(err)
        }
        
        shirtsModel.create({name:req.params.name, colour:req.params.colour, size:req.params.size, price:req.params.price,shirtPhotoFilename:req.file.filename,sold:req.params.sold,quantity:req.params.quantity,description:req.params.description}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
                                       
            fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) => 
            {
                if(err)
                {
                    return next(err)
                }
                    
                return res.json({name: data.name, colour: data.colour, size: data.size, price: data.price,shirtPhotoFilename:fileData, sold: data.sold, quantity: data.quantity, description: data.desciption})
            })
        })   
}

const emptyShirtsCollection = (req, res, next) =>
{
    shirtsModel.deleteMany({}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(!data)
        {
            return next(createError(409,`Failed to empty shirts collection`))
        }
    })
    
    return next()
}

