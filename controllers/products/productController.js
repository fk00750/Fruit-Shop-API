const Product = require("../../models/product");
const Joi = require("joi");
const multer = require("multer");
const path = require("path");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");
const fs = require("fs");
const APIFeatures = require("../../utils/API_Features");

const getAll_products = async (req, res, next) => {
  let documents;
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .sort()
      .field()
      .filter()
      .pagination();

    documents = await features.query;
  } catch (error) {
    return next(CustomErrorHandler.serverError(err.message));
  }

  res.send(documents);
};

const get_product = async (req, res, next) => {
  let document;
  try {
    document = await Product.findOne({ _id: req.params.id });
  } catch (error) {
    return next(CustomErrorHandler.serverError(err.message));
  }

  res.send(document);
};

/////////////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const create_product = async (req, res, next) => {
  // handle multipart data
  handleMultipartData(req, res, async (err) => {
    if (err) {
      return next(CustomErrorHandler.serverError(err.message));
    }

    // file path
    const filePath = req.file.path;

    // validation by Joi
    const ProductSchema = Joi.object({
      name: Joi.string().required(),
      location: Joi.string().required(),
      cultivar: Joi.string().required(),
      rating: Joi.number().required(),
      price: Joi.number().required(),
    });

    const { error } = ProductSchema.validate(req.body);

    if (error) {
      // delete the uploaded file
      fs.unlink(`${filePath}`, (err) => {
        if (err) {
          return next(CustomErrorHandler.serverError(err.message));
        }
      });

      return next(error);
    }

    const { name, location, cultivar, rating, price } = req.body;

    let document;
    try {
      document = await Product.create({
        name,
        location,
        cultivar,
        rating,
        price,
        image: filePath,
      });
    } catch (error) {
      return next(error);
    }

    res.status(201).json(document);
  });
};

const update_product = async (req, res, next) => {
  // handle multipart data
  handleMultipartData(req, res, async (err) => {
    if (err) {
      return next(CustomErrorHandler.serverError(err.message));
    }

    // file path
    let filePath;
    if (req.file) {
      filePath = req.file.path;
    }

    // validation by Joi
    const ProductSchema = Joi.object({
      name: Joi.string().required(),
      location: Joi.string().required(),
      cultivar: Joi.string().required(),
      rating: Joi.number().required(),
      price: Joi.number().required(),
      image: Joi.string(),
    });

    const { error } = ProductSchema.validate(req.body);

    if (error) {
      // delete the uploaded file
      if (req.file) {
        fs.unlink(`${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
      }

      return next(error);
    }

    const { name, location, cultivar, rating, price } = req.body;

    let document;
    try {
      document = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { name, location, cultivar, rating, price, ...(req.file && { image: filePath }) },
        { new: true }
      );
    } catch (error) {
      return next(error);
    }

    res.status(201).json(document);
  });
};

const delete_product = async (req, res, next) => {
  const document = await Product.findOneAndDelete({ _id: req.params.id });

  if (!document) {
    return next(new Error("Nothing to delete"));
  }

  // image path
  const imagePath = document._doc.image;
  fs.unlink(`${imagePath}`, (err) => {
    if (err) {
      return next(CustomErrorHandler.serverError(err.message));
    }
  });
  res.send(document);
};

module.exports = {
  getAll_products,
  get_product,
  create_product,
  update_product,
  delete_product,
};
