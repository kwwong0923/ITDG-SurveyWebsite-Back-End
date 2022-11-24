const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index.server.controller");

router.get("/api/get-surveys", indexController.apiGetSurveys);

router.post("/api/post-survey", indexController.apiPostSurvey );

router.delete("/api/delete-survey/:_id", indexController.apiDeleteSurvey);

router.put("/api/edit-survey/:_id", indexController.apiPutSurvey);

router.get("/api/get-answers-surveyid/:surveyId", indexController.apiGetAnswerBySurveyId);

router.get("/api/get-answers-userid/:userId", indexController.apiGetAnswerByUserId);

router.post("/api/post-answer", indexController.apiPostAnswer);

module.exports = router;