const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    locationInfo: {
        address: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    details: {
        verified: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: null
        },
        hours: {
            type: String,
            default: null
        },
        photos: [
            {
                url: String,
                caption: String
            }
        ],
        access: {
            type: String,
            required: true
        },
        entryFee: {
            type: String,
            default: null
        }
    },
    amenities: {
        type: [String],
        validate: {
            validator: (amenitiesArray) => amenitiesArray.length > 0,
            message: 'At least one amenity must be provided'
        },
        required: true
    },
    features: {
        courtSurface: {
            type: String,
            required: true
        },
        lighting: {
            type: Boolean,
            required: true
        },
        indoor: {
            type: Boolean,
            default: false
        },
        hoops: {
            type: Number,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            min: 1,
            required: true
        },
        seating: {
            type: Boolean,
            default: false
        },
        restrooms: {
            type: Boolean,
            default: false
        }
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
});

// Middleware to updated 'updatedAt' field on every save
courtSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('court', courtSchema);
