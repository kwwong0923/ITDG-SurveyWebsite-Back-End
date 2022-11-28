const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index.server.controller");

router.get("/api/get-surveys", indexController.apiGetSurveys);

router.post("/api/post-survey", indexController.apiPostSurvey );

router.delete("/api/delete-survey/:surveyId", indexController.apiDeleteSurvey);

router.put("/api/edit-survey/:surveyId", indexController.apiPutSurvey);

router.get("/api/get-answers-surveyid/:surveyId", indexController.apiGetAnswerBySurveyId);

router.get("/api/get-answers-userid/:userId", indexController.apiGetAnswerByUserId);

router.post("/api/post-answer", indexController.apiPostAnswer);

module.exports = router;