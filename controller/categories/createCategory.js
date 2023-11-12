// ** Import modules
const httpErrors = require('http-errors')
const { Categories } = require('../../models')
const { tagSchema } = require('../../joiSchemas')

module.exports = async (req, res, next) => {
  // will be attached by useAuthenticate.
  const user = req.user
  try {
    if (user.role !== 'admin') return next(httpErrors(403, `Only Admin can create categories`))

    const { error, value } = tagSchema.validate(req.body)
    if (error) return next(httpErrors(400, error.message))

    const document = await Categories.create({ ...value, createdBy: user._id })
    if (!document) return next(500, 'Unable to Create Category')

    res.status(201).json(document)
  } catch (err) {
    next(httpErrors(500, err.message))
  }
}
