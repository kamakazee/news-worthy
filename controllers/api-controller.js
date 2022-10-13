const { selectAPI } = require("../models/api-model.js");

const getAPI = (request, response)=>{

    selectAPI().then((api)=>{
        response.status(200).send({api})
    })
}

module.exports = {getAPI}