const Developer = require("../models/developerSchema");

exports.create = async (req, res) => {
  try {
    const developerData = req.body;
    const newDeveloper = new Developer(developerData);

    const savedDeveloper = await newDeveloper.save();
    res.status(201).json(savedDeveloper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create developer" });
  }
};

exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchName = req.query.name || "";

  try {
    const regex = new RegExp(searchName, "i");
    const query = {
      name: regex, // Replace 'name' with the actual field you want to search
    };

    const totalDevelopers = await Developer.countDocuments(query);
    const totalPages = Math.ceil(totalDevelopers / limit);

    const developers = await Developer.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      developers,
      page,
      limit,
      totalPages,
      totalDeveloper: totalDevelopers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve developers" });
  }
};

exports.getById = async (req, res) => {
  const developerId = req.params.id;

  try {
    const developer = await Developer.findById(developerId);
    if (!developer) {
      res.status(404).json({ error: "Developer not found" });
    } else {
      res.status(200).json(developer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve developer" });
  }
};

exports.update = async (req, res) => {
  const developerId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedDeveloper = await Developer.findByIdAndUpdate(
      developerId,
      updatedData,
      { new: true }
    );
    if (!updatedDeveloper) {
      res.status(404).json({ error: "Developer not found" });
    } else {
      res.status(200).json(updatedDeveloper);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update developer" });
  }
};

exports.delete = async (req, res) => {
  const developerId = req.params.id;

  try {
    const deletedDeveloper = await Developer.findByIdAndRemove(developerId);
    if (!deletedDeveloper) {
      res.status(404).json({ error: "Developer not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete developer" });
  }
};
