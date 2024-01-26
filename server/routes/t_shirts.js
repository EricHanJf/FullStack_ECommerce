const router = require(`express`).Router()

const t_shirtsModel = require(`../models/t_shirts`)


// read all records
router.get(`/t_shirts`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    t_shirtsModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/t_shirts/:id`, (req, res) => 
{
    t_shirtsModel.findById(req.params.id, (error, data) => 
    {
        res.json(data)
    })
})


// Add new record
router.post(`/t_shirts`, (req, res) => 
{
    t_shirtsModel.create(req.body, (error, data) => 
    {
        res.json(data)
    })
})


// Update one record
router.put(`/t_shirts/:id`, (req, res) => 
{
    t_shirtsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/t_shirts/:id`, (req, res) => 
{
    t_shirtsModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data)
    })       
})

module.exports = router