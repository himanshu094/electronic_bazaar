const mongoose = require('mongoose');

// Define a Mongoose schema for the Property
const propertySchema = new mongoose.Schema({
  propertyType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Industrial', 'Land'],
    required: true,
  },
  propertyID: {
    type: String,
    required: true,
    unique: true, // Make it unique
  },
  propertySubtype: String,
  propertyDetails: {
    propertyID: String,
    titleDeedNumber: String,
    legalDescription: String,
    yearBuilt: Number,
    squareFootage: Number,
    numberOfFloors: Number,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  pricing: {
    listingPrice: Number,
    pricePerSquareFoot: Number,
    rentalPrice: Number,
    currency: String,
  },
  amenitiesAndFeatures: {
    bedrooms: Number,
    bathrooms: Number,
    parkingSpaces: Number,
    swimmingPool: Boolean,
    gym: Boolean,
    securitySystem: Boolean,
    centralHeatingCooling: Boolean,
    outdoorSpace: Boolean,
    elevator: Boolean,
    accessibilityFeatures: [String],
  },
  propertyDescription: {
    briefDescription: String,
    detailedDescription: String,
  },
  propertyMedia: {
    photos: [String],
    floorPlans: [String],
    virtualTours: [String],
    videos: [String],
  },
  contactInformation: {
    listingAgentAgency: String,
    agentAgencyContactDetails: String,
  },
  additionalInformation: {
    propertyTaxInformation: String,
    hoaFees: String,
    leaseTerms: String,
    zoningInformation: String,
    propertyHistory: String,
  },
  availability: {
    status: String,
    availabilityDate: Date,
  },
  legalAndRegulatoryInformation: {
    propertyLiens: String,
    buildingPermits: String,
    environmentalCompliance: String,
  },
  nearbyFacilitiesAndServices: {
    schools: [String],
    hospitals: [String],
    publicTransportation: [String],
    shoppingCenters: [String],
    restaurants: [String],
  },
  propertyFeatures: {
    typeOfBusinessAllowed: String,
    warehouseFeatures: String,
    commercialSpaceLayout: String,
    leaseTermsCommercial: String,
  },
  landDetails: {
    landSize: Number,
    zoningInformationLand: String,
    landUseRestrictions: String,
    soilType: String,
  },
});

// Create a Mongoose model for the Property based on the schema
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
