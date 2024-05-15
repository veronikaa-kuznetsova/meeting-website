const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profession: {
      type: Schema.Types.ObjectId,
      ref: 'Profession',
      required: true,
    },
    sex: { type: String, enum: ['мужской', 'женский', 'другой'] },
    avatar: String,
    // following: { type: Array, default: [] },
    // followers: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
