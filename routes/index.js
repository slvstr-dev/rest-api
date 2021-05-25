const express = require("express");
const router = express.Router();

const { handleRouteAsync } = require("../middleware/async-handler");

/**
 * GET routes
 */
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to the REST API project!",
    });
});

module.exports = router;
