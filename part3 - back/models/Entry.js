const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (value) {
        // Regular expression to match the required format: 2-3 digits, "-", and 4-5 digits
        const phoneRegex = /^\d{2,3}-\d{6,}$/
        return phoneRegex.test(value)
      },
      message: 'Phone number must be in the format: 2-3 digits - 4-5 digits'
    }
  },
})

module.exports = mongoose.model('Entry', entrySchema)