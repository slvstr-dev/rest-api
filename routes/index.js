const express = require("express");
const router = express.Router();

const { handleRouteAsync } = require("../functions/index");

/**
 * GET routes
 */
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to the REST API project!",
    });
});

module.exports = router;
