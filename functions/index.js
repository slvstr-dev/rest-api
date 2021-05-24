/* Helper function to handle each route async */
const handleRouteAsync = (callback) => {
    return async (req, res, next) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = handleRouteAsync;
