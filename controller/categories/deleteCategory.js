// ** Import modules
const httpErrors = require('http-errors')
const { Categories } = require('../../models')

module.exports = async (req, res, next) => {
  //from auth
  const user = req.user
  const { categoryId } = req.params

  try {
    if (user.role !== 'admin') return next(httpErrors(403, `Only Admin can access`))
    if (!categoryId) return next(httpErrors(400, 'category Id not defined'))

    // ** find document and delete it
    const results = await Categories.findOneAndDelete({ _id: categoryId, createdBy: user._id })
    if (!results) return next(httpErrors(500, `failed to category to ${categoryId}`))

    res.status(200).json({ message: `Category Deleted successfully` })
  } catch (err) {
    next(httpErrors(500, err.message))
  }
}
