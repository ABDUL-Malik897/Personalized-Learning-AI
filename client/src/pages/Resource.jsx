import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Loader2, Play, } from "lucide-react";
import { useLocation, useNavigate, } from "react-router-dom";
import { getResourceContent } from "../services/api";

function Resource() {

    const navigate = useNavigate();
    const location = useLocation();
    const resource = location.state?.resource;
    const [content, setContent] = useState(null);

    const resourceType = resource?.type?.toLowerCase() || "";
    const isYouTube = resourceType === "youtube" || resource?.url?.includes("youtube.com/") || resource?.url?.includes("youtu.be/");

    useEffect(() => {
        if (!resource?.url || isYouTube) {
            return;
        }
        let cancelled = false;
        const loadResource = async () => {
            try {
                const result = await getResourceContent(resource.url);
                if (!cancelled) {
                    setContent({
                        success: true,
                        data: result.resource,
                    });
                }
            } catch (err) {
                console.error("Failed to load resource:", err);
                if (!cancelled) {
                    setContent({
                        success: false,
                        error: err.response?.data?.message || "Unable to load this resource.",
                    });
                }
            }
        };
        loadResource();
        return () => {
            cancelled = true;
        };
    }, [resource, isYouTube]);

    if (!resource) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
                <div className="text-center">
                    <p className="text-slate-400">
                        Resource not found.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/roadmap")}
                        className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                        Back to Roadmap
                    </button>
                </div>
            </div>
        );
    }

    const getYouTubeId = (url) => {
        try {
            const parsed = new URL(url);
            if (parsed.hostname.includes("youtu.be")) {
                return parsed.pathname.slice(1);
            }
            if (parsed.hostname.includes("youtube.com")) {
                return parsed.searchParams.get("v");
            }
            return null;
        } catch {
            return null;
        }
    };

    const videoId = isYouTube ? getYouTubeId(resource.url) : null;

    const renderYouTube = () => {
        if (videoId) {
            return (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
                    <div className="aspect-video">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={resource.title}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
                <div className="flex items-center gap-3">
                    <Play size={20} />
                    <h2 className="font-semibold">
                        YouTube Resource
                    </h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                    This resource points to YouTube. Open it to choose and watch the recommended video.
                </p>
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                >
                    <Play size={16} />
                    Watch on YouTube
                    <ExternalLink size={14} />
                </a>
            </div>
        );
    };

    const renderContent = () => {
        if (!content) {
            return (
                <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-slate-400">
                    <Loader2
                        size={20}
                        className="mr-3 animate-spin"
                    />
                    Loading learning material...
                </div>
            );
        }

        if (!content.success) {
            return (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                    <h2 className="font-semibold text-red-300">
                        Unable to load this resource
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-red-200/70">
                        {content.error}
                    </p>
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                        Open Original Source
                        <ExternalLink size={15} />
                    </a>
                </div>
            );
        }
    
        const resourceContent = content.data;

        return (
            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl md:p-8">
                <h2 className="text-xl font-semibold">
                    {resourceContent?.title || resource.title}
                </h2>
                <div className="mt-6 whitespace-pre-wrap text-sm leading-8 text-slate-300">
                    {resourceContent?.content || "No readable content was returned."}
                </div>
                <div className="mt-10 border-t border-slate-800 pt-6">
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                        Continue on Original Source
                        <ExternalLink size={15} />
                    </a>
                </div>
            </article>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <main className="mx-auto max-w-5xl px-6 py-10">
                <button
                    type="button"
                    onClick={() => navigate("/roadmap")}
                    className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Roadmap
                </button>
                <header className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {resource.type}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight">
                        {resource.title}
                    </h1>
                    <p className="mt-3 max-w-3xl text-slate-400">
                        {resource.description}
                    </p>
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        Open original source
                        <ExternalLink size={15} />
                    </a>
                </header>
                {isYouTube ? renderYouTube() : renderContent()}
            </main>
        </div>
    );
}

export default Resource;