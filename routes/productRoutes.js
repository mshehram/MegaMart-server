const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', upload.single('imgUrl'), ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.delete('/:id', ProductController.deleteProduct);
router.patch('/:id', ProductController.removeSection); // updated logic for section deletion

module.exports = router;
