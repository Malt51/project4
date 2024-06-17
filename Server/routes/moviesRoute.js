const Movie = require('../models/movieModel')
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware')

//Add new movie

router.post("/add", authMiddleware, async (req, res) => {
    try {
        req.body.createdBy = req.userId;
        await Movie.create(req.body);
        res.status(200).json({ message: "Movie has been added", success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }


});

//get all the movie

router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate("hero")
            .populate("heroine")
            .populate("director")
            .populate("createdBy")
        res.status(200).json({ data: movies, success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }


});


//get movie by id
router.get("/:id", async (req, res) => {
    
    try {
        const movies = await Movie.findById(req.params.id)
            .populate("hero")
            .populate("heroine")
            .populate("director")
            .populate("cast")
            .populate("createdBy")
        res.status(200).json({data: movies, success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }


});



//update the movie
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: "Movie has been Updated", success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }


});


//Delete Movie
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.send({ message: "Movie has been Deleted", success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }


});


module.exports = router