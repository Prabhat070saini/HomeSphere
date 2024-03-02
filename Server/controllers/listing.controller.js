const ListingModel = require("../models/Listing.model")

exports.createListing = async (req, res) => {
    try {
        const listing = await ListingModel.create(req.body);
        return res.status(201).json({
            success: true,
            message: `Listing created successfully`,
            listing
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error creating listing`,
            err
        })
    }
}
