import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    token: String,
    phone: String,
    avatar: String,

    status: {
      type: String,
      default: 'active',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema, 'users')

export default User
