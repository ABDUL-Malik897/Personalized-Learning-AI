const { fetchResourceContent } = require(
    "../services/resourceService"
);

const getResourceContent = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({
                success: false,
                message: "Resource URL is required",
            });
        }
        const resource = await fetchResourceContent(url);
        return res.status(200).json({
            success: true,
            resource,
        });
    } catch (error) {
        console.error("Resource fetch error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Unable to fetch resource",
        });
    }
};

module.exports = {
    getResourceContent,
};