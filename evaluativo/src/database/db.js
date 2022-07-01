const mongoose = require('mongoose')

console.log('Connecting to MongoDB...')

mongoose
  .connect('mongodb://localhost/people')
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err))
