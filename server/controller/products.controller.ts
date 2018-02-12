import * as multer from 'multer';
import * as jimp from 'jimp';
import * as uuid from 'uuid';

import ProductModel from '../model/product.model';

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

const upload = multer(multerOptions).array('photo');

const resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.files) {
    next(); // skip to the next middleware
    return;
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;

  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

const createProduct = async (req, res) => {
  const product = await new ProductModel(req.body).save();
  res.redirect(`/products/${product.id}`);
};

const getProducts = () => {
  return ProductModel.find().exec();
};

const getSingleProduct = (id) => {
  return ProductModel.findOne({ id: id }).exec();
};

const addProduct = (product) => {
  const newProduct = new ProductModel(product);

  return newProduct.save();
};

const deleteProduct = (id, callback) => {
  const query = { _id: id };
};

export default {
  getProducts,
  getSingleProduct,
  addProduct: addProduct
};
