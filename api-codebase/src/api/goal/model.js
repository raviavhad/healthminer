import mongoose, { Schema } from 'mongoose'

const goalSchema = new Schema({
  description: {
    type: String
  },
  estimatedachievementdate: {
    type: String
  },
  achievementdate: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

goalSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      description: this.description,
      estimatedachievementdate: this.estimatedachievementdate,
      achievementdate: this.achievementdate,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Goal', goalSchema)

export const schema = model.schema
export default model
