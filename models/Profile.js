const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    degree: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    major: {
        type: [String],
        required: true
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },

    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description:{
                type:String
            }
        }
    ],

    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description:{
                type:String
            }
        }
    ],

    expertise: [
        {
            area: {
                type: String,
                required: true
            },
            relatedCourses: {
                type: [String],
                required: true
            },
            description:{
                type:String
            }
        }
    ],

    social:{
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)