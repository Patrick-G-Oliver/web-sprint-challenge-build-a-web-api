const express = require('express');
const projectModel = require('../data/helpers/projectModel')
const actionModel = require('../data/helpers/actionModel')
const { validateProjectID, validateProject } = require('../data/middleware/project')

const router = express.Router({
    mergeParams: true,
  });

// add a new project to the database
router.post('/projects', validateProject(), (req, res) => {
    projectModel.insert(req.body)
        .then((user) => {
            return res.status(201).json(user)
        })
        .catch((error) => {
            next(error)
        })
});

// retrieve all projects from the database
router.get('/projects', (req, res, next) => {
    projectModel.get()
    .then((projects) => {
        return res.status(200).json(projects)
    })
    .catch((error) => {
        next(error)
    })
})

// retrieve a specific user by id 
router.get('/projects/:id', validateProjectID(), (req, res) => {
    res.status(200).json(req.project)
});

// delete a specific user by id 
router.delete('/projects/:id', validateProjectID(), (req, res) => {
    projectModel.remove(req.params.id)
          .then((count) => {
              if (count > 0) {
                  res.status(200).json({
                      message: "The project has been removed.",
                  })
              } else {
                  res.status(404).json({
                      message: "The project could not be found.",
                  })
              }
          })
          .catch((error) => {
              next(error)
          })
  });

// edit a specific project by id 
router.put('/projects/:id', validateProject(), validateProjectID(), (req, res) => {
    projectModel.update(req.params.id, req.body)
          .then((user) => {
              if (user) {
                  res.status(200).json(req.body)
              } else {
                  res.status(404).json({
                      message: "The project could not be found.",
                  })
              }
          })
          .catch((error) => {
              next(error)
          })
  });

  // missing: getProjectActions (retrieve a list of actions for a project specified by id)
  // missing: post an action to a project with project id validation (action insert with validateProjectID)
  router.get()

module.exports = router;
