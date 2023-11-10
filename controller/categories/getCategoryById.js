// ** Import modules
const httpErrors = require('http-errors')
const { Categories } = require('../../models')

/**
 * @dev only documents created by user or user with admin role can be accessed
 */
module.exports = async (req, res, next) => {
  const user = req.user
  const { categoryId } = req.params
  try {
    if (user.role !== 'admin') return next(httpErrors(403, `Only Admin can access`))
    if (!categoryId) return next(httpErrors(400, 'category Id not defined'))

    const document = await Categories.findOne({ _id: categoryId, createdBy: user._id })

    res.status(200).json(document)
  } catch (err) {
    next(httpErrors(500, err.message))
  }
}
