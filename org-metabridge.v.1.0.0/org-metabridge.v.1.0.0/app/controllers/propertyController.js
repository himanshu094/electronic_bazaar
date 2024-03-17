const Property = require("../models/propertySchema");

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { propertyID } = req.body;

    // Check if a property with the same propertyID already exists
    const existingProperty = await Property.findOne({ propertyID });

    if (existingProperty) {
      return res
        .status(400)
        .json({ error: "Property with the same propertyID already exists" });
    }

    const propertyData = req.body;
    const newProperty = new Property(propertyData);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create property" });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalCount = await Property.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const properties = await Property.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).json({
      properties,
      page,
      limit,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve properties" });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Property found, respond with a success status and the property data
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve property by ID" });
  }
};

// Update property by ID
exports.updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updatedData,
      { new: true }
    );
    if (!updatedProperty) {
      res.status(404).json({ error: "Property not found" });
    } else {
      res.status(200).json(updatedProperty);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update property" });
  }
};

// Delete property by ID
exports.deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const deletedProperty = await Property.findByIdAndRemove(propertyId);
    if (!deletedProperty) {
      res.status(404).json({ error: "Property not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete property" });
  }
};
