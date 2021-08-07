const continueIfAuthenticated = (req, res, next) => {
    try {
        if (req.user)
            res.status(200).json({ success: true, user: req.user });
        if (req.restaurant)
            res.status(200).json({ success: true, restaurant: req.restaurant });

    } catch (error) {
        res.status(504).json({ success: false, error: error.message });

    }
};
module.exports = continueIfAuthenticated;