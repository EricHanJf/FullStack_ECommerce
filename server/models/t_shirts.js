const mongoose = require(`mongoose`)

let t_shirtsSchema = new mongoose.Schema(
   {
        name: {type: String},
        size: {type: String},
        price: {type: Number}
   },
   {
       collection: `t_shirts`
   })

module.exports = mongoose.model(`t_shirts`, t_shirtsSchema)