const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/async-handler");
const { User } = require("../models");
const { Course } = require("../models");
const { authenticateUser } = require("../middleware/auth-user");

/**
 * GET routes
 */
router.get("/users", authenticateUser, (req, res, next) => {
    const user = req.currentUser;

    res.status(200).json({
        username: user.emailAddress,
    });
});

router.get(
    "/courses",
    asyncHandler(async (req, res, next) => {
        const courses = await Course.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                },
            ],
        });

        res.status(200).json({
            courses,
        });
    })
);

router.get(
    "/courses/:id",
    asyncHandler(async (req, res, next) => {
        const course = await Course.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: "user",
                },
            ],
        });

        res.status(200).json({
            course,
        });
    })
);

/**
 * POST routes
 */
router.post(
    "/users",
    asyncHandler(async (req, res, next) => {
        try {
            await User.create(req.body);

            res.status(201).redirect("/");
        } catch (error) {
            if (
                error.name === "SequelizeValidationError" ||
                error.name == "SequelizeUniqueConstraintError"
            ) {
                const errors = error.errors.map((err) => err.message);

                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);

router.post(
    "/courses",
    asyncHandler(async (req, res, next) => {
        try {
            const course = await Course.create(req.body);

            res.status(201).location(`/courses/${course.id}`).end();
        } catch (error) {
            if (
                error.name === "SequelizeValidationError" ||
                error.name == "SequelizeUniqueConstraintError"
            ) {
                const errors = error.errors.map((err) => err.message);

                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);

/**
 * PUT routes
 */
router.put(
    "/courses/:id",
    asyncHandler(async (req, res, next) => {
        const course = await Course.findByPk(req.params.id);

        if (course) {
            try {
                await course.update(req.body);

                res.status(204).end();
            } catch (error) {
                if (
                    error.name === "SequelizeValidationError" ||
                    error.name == "SequelizeUniqueConstraintError"
                ) {
                    const errors = error.errors.map((err) => err.message);

                    res.status(400).json({ errors });
                } else {
                    throw error;
                }
            }
        } else {
            next();
        }
    })
);

/**
 * DELETE routes
 */
router.delete("/courses/:id", (req, res, next) => {
    res.status(204).json({
        message: `DELETE /courses/${req.params.id}`,
    });
});

module.exports = router;
