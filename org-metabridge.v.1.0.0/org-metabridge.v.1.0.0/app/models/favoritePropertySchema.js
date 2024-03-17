// const mongoose = require('mongoose');

// const favoritePropertySchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'RegularUser',
//   },
//   property: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Property',
//   },
//   // Add timestamp or other fields as needed
// });

// const FavoriteProperty = mongoose.model('FavoriteProperty', favoritePropertySchema);

// module.exports = FavoriteProperty;

const mongoose = require('mongoose');

const favoritePropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegularUser',
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  }],
  // Add timestamp or other fields as needed
});

const FavoriteProperty = mongoose.model('FavoriteProperty', favoritePropertySchema);

module.exports = FavoriteProperty;
