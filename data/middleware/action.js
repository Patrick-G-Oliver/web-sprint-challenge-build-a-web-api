const actionModel = require('../helpers/actionModel')

function validateActionID() {
    return (req, res, next) => {
      // match the id in the request to an id in the database
      // using the getById function from the postDb.js file
      actionModel.get(req.params.id)
        .then((action) => {
          // If the id doesn't match up, return a 400, etc. 
          if (!action) {
            return res.status(400).json({
              message: "invalid action id",
            })
          // // Otherwise, attach 'post' to the request.
          } else {
            req.action = action
            next()
          }
        })
    }
}

function validateAction() {
	return (req, res, next) => {
			// Check if the request body itself is absent.
			if (Object.keys(req.body).length === 0) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing action data",
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
        } 

			next()
	}
}

/*
function validateAction() {
	return (req, res, next) => {
		// Check if the request body itself is absent.
		    if (Object.keys(req.body).length === 0) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing action data",
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
            // Check if the request completed property is absent.
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

module.exports = { validateActionID, validateAction }