const express = require("express");
const router = express.Router();

const { handleRouteAsync } = require("../functions/index");

/**
 * GET routes
 */
router.get("/users", (req, res, next) => {
    res.status(200).json({
        message: "GET /users",
    });
});

router.get("/courses", (req, res, next) => {
    res.status(200).json({
        message: "GET /courses",
    });
});

router.get("/courses/:id", (req, res, next) => {
    res.status(200).json({
        message: `GET /courses/${req.params.id}`,
    });
});

/**
 * POST routes
 */
router.post("/users", (req, res, next) => {
    res.status(201).redirect("/");
});

router.post("/courses", (req, res, next) => {
    res.status(200).redirect(`/courses/:id`);
});

/**
 * PUT routes
 */
router.put("/courses/:id", (req, res, next) => {
    res.status(204).json({
        message: `PUT /courses/${req.params.id}`,
    });
});

/**
 * DELETE routes
 */
router.delete("/courses/:id", (req, res, next) => {
    res.status(204).json({
        message: `DELETE /courses/${req.params.id}`,
    });
});

module.exports = router;
