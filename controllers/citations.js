'use strict'

var Citation = require('../models/citations');

function createCitation(req, resp) {
    var citationRequestBody = req.body;
    var newCitation = new Citation();

    newCitation.userId = citationRequestBody.userId;
    newCitation.barberId = citationRequestBody.barberId;
    newCitation.status = citationRequestBody.status;
    newCitation.date = citationRequestBody.date;

    if (
        newCitation.userId === null || newCitation.barberId === null
        || newCitation.status === null || newCitation.date === null
    ) {
            resp.status(400).send({'message': 'One or more required variables were not sent'});
    }

    if (newCitation.status == false){
        resp.status(400).send({'message':'Barber is ocuppied with a client'});
    }

    newCitation.save().then(
        (savedCitation) => {
            resp.status(200).send({'message': 'Citation was created succesfully', 'citation': savedCitation});
        },
        err => {
            resp.status(500).send({'message': 'An error ocurred while creating the citation', 'error': err});
        }
    );
}

function editCitation(req,resp){
    var idCitation = req.params._id;
    var newCitationData = req.body;

    var citation = new Citation();

    citation._id = idCitation;
    citation.userId = newCitationData.userId;
    citation.barberId = newCitationData.barberId;
    citation.status = newCitationData.status;
    citation.date = newCitationData.date;

    Citation.findByIdAndUpdate(citation._id, citation, {new:true}).then(
        (updatedCitation)=>{
            resp.status(200).send({'message': 'Citation updated', 'citation': updatedCitation});
        },
        (err)=>{
            resp.status(500).send({'message': 'An error ocurred while editing the citation', 'error': err});
        }
    );
}

function findCitationById(req, resp) {
    var citationToFind = req.params._id;

    Citation.findById(citationToFind).then(
        (foundCitation) => {
            resp.status(200).send({'citation': foundCitation});
        },
        (err) => {
            resp.status(500).send({'message': 'An error ocurred while searching the citation', 'error': err});
        }
    );
}

function deleteCitation(req, resp) {
    var citationToDelete = req.params._id;

    Citation.findByIdAndDelete(citationToDelete).then(
        (deletedCitation) => {
            resp.status(200).send({'message': 'Citation was deleted succesfully', 'citation': deletedCitation});
        },
        err => {
            resp.status(500).send({'message': 'An error ocurred while deleting the citation', 'error': err});
        }
    );
}

module.exports = {
    createCitation, deleteCitation, editCitation, findCitationById
}