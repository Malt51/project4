const router = require('express').Router();
const multer = require('multer')
const cloudnaryConfig = require('../config/cloudinaryConfig')
const authMiddleware = require('../middlewares/authMiddleware')

//multer confiq
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

router.post('/upload-image', authMiddleware, multer({ storage }).single('image'),
    async (req, res) => {
        try {
            const response = await cloudnaryConfig.uploader.upload(req.file.path, {
                folder: "Mad-Movie",
            });
            const imageUrl = response.secure_url;
            res.status(200).json({ message: "Image Uploaded", data: imageUrl });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    });

    module.exports = router;