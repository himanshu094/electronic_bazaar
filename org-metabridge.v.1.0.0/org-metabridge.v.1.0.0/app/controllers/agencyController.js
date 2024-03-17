const Agency = require("../models/agencySchema"); // Import the Agency model

// Create a new agency
exports.createAgency = async (req, res) => {
  try {
    const agencyData = req.body; // Assuming the request contains agency data
    const newAgency = new Agency(agencyData);

    const savedAgency = await newAgency.save();

    res.status(201).json(savedAgency);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create agency", details: err.message });
  }
};

// Get all agencies

// get full details developer and agent in agencies
exports.getAllAgencies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.name || "";

    let searchFilter = {};

    if (searchTerm) {
      searchFilter = {
        name: { $regex: new RegExp(searchTerm, "i") }, // Case-insensitive search
      };
    }

    const totalAgency = await Agency.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalAgency / limit);

    const agencies = await Agency.find(searchFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "developers agents", // Populate the 'developers' and 'agents' fields
      })
      .exec();

    res.status(200).json({
      agencies,
      page,
      limit,
      totalPages,
      totalAgency,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve agency", details: error.message });
  }
};

// @desc give agent and developer name only

// exports.getAllAgencies = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const searchTerm = req.query.name || "";

//     let searchFilter = {};

//     if (searchTerm) {
//       searchFilter = {
//         name: { $regex: new RegExp(searchTerm, "i") }, // Case-insensitive search
//       };
//     }

//     const totalAgency = await Agency.countDocuments(searchFilter);
//     const totalPages = Math.ceil(totalAgency / limit);

//     const agencies = await Agency.find(searchFilter)
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .populate({
//         path: "developers agents", // Populate the 'developers' and 'agents' fields
//         select: "fullName", // Select the fields you want to include in the response
//       })
//       .exec();

//     res.status(200).json({
//       agencies,
//       page,
//       limit,
//       totalPages,
//       totalAgency,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Failed to retrieve agency", details: error.message });
//   }
// };

// Get agency by ID
exports.getAgencyById = async (req, res) => {
  try {
    const agencyId = req.query.id || req.params.id; // Try to get ID from query parameter, fallback to URL parameter

    if (!agencyId) {
      return res.status(400).json({ error: "Agency ID not provided" });
    }

    const agency = await Agency.findById(agencyId)
      .populate("developers agents") // Populate the 'developers' and 'agents' fields
      .exec();

    if (!agency) {
      res.status(404).json({ error: "Agency not found" });
    } else {
      res.status(200).json(agency);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve agency" });
  }
};

// Update agency by ID
// exports.updateAgency = async (req, res) => {
//   try {
//     const agencyId = req.params.id; // Assuming you pass the agency ID in the URL
//     const updatedData = req.body; // Assuming the request contains updated data

//     const updatedAgency = await Agency.findByIdAndUpdate(
//       agencyId,
//       updatedData,
//       {
//         new: true,
//       }
//     ).exec();

//     if (!updatedAgency) {
//       res.status(404).json({ error: "Agency not found" });
//     } else {
//       res.status(200).json(updatedAgency);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update agency" });
//   }
// };
// ------------------------------------------------------
// exports.addDevelopersToAgency = async (req, res) => {
//   try {
//     const agencyId = req.params.id;
//     const developersToAdd = req.body.developersToAdd;

//     const updatedAgency = await Agency.findByIdAndUpdate(
//       agencyId,
//       { $push: { developers: { $each: developersToAdd } } },
//       { new: true }
//     ).exec();

//     if (!updatedAgency) {
//       res.status(404).json({ error: "Agency not found" });
//     } else {
//       res.status(200).json(updatedAgency);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to add developers to agency" });
//   }
// };

// ----------------------------------------------------
exports.updateAgency = async (req, res) => {
  try {
    const agencyId = req.params.id; // Assuming you pass the agency ID in the URL
    const {
      developersToAdd,
      developersToRemove,
      agentsToAdd,
      agentsToRemove,
      ...updatedData
    } = req.body;

    const updateOperations = {};

    if (developersToAdd && developersToAdd.length > 0) {
      updateOperations.$push = { developers: { $each: developersToAdd } };
    }

    if (developersToRemove && developersToRemove.length > 0) {
      updateOperations.$pull = { developers: { $in: developersToRemove } };
    }

    if (agentsToAdd && agentsToAdd.length > 0) {
      updateOperations.$push = { agents: { $each: agentsToAdd } };
    }

    if (agentsToRemove && agentsToRemove.length > 0) {
      updateOperations.$pull = { agents: { $in: agentsToRemove } };
    }

    // Merge the update operations with other updated data
    const updateQuery = { ...updatedData, ...updateOperations };

    const updatedAgency = await Agency.findByIdAndUpdate(
      agencyId,
      updateQuery,
      {
        new: true,
      }
    ).exec();

    if (!updatedAgency) {
      res.status(404).json({ error: "Agency not found" });
    } else {
      res.status(200).json(updatedAgency);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update agency" });
  }
};

// exports.updateAgency = async (req, res) => {
//   try {
//     const agencyId = req.params.id; // Assuming you pass the agency ID in the URL
//     const {
//       developersToAdd,
//       developersToRemove,
//       agentsToAdd,
//       agentsToRemove,
//       ...updatedData
//     } = req.body;

//     // Fetch the existing agency data to perform duplicate checks
//     const existingAgency = await Agency.findById(agencyId).exec();

//     if (!existingAgency) {
//       return res.status(404).json({ error: "Agency not found" });
//     }

//     const updateOperations = {};

//     if (developersToAdd && developersToAdd.length > 0) {
//       // Check for duplicate developers before pushing
//       const uniqueDevelopersToAdd = developersToAdd.filter(
//         (developerId) => !existingAgency.developers.includes(developerId)
//       );
//       if (uniqueDevelopersToAdd.length > 0) {
//         updateOperations.$push = {
//           developers: { $each: uniqueDevelopersToAdd },
//         };
//       }
//     }

//     if (developersToRemove && developersToRemove.length > 0) {
//       // Check if developers exist before pulling
//       const existingDevelopers = existingAgency.developers.filter(
//         (developerId) => developersToRemove.includes(developerId)
//       );
//       if (existingDevelopers.length > 0) {
//         updateOperations.$pull = { developers: { $in: existingDevelopers } };
//       }
//     }

//     if (agentsToAdd && agentsToAdd.length > 0) {
//       // Check for duplicate agents before pushing
//       const uniqueAgentsToAdd = agentsToAdd.filter(
//         (agentId) => !existingAgency.agents.includes(agentId)
//       );
//       if (uniqueAgentsToAdd.length > 0) {
//         updateOperations.$push = { agents: { $each: uniqueAgentsToAdd } };
//       }
//     }

//     if (agentsToRemove && agentsToRemove.length > 0) {
//       // Check if agents exist before pulling
//       const existingAgents = existingAgency.agents.filter((agentId) =>
//         agentsToRemove.includes(agentId)
//       );
//       if (existingAgents.length > 0) {
//         updateOperations.$pull = { agents: { $in: existingAgents } };
//       }
//     }

//     // Merge the update operations with other updated data
//     const updateQuery = { ...updatedData, ...updateOperations };

//     const updatedAgency = await Agency.findByIdAndUpdate(
//       agencyId,
//       updateQuery,
//       {
//         new: true,
//       }
//     ).exec();

//     if (!updatedAgency) {
//       return res
//         .status(404)
//         .json({ error: "Agency not found or no changes made" });
//     }

//     return res.status(200).json(updatedAgency);
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ error: "Failed to update agency", details: err.message });
//   }
// };

// Delete agency by ID

exports.deleteAgency = async (req, res) => {
  try {
    const agencyId = req.params.id; // Assuming you pass the agency ID in the URL

    const deletedAgency = await Agency.findByIdAndRemove(agencyId).exec();

    if (!deletedAgency) {
      res.status(404).json({ error: "Agency not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete agency" });
  }
};
