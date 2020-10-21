const projectModel = require('../helpers/projectModel')

function validateProjectID() {
    return (req, res, next) => {
      // match the id in the request to an id in the database
      // using the getById function from the postDb.js file
      projectModel.get(req.params.id)
        .then((project) => {
          // If the id doesn't match up, return a 400, etc. 
          if (!project) {
            return res.status(400).json({
              message: "invalid project id",
            })
          // // Otherwise, attach 'post' to the request.
          } else {
            req.project = project
            next()
          }
        })
    }
}

function validateProject() {
	return (req, res, next) => {
		// Check if the request body itself is absent.
		    if (Object.keys(req.body).length === 0) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing project data",
				})
			// Check if the request name property is absent.
			} else if (!req.body.name) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required name field"
                })
            // Check if the request description property is absent.
			} else if (!req.body.description) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required description field"
                })
      }

			next()
	}
}

/*
function validateProject() {
	return (req, res, next) => {
			// Check if the request body itself is absent.
			if (Object.keys(req.body).length === 0) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing project data",
				})
			// Check if the request project_id property is absent.
			} else if (!req.body.project_id) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required project_id field"
                })
            // Check if the request description property is absent.
			} else if (!req.body.description) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required description field"
                })
            // Check if the request notes property is absent.
            } else if (!req.body.notes) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required notes field"
                })
        } else if (!req.body.completed) {
          // If so, return a 400, etc.
          return res.status(400).json({
            message: "missing required completed field"
          })
        }

			next()
	}
}
*/

module.exports = { validateProjectID, validateProject };