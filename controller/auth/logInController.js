// ** JWT import
const jwt = require('jsonwebtoken')
const httpErrors = require('http-errors')
const bcrypt = require('bcrypt')
const { getJwtConfig } = require('../../configs/auth')
const { User } = require('../../models')

// ** initialize configurations
const jwtConfig = getJwtConfig()

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).populate('socialAccounts')

    if (!user) return httpErrors(400, 'Invalid Emai')
    let check = await bcrypt.compare(password, user.password)
    if (!check) return httpErrors(400, 'Invalid Password')

    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expirationTime
    })

    const payload = {
      accessToken,
      userData: { ...user.toObject(), password: undefined }
    }

    return res.status(200).json(payload)
  } catch (err) {
    httpErrors(500, err.message)
  }
}
