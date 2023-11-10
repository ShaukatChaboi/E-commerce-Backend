// ** Import modules
const httpErrors = require('http-errors')
const { Categories } = require('../../models')
const { tagSchema } = require('../../joiSchemas')

/**
 * @dev only creator of document or admin can update it
 */
module.exports = async (req, res, next) => {
  const { categoryId } = req.params
  const user = req.user
  try {
    if (user.role !== 'admin') return next(httpErrors(403, `Only Admin can access`))
    if (!categoryId) return next(httpErrors(400, 'category Id not defined'))

    const { error, value } = tagSchema.validate(req.body)
    if (error) return next(httpErrors(400, error.message))

    const document = await Categories.findOneAndUpdate({ _id: categoryId, createdBy: user._id }, value, { new: true })
    if (!document) return next(httpErrors(404, `Category Not Found with id: ${categoryId}`))

    res.status(200).json(document)
  } catch (err) {
    next(httpErrors(500, err.message))
  }
}
