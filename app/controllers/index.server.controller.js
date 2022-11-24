const Survey = require("../models/survey.server.model");
const Answer = require("../models/answer.server.model");

// GET - get all the surveys
module.exports.apiGetSurveys = async function(req, res)
{
    try
    {
        let foundSurveys = await Survey.find({});
        if (foundSurveys)
        {
            console.log("DATA FOUND!!!");
            console.log(foundSurveys);
            res.json(foundSurveys)
        }
        else
        {
            console.log("DATA UNFOUNDED");
        }
    }
    catch(error)
    {
        res.json(error);
        next(error)
    }
};

// POST - Create a new survey
module.exports.apiPostSurvey = async function(req, res)
{
    let{topic, description, active, answered, questions} = req.body;
    // console.log(surveyId, topic, description, active, answered, questions);
    try
    {
        let newSurvey = new Survey(
            {
                topic, description, active, answered, questions
            }
        );
        let data = await Survey.findOne({topic});
        if(data !== null)
        {
            console.log("ERROR - SURVEY TOPIC ID IS DUPLICATED");
            return res.status(500).send("ERROR - SURVEY TOPIC ID IS DUPLICATED");
        }
        else
        {
            newSurvey.save();
            console.log(`SUCCESSFUL CREATING SURVEY, NAME:${topic}`);
            res.send(
                {
                    msg: `SUCCESSFUL CREATING SURVEY, NAME:${topic}`,
                    saveObject: newSurvey
                }
            );
        }
    }
    catch(error)
    {
        console.log("BACKEND CREATING SURVEY ERROR");
        console.log(error);
        return res.status(500).send(error);

    }   
};

// DELETE - delete a survey
module.exports.apiDeleteSurvey = async function(req, res)
{
    let {_id} = req.params;
    try
    {
        let deletedSurvey = await Survey.findOneAndDelete({_id});
        if(deletedSurvey)
        {
            console.log("SUCCESSFUL DELETING SURVEY")
            return res.send(
                {
                    msg: `SUCCESSFUL DELETING SURVEY, ID:${_id}`,
                    deletedObject: deletedSurvey
                }
            )
            
        }
        else
        {
            console.log(`ERROR DELETING SURVEY, ID: ${_id}`);
            return res.status(500).send("ERROR - BACKEND DELETE SURVEY ERROR");
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send(error);
    }
    
};

// PUT - edit certain survey
module.exports.apiPutSurvey = async (req, res) =>
{     
    let {_id} = req.params;
    let{ topic, description, active, answered, questions} = req.body;
    // console.log(topic, description, active, answered, questions);
    try
    {
        let checkData = await Survey.findOne({_id});
        if(checkData.answered)
        {
            console.log("ERROR - THE SURVEY HAS ANSWERED");
            return res.status(500).send("ERROR - THE SURVEY HAS ANSWERED");
        }
        else
        {
            let updatedData = await Survey.findOneAndUpdate(
                {_id},
                { topic, description, active, answered, questions},
                {
                    new: true,
                    runValidators: true,
                    overwrite: true
                }
            );
            return res.send(
                {
                    msg: `SUCCESSFUL EDITING SURVEY, ID:${_id}`,
                    updatedObj: updatedData
                }
            );            
        }    
    }
    catch(error)
    {
        console.log(`ERROR UPDATING SURVEY, ID:${_id} `);
        console.log(error);
        return res.status(500).send(error);
    }
    
}

// GET - get all the answers by survey id
module.exports.apiGetAnswerBySurveyId = async function(req, res)
{
    let {surveyId} = req.params; 
    try
    {
        let foundAnswers = await Answer.find({surveyId});
        if (foundAnswers)
        {
            console.log("DATA FOUND!");
            console.log(foundAnswers);
            res.json(foundAnswers);
        }
    }
    catch(error)
    {
        res.json(error);
        next(error)
    }
}

// GET - get all the answers by user id
module.exports.apiGetAnswerByUserId = async function(req, res)
{
    let {userId} = req.params; 
    try
    {
        let foundAnswers = await Answer.find({userId});
        if (foundAnswers)
        {
            console.log("DATA FOUND!");
            console.log(foundAnswers);
            res.json(foundAnswers);
        }
    }
    catch(error)
    {
        res.json(error);
        next(error)
    }
}

// POST - submit the answers
module.exports.apiPostAnswer = async (req, res) =>
{
    let { surveyId, userId, answers} = req.body;
    try
    {
        // check did he/she submit before
        let foundAnswers = await Answer.find({surveyId});
        if (foundAnswers)
        {
            foundAnswers.forEach((answer) =>
            {
                if(answer.userId === userId)
                {
                    console.log("ERROR - ONLY ABLE TO SUBMIT ONE TIME");
                    return res.status(400).send("ERROR - ONLY ABLE TO SUBMIT ONE TIME");
                }
            })
        }
        newAnswer = new Answer(
            {
                surveyId, userId, answers
            }
        );
        newAnswer.save();
        console.log(`SUCCESSFUL CREATING ANSWER`);
        res.send(
            {
                msg: `SUCCESSFUL CREATING ANSWER`,
                saveObject: newAnswer
            }
        );
    }
    catch(error)
    {
        res.json(error);
        next(error);
    }
    
}