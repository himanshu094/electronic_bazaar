const FavoriteProperty = require('../models/favoritePropertySchema'); // Import the FavoriteProperty model
const User = require('../models/userSchema');


// Add a property to a user's favorites
exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication in place
    const propertyId = req.params.propertyId; // Assuming you pass the property ID in the URL

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the property is already in favorites
    const existingFavorite = await FavoriteProperty.findOne({ user: userId, property: propertyId });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Property already in favorites' });
    }

    const newFavorite = new FavoriteProperty({ user: userId, property: propertyId });
    await newFavorite.save();

    res.status(200).json(newFavorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add property to favorites' });
  }
};

// Get a user's favorite properties
exports.getFavoriteProperties = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication in place
    const favorites = await FavoriteProperty.find({ user: userId }).populate('property');
    if (!favorites) {
      return res.status(404).json({ error: 'User not found or has no favorite properties' });
    }

    res.status(200).json(favorites.map((favorite) => favorite.property));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve favorite properties' });
  }
};

// Remove a property from a user's favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication in place
    const propertyId = req.params.propertyId; // Assuming you pass the property ID in the URL

    const favorite = await FavoriteProperty.findOneAndDelete({ user: userId, property: propertyId });
    if (!favorite) {
      return res.status(404).json({ error: 'Property not found in favorites' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove property from favorites' });
  }
};
