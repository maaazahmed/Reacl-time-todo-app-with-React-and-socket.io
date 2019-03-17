const mongoose = require("mongoose")


const TodoSchema = mongoose.Schema({
    todo: { type: String, require: true }
})
module.exports = mongoose.model("Todo", TodoSchema)