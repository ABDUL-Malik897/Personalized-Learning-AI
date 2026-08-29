const verifyUrl = async (url) => {
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
            return false;
        }
        const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            signal: AbortSignal.timeout(8000),
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};

const verifyResources = async (resources = []) => {
    const verified = [];
    for (const resource of resources) {
        if (!resource?.url) continue;
        const isValid = await verifyUrl(resource.url);
        if (isValid) {
            verified.push(resource);
        }
    }
    return verified;
};

module.exports = {
    verifyResources,
};