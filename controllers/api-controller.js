const { selectAPI } = require("../models/api-model.js");

const getAPI = (request, response)=>{

    console.log("Inside api controller")
    selectAPI().then((api)=>{
        response.status(200).send({api})
    })
}

module.exports = {getAPI}