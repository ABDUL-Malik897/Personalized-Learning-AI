const cheerio = require("cheerio");
const MAX_CONTENT_LENGTH = 12000;

const blockedHosts = new Set([
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "::1",
]);

const isSafePublicUrl = (url) => {
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
            return false;
        }
        const hostname = parsed.hostname.toLowerCase();
        if (blockedHosts.has(hostname)) {
            return false;
        }

        if (
            hostname.startsWith("10.") ||
            hostname.startsWith("192.168.") ||
            hostname.startsWith("172.16.") ||
            hostname.startsWith("172.17.") ||
            hostname.startsWith("172.18.") ||
            hostname.startsWith("172.19.") ||
            hostname.startsWith("172.20.") ||
            hostname.startsWith("172.21.") ||
            hostname.startsWith("172.22.") ||
            hostname.startsWith("172.23.") ||
            hostname.startsWith("172.24.") ||
            hostname.startsWith("172.25.") ||
            hostname.startsWith("172.26.") ||
            hostname.startsWith("172.27.") ||
            hostname.startsWith("172.28.") ||
            hostname.startsWith("172.29.") ||
            hostname.startsWith("172.30.") ||
            hostname.startsWith("172.31.")
        ) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
};

const cleanText = (text) => text
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const fetchResourceContent = async (url) => {
    if (!isSafePublicUrl(url)) {
        throw new Error("Invalid or unsafe resource URL");
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": "Personalized-Learning-AI/1.0",
            Accept: "text/html,application/xhtml+xml",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
        throw new Error(
            `Resource returned HTTP ${response.status}`
        );
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
        throw new Error("This resource does not provide an HTML page");
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    $("script, style, noscript, iframe, nav, footer, header, aside, form").remove();
    const title = $("h1").first().text().trim() ||  $("title").text().trim() || "Learning Resource";
    const sections = [];
    $("h1, h2, h3, h4, p, li, pre, code").each(
        (_, element) => {
            const tag = element.tagName.toLowerCase();
            const text = $(element).text().trim();
            if (!text) return;
            if (tag === "pre" || tag === "code") {
                sections.push(`\n${text}\n`);
            } else {
                sections.push(text);
            }
        }
    );
    let content = cleanText(sections.join("\n"));
    if (!content) {
        throw new Error(
            "Could not extract readable learning content"
        );
    }
    if (content.length > MAX_CONTENT_LENGTH) {
        content =  content.slice(0, MAX_CONTENT_LENGTH).trim() +  "\n\n[Content shortened. Open the original resource for the complete material.]";
    }
    return {
        title,
        url,
        content,
    };
};

module.exports = {
    fetchResourceContent,
};