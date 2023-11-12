// ** JWT import
const jwt = require('jsonwebtoken')
const httpErrors = require('http-errors')
const { User } = require('../models')
const { getJwtConfig } = require('../configs/auth')

const jwtConfig = getJwtConfig()

/**
 * @dev extracts JWT token from headers and verifies it. if it is correct it will attach `user` to `req` object.
 */
module.exports = async (req, res, next) => {
  try {
    // ** Get token from header
    const rawAuthToken = req.headers['authorization']

    // if token contains Bearer, extract token
    const authTokenSplitted = rawAuthToken.split(' ')
    let authToken = ''
    if (authTokenSplitted.includes('Bearer')) authToken = authTokenSplitted[1]
    else authToken = authTokenSplitted[0]

    // ** decode token
    const decoded = jwt.verify(authToken, jwtConfig.secret)
    if (decoded) {
      // ** If token is valid do nothing
      const userId = decoded.id
      // ** Get user that matches id in token
      const user = await User.findById(userId)
      const userData = { ...user.toObject(), password: undefined }
      // ** return 200 with user data
      req.user = userData

      next()
    }
  } catch (err) {
    // ** JWT is invalid and user is not allowted to proceed

    next(httpErrors(401, 'Failed to validate user'))
  }
}
