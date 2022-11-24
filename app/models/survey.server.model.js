const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema
(
    {
        surveyId: 
        {
            type: String,
            default: "",
            trim: true,
        },
        topic: 
        {
            type: String,
        },
        description:
        {
            type: String,
        },
        active: {
            type: Boolean,
            default: true

        },
        answered: {            
            type: Boolean,
            default: false
        },
        questions: []
    },
    {
        collection: "survey"
    }
);

module.exports = mongoose.model("Survey", SurveySchema);