const router = require(`express`).Router()

const carsModel = require(`../models/shirts`)


// read all records
router.get(`/shirts`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    shirtsModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/shirts/:id`, (req, res) => 
{
    shirtsModel.findById(req.params.id, (error, data) => 
    {
        res.json(data)
    })
})


// Add new record
router.post(`/shirts`, (req, res) => 
{
    shirtsModel.create(req.body, (error, data) => 
    {
        res.json(data)
    })
})


// Update one record
router.put(`/shirts/:id`, (req, res) => 
{
    shirtsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/shirts/:id`, (req, res) => 
{
    shirtsModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data)
    })       
})

module.exports = router