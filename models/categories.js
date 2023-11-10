const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categories = mongoose.model(
  'category',
  new Schema(
    {
      name: { type: String, required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
    },
    { timestamps: true }
  )
)

module.exports = Categories
