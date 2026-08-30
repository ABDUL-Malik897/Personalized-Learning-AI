import { useEffect, useState } from "react";
import { logoutUser } from "../services/auth";
import { BookOpen, CheckCircle2, Clock, Target, Sparkles, ArrowRight, Bot, Loader2, MessageCircle, X, Send, ChevronDown, User, LogOut, } from "lucide-react";
import { getUser, getLearningPath, getUserProgress, chatWithAI, reassessLearningPath } from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [learningPath, setLearningPath] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [reassessing, setReassessing] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState("");
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            role: "assistant",
            text: `Hi! I'm your AI learning assistant. How can I help you with your learning journey?`,
        },
    ]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    window.location.href = "/";
                    return;
                }
                const result = await getUser(userId);
                setUser(result.user);
                try {
                    const pathResult = await getLearningPath(userId);
                    if (pathResult.paths && pathResult.paths.length > 0) {
                        setLearningPath(pathResult.paths[0]);
                    }
                } catch (pathError) {
                    console.error("Failed to load learning path:", pathError);
                }
                try {
                    const progressResult = await getUserProgress(userId);
                    setProgress(progressResult.progress || []);
                } catch (progressError) {
                    console.error("Failed to load progress:", progressError);
                }
            } catch (error) {
                console.error("Failed to load dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const completedModules = progress.filter((item) => item.completed).length;
    const totalModules = learningPath?.modules?.length || 0;
    const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    const handleSendMessage = async () => {
        if (!message.trim() || chatLoading) return;
        const userMessage = message.trim();
        setChatMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: userMessage,
            },
        ]);
        setMessage("");
        setChatLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            const result = await chatWithAI({
                userId,
                message: userMessage,
            });
            setChatMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: result.answer || "Sorry, I couldn't generate a response.",
                },
            ]);
        } catch (error) {
            console.error("AI chat error:", error);
            setChatMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Sorry, something went wrong. Please try again.",
                },
            ]);
        } finally {
            setChatLoading(false);
        }
    };

    const cleanRecommendation = (text) => {
        if (!text) return "";
        return text
            .replace(/^#{1,6}\s*/gm, "")
            .replace(/\*\*/g, "")
            .replace(/^---$/gm, "")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    };

    const handleReassess = async () => {
        if (reassessing) return;
        setReassessing(true);
        setAiRecommendation("");
        try {
            const userId = localStorage.getItem("userId");
            const result = await reassessLearningPath(userId);
            setAiRecommendation(cleanRecommendation(result.recommendation || "No new recommendation was generated."));
        } catch (error) {
            console.error("AI reassessment error:", error);
            setAiRecommendation("Unable to reassess your learning path right now. Please try again.");
        } finally {
            setReassessing(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem("userId");
            localStorage.removeItem("learnerProfile");
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-400">
                    <Loader2 className="animate-spin" size={20} />
                    Loading your learning dashboard...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-400 mb-4">
                        Unable to load your profile.
                    </p>
                    <button
                        onClick={() => { window.location.href = "/onboarding" }}
                        className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950"
                    >
                        Start Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950">
                            <Sparkles size={18} />
                        </div>
                        <span className="font-semibold">
                            Personalized Learning AI
                        </span>
                    </div>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setProfileMenuOpen((prev) => !prev)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-900"
                        >
                            <div className="hidden sm:block">
                                <p className="text-xs text-slate-500">
                                    {user.email}
                                </p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-slate-500 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        window.location.href = "/profile";
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                                >
                                    <User size={16} />
                                    View Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 border-t border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-10">
                <section className="mb-10">
                    <p className="text-sm text-slate-500">
                        Your learning dashboard
                    </p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight">
                        Welcome back, {user.name}
                    </h1>
                    <p className="mt-3 max-w-3xl text-slate-400">
                        Your personalized learning journey is designed around your goals, experience, skills and available time.
                    </p>
                </section>
                <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                            <Target size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">
                                Your goal
                            </p>
                            <p className="mt-2 text-lg leading-relaxed">
                                {user.goal}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="grid gap-4 md:grid-cols-4 mb-10">
                    <StatCard
                        icon={<Target size={20} />}
                        label="Experience"
                        value={user.experienceLevel}
                    />
                    <StatCard
                        icon={<BookOpen size={20} />}
                        label="Skills"
                        value={user.skills?.length || 0}
                    />
                    <StatCard
                        icon={<Clock size={20} />}
                        label="Weekly commitment"
                        value={`${user.weeklyHours} hrs`}
                    />
                    <StatCard
                        icon={<CheckCircle2 size={20} />}
                        label="Progress"
                        value={`${overallProgress}%`}
                    />
                </section>
                <section className="mb-10">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold">
                            Your current skills
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Skills you've already told us you know.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {user.skills?.length > 0 ? (
                            user.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-slate-500">
                                No skills added yet.
                            </p>
                        )}
                    </div>
                </section>
                <section className="mb-10">
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Your Learning Path
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Your AI-generated roadmap and learning modules.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "/roadmap";
                            }}
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                        >
                            View Full Roadmap
                            <ArrowRight size={16} />
                        </button>
                    </div>
                    {learningPath ? (
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Current roadmap
                                    </p>
                                    <h3 className="mt-1 text-xl font-semibold">
                                        {learningPath.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {learningPath.description}
                                    </p>
                                </div>
                                <div className="shrink-0 sm:text-right">
                                    <p className="text-sm text-slate-500">
                                        Progress
                                    </p>
                                    <p className="mt-1 text-2xl font-bold">
                                        {overallProgress}%
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        {completedModules} / {totalModules} modules
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-white transition-all"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-8 text-center">
                            <p className="text-slate-500">
                                No learning path found.
                            </p>
                        </div>
                    )}
                </section>
                <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-950">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Adaptive Learning
                                </h2>
                                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
                                    Let AI reassess your learning path using your current progress and feedback.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleReassess}
                            disabled={reassessing}
                            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {reassessing ? (
                                <>
                                    <Loader2 size={17} className="animate-spin" />
                                    Reassessing...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={17} />
                                    Reassess My Path
                                </>
                            )}
                        </button>
                    </div>
                    {aiRecommendation && (
                        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <Sparkles size={16}
                                    className="text-slate-400"
                                />
                                <span className="text-sm font-semibold text-white">
                                    AI Recommendation
                                </span>
                            </div>
                            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                <div className="text-sm leading-7 text-slate-300 whitespace-pre-line">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="mb-4 text-xl font-bold text-white">
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="mb-3 mt-6 text-lg font-semibold text-white">
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="mb-3 mt-5 text-base font-semibold text-white">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="mb-4">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="mb-4 ml-5 list-disc space-y-2">
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className="mb-4 ml-5 list-decimal space-y-2">
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children }) => (
                                                <li>{children}</li>
                                            ),
                                            strong: ({ children }) => (
                                                <strong className="font-semibold text-white">
                                                    {children}
                                                </strong>
                                            ),
                                            hr: () => (
                                                <hr className="my-6 border-slate-800" />
                                            ),
                                        }}
                                    >
                                        {aiRecommendation}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
                <div className="fixed bottom-6 right-6 z-50">
                    {chatOpen && (
                        <div className="mb-4 flex h-500px w-360px flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950">
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold flex gap-2">
                                            Learning Assistant <Bot/>
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            AI-powered guidance
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setChatOpen(false)}
                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                                {chatMessages.map((chat, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${ chat.role === "user" ? "justify-end" : "justify-start" }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${chat.role === "user" ? "bg-white text-slate-950" : "bg-slate-900 text-slate-300" }`}>
                                            {chat.text}
                                        </div>
                                    </div>
                                ))}
                                {chatLoading && (
                                    <div className="flex justify-start">
                                        <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={15}
                                                    className="animate-spin"
                                                />
                                                Thinking...
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="border-t border-slate-800 p-3">
                                <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSendMessage();
                                            }
                                        }}
                                        placeholder="Ask your learning assistant..."
                                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950 transition hover:bg-slate-200"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {!chatOpen && (
                        <button
                            onClick={() => setChatOpen(true)}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-950 shadow-xl transition hover:scale-105 hover:bg-slate-200"
                        >
                            <MessageCircle size={24} />
                        </button>
                    )}
                </div>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between">
                <div className="text-slate-400">
                    {icon}
                </div>
                <ArrowRight size={16}
                    className="text-slate-700"
                />
            </div>
            <p className="mt-5 text-sm text-slate-500">
                {label}
            </p>
            <p className="mt-1 text-2xl font-bold">
                {value}
            </p>
            
        </div>
    );
}

export default Dashboard;