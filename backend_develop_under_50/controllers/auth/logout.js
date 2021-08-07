const logout = (req, res, next) => {
    try {

        res.clearCookie('accessToken');
        return res.status(200).json({
            success: true,
            message: "Successfully logged out!"
        });

    } catch (err) {
        return res.status(504).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = logout;