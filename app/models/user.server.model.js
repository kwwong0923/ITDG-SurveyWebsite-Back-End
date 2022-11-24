const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        displayName:
        {
            type: String,
            required: true,
        },
        email: 
        {
            type: String,  
            required: true          
        },
        password: 
        {
            type: String,
            minLength: 8,
            maxLength: 1024
        }
    },
    {
        collection: "user"
    }
);

module.exports = mongoose.model("User", userSchema);