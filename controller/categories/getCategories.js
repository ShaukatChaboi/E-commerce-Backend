// Import modules
const httpErrors = require('http-errors')
const { Categories } = require('../../models')

module.exports = async (req, res, next) => {
  const user = req.user

  try {
    // Check if the user is an admin
    if (user.role !== 'admin') return next(httpErrors(403, `Only Admin can access`))

    const docsPerPage = parseInt(req.query.docsPerPage) || 20 // Default 20 items per page
    const currentPage = parseInt(req.query.currentPage) || 1 // Default to the first page

    // Find all documents, applying pagination
    const totalIDocs = await Categories.countDocuments({
      createdBy: user._id
    })

    const totalPages = Math.ceil(totalIDocs / docsPerPage)

    const documents = await Categories.find({ createdBy: user._id })
      .skip((currentPage - 1) * docsPerPage)
      .limit(docsPerPage)

    res.status(200).json({ documents, currentPage, totalPages })
  } catch (err) {
    next(httpErrors(500, err.message))
  }
}
