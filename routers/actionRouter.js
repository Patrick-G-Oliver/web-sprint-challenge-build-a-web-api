const express = require('express');
const actionModel = require('../data/helpers/actionModel')
const { validateActionID } = require('../data/middleware/action')

const router = express.Router({
    mergeParams: true,
});

// retrieve all actions from the database
router.get('/actions', (req, res) => {
    actionModel.get()
        .then((posts) => {
        return res.status(200).json(posts)
        })
        .catch((error) => {
            next(error)
        })
});

// retrieve a specific action from the database by its id
router.get('/actions/:id', validateActionID(), (req, res) => {
    res.status(200).json(req.action)
});

// delete a specfic action by its id
router.delete('/actions/:id', validateActionID(), (req, res) => {
    actionModel.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The action has been removed.",
                })
            } else {
                res.status(404).json({
                    message: "The action could not be found.",
                })
            }
        })
        .catch((error) => {
            next(error)
        })
});

// edit a specifc action by its id
router.put('/actions/:id', validateActionID(), (req, res) => {
    actionModel.update(req.params.id, req.body)
          .then((action) => {
              if (action) {
                  res.status(200).json(req.body)
              } else {
                  res.status(404).json({
                      message: "The action could not be found.",
                  })
              }
          })
          .catch((error) => {
              next(error)
          })
  });
  

module.exports = router;
