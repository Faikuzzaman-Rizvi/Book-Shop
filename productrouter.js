
const express = require('express');
const router = express.Router();
const path = require("path");

const { productCreate , productGet , productUpdate } = require('./productctl');

const  multer  = require('multer');

 const storage = multer.diskStorage({

     destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
  });

const upload = multer({  storage: storage});

router.post('/',upload.single('file'),productCreate);
router.get('/',productGet);
router.put('/:id/stock',productUpdate);

module.exports = router;