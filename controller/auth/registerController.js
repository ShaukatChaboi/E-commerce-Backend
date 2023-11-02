// ** Package Imports
const bcrypt = require('bcrypt')
const httpErrors = require('http-errors')
const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    let { email, password, username } = req.body

    if (email && password && username) {
      const [isEmailAlreadyInUse, isUsernameAlreadyInUse] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ username })
      ])

      if (!isEmailAlreadyInUse && !isUsernameAlreadyInUse) {
        // ** create salt
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)
        password = hashedPassword
        const userData = {
          email,
          password,
          username
        }

        //**  create new user
        const registerNewUser = await User.create(userData)
        if (!registerNewUser) return res.status(404).json({ message: 'Registration Failed' })

        const user = { ...userData, password: undefined }

        return res.status(200).json({ userData: user })
      }

      // ** response for same username or email
      if (isUsernameAlreadyInUse && isEmailAlreadyInUse) return httpErrors(409, 'Username and Email already in use')
      if (isEmailAlreadyInUse) return httpErrors(409, 'Email is already in use')
      if (isUsernameAlreadyInUse) return httpErrors(409, 'Username is already in use')
    }

    return res.status(400).json({ message: 'email, password or username is empty' })
  } catch (err) {
    httpErrors(500, err.message)
  }
}
