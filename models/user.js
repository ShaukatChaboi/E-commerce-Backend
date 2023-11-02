const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.model(
  'user',
  new Schema(
    {
      username: String,
      firstName: String,
      lastName: String,
      displayImg: String,
      coverImg: String,
      role: { type: String, default: 'client' },
      email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      contactNumber: {
        type: String,
        validate: {
          validator: v => /\d{3}-\d{3}-\d{4}/.test(v),
          message: props => `${props.value} is not a valid Mobile number!`
        }
      },
      address: String,
      state: String,
      zipCode: Number,
      skype: String,
      country: String,
      language: { type: String, default: 'en' },
      timeZone: String,
      currency: String,
      active: { type: Boolean, default: true }, // set active to true by default
      socialAccounts: { type: Schema.Types.ObjectId, ref: 'socialAccounts' } // Reference to SocialAccounts schema
    },
    { timestamps: true }
  )
)

module.exports = User
