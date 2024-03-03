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


exports.deleteListing = async (req, res) => {
    try {
        console.log(`kdalf`)
        console.log(req.params.id)
        const listing = await ListingModel.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: `Listing not found`,
            })
        }
        if (req.user.id !== listing.userRef) {
            return res.status(401).json({
                success: false,
                message: `You cna only delete your listings`,
            })
        }
        await ListingModel.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            success: true,
            message: `Listing deleting  successfully`,
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }

}