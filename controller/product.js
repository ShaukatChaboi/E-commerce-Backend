const Product = require("../models/product");
const ApiFeatures = require("../utils/apifeatures");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      rating,
      images,
      category,
      stock,
      numberOfReviews,
      reviews,
      createdAt,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      rating,
      images,
      category,
      stock,
      numberOfReviews,
      reviews,
      createdAt,
    });
    await product.save();
    res.json(product); // Correct the method name to 'json'
  } catch (error) {
    res.status(500).json({ error: error.message }); // Correct the method name to 'json'
  }
};

const getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const getallproducts = await apiFeature.query;
    res.json(getallproducts,productCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productById = await Product.findById(req.params.id);
    res.json(productById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateProduct = req.body;
    const option = { new: true };
    const result = await Product.findByIdAndUpdate(id, updateProduct, option);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productdata = await Product.findByIdAndDelete(id);
    res.send(`Product name ${productdata.name} has been deleted..`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
