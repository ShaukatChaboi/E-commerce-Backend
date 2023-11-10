const categoriesRoutes = require('express').Router()
const { useAuthenticate } = require('../middleware')
const {
  createCategory,
  getCategoryById,
  getCategories,
  deleteCategory,
  updateCategory
} = require('../controller/categories')

categoriesRoutes
  // to retrive all categories
  .get('/', useAuthenticate, getCategories)
  // get single category
  .get('/:categoryId', useAuthenticate, getCategoryById)
  //create new category, only admin can create
  .post('/create', useAuthenticate, createCategory)
  //update
  .put('/modify/:categoryId', useAuthenticate, updateCategory)
  //delete category
  .delete('/:categoryId', useAuthenticate, deleteCategory)

module.exports = categoriesRoutes
