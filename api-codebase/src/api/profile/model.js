import mongoose, { Schema } from 'mongoose'

const profileSchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: String
  },
  address: {
    type: String
  },
  contactnumber: {
    type: String
  },
  startdate: {
    type: String
  },
  status: {
    type: String
  },
  fitnesspoints: {
    type: String
  },
  walletaddress: {
    type: String
  },
  currentrank: {
    type: String
  },
  bestrank: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

profileSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      age: this.age,
      address: this.address,
      contactnumber: this.contactnumber,
      startdate: this.startdate,
      status: this.status,
      fitnesspoints: this.fitnesspoints,
      walletaddress: this.walletaddress,
      currentrank: this.currentrank,
      bestrank: this.bestrank,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Profile', profileSchema)

export const schema = model.schema
export default model
