const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },

    bio: {
        type: String,
        required: true,
    },

    profilePic: {
        type: String,
        required: true,
    },

    

    debutYear: {
        type: Number,
        required: true,
    },

    debutMovie: {
        type: String,
        required: true,
    },

    profession: {
        type: String,
        required: true,
    },

    images: {
        type: [],
        required: false,
      },



    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    //     required: true,
    // },


}, { timestamps: true })

module.exports = mongoose.model("artists", artistSchema);


