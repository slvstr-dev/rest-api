const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// Authenticate user request with Basic Auth
exports.authenticateUser = async (req, res, next) => {
    let errorMessage;

    // Parse credentials
    const credentials = auth(req);

    if (credentials) {
        const user = await User.findOne({
            where: { emailAddress: credentials.name },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if (user) {
            const authenticated = bcrypt.compareSync(
                credentials.pass,
                user.password
            );

            if (authenticated) {
                console.log(
                    `Authentication successful for username: ${user.emailAddress}`
                );

                // Store user on the Request object
                req.currentUser = user;
            } else {
                errorMessage = `Authentication failure for username: ${user.emailAddress}`;
            }
        } else {
            errorMessage = `User not found for username: ${user.emailAddress}`;
        }
    } else {
        errorMessage = "Authentication header not found";
    }

    if (errorMessage) {
        console.warn(errorMessage);
        res.status(401).json({ message: "Access Denied" });
    } else {
        next();
    }
};
