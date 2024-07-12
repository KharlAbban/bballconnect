const axios = require('axios');
const CourtModel = require("../models/CourtModel");

const getAllCourts = async (req, res) => {
    const fsqCourtBaseUrl = process.env.FOURSQUARE_PLACES_COURTS_BASE_URL;
    // const {latitude, longitude} = req.query; //user current location / map center

    try {
        const radius = 5000; // search radius in meters

        // axios request options
        const fsqReqOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.FOURSQUARE_DEV_API_KEY
            },
            url: `${fsqCourtBaseUrl}&near=Accra`
        }

        // Fetch courts from Mongo database
        // const courts = await CourtModel.find({
        //     location: {
        //         $near: {
        //             $geometry: {
        //                 type: "Point",
        //                 coordinates: [longitude, latitude]
        //             },
        //             $maxDistance: radius
        //         }
        //     }
        // });
        const mongoCourts = await CourtModel.find();

        // Fetch courts from Foursquare API server based on user location
        const foursquareCourts = await axios.request(fsqReqOptions);
        console.log(foursquareCourts);

        return res.json(foursquareCourts.data);

        // Merge and filter duplicate courts
        // Extract minimal location info
        // Send location info to frontend

    } catch (err) {
        console.error("Error fetching courts:", err.message);
        res.status(500).json({ message: "Failed to fetch basketball courts! Try again!"});
    }
}

const addNewCourt = async (req, res) => {}
const getACourt = async (req, res) => {}
const updateACourt = async (req, res) => {}
const deleteACourt = async (req, res) => {}

module.exports = {
    getAllCourts,
    addNewCourt,
    getACourt,
    updateACourt,
    deleteACourt
}