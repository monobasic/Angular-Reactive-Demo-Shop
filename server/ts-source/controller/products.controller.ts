import * as multer from 'multer';
import * as jimp from 'jimp';
import * as uuid from 'uuid';
import * as path from 'path';
import * as appRootDir from 'app-root-dir';

import { find, findOne, save, remove } from '../services/product.service';

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      // tslint:disable-next-line:quotemark
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

export const getProducts = async (req, res, next) => {
  console.log('getting products remotely');

  try {
    const products = await find();

    res.write(JSON.stringify(products, null, 2));
    res.end();
  } catch (error) {
    const response = {
      success: false,
      message: `Failed to load products. Error: ${error}`
    };

    res.json(JSON.stringify(response));

    res.end();
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await findOne(id);

    res.write(JSON.stringify(product, null, 2));
    res.end();
  } catch (error) {
    console.log(error);
  }
};

export const uploadImages = multer(multerOptions).array('photos', 5);

export const resizeImages = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.files) {
    next(); // skip to the next middleware
    return;
  }

  req.body.photos = [];

  for (const file of req.files) {
    const extension = file.mimetype.split('/')[1];
    const fileName = `${uuid.v4()}.${extension}`;
    const filePath = `${appRootDir.get()}/src/img/uploads/${fileName}`;
    console.log('filePath', filePath);

    req.body.photos.push(`img/uploads/${fileName}`);

    // // now we resize
    const photo = await jimp.read(file.buffer);
    console.log('read');

    await photo.resize(450, jimp.AUTO);

    await photo.write(filePath);
  }
  // once we have written all the photos to our filesystem, keep going!
  console.log('body', req.body.photos);
  next();
};

export const addProduct = async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    priceNormal: req.body.priceNormal,
    reduction: req.body.reduction,
    imageURLs: req.body.photos,
    categories: req.body.categories
  };

  try {
    const dbResponse = await save(product);

    const answer = {
      success: true,
      message: `Added successfully item with id ${dbResponse.id}`
    };

    res.json(answer);
    res.end();
  } catch (error) {
    const answer = {
      success: false,
      message: `Failed to create a new product. Error: ${error}`
    };
    res.json(answer);
    res.end();
  }
};

export const deleteProduct = (req, res, next) => {
  res.send(req.params.id + ' to delete...');
};

export default {
  getProducts,
  getProduct,
  uploadImages,
  resizeImages,
  addProduct,
  deleteProduct
};
