import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight, BookOpen, Brain, Sparkles, Target, Loader2 } from "lucide-react";
import { signInWithGoogle } from "../services/auth";

function Landing() {

    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const result = await signInWithGoogle();
            const userId = result.user?._id;
            if (!userId) {
                throw new Error("Your account could not be identified.");
            }
            localStorage.setItem("userId", userId);
            if (result.user) {
                localStorage.setItem("learnerProfile", JSON.stringify(result.user));
            }
            if (result.isNewUser) {
                window.location.href = "/onboarding";
            } else {
                window.location.href = "/dashboard";
            }
        } catch (error) {
            console.error("Google authentication failed:", error);
            toast.error(error.message || "Unable to continue with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950">
                            <Sparkles size={18} />
                        </div>
                        <span className="font-semibold">
                            Personalized Learning AI
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="hidden rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white sm:block disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Connecting..." : "Continue with Google"}
                    </button>
                </div>
            </nav>
            <main>
                <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-400">
                            <Sparkles size={15} />
                            AI-powered personalized learning
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                            Learn what you need.
                            <span className="block text-slate-400">
                                Build what you want.
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                            Tell us your goals, experience, skills, interests, and available time. Our AI builds a learning path specifically for you.
                        </p>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="mx-auto mt-8 flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    Continue with Google
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                        <p className="mt-4 text-xs text-slate-600">
                            New here? We'll guide you through a short onboarding.
                        </p>
                    </div>
                </section>
                <section className="border-y border-slate-900 bg-slate-950/60">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm uppercase tracking-wider text-slate-500">
                                How it works
                            </p>
                            <h2 className="mt-3 text-3xl font-bold">
                                Your learning path adapts to you.
                            </h2>
                            <p className="mt-3 text-slate-500">
                                Start with your current level and let AI build the journey from there.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-5 md:grid-cols-3">
                            <FeatureCard
                                icon={<Target size={20} />}
                                title="Tell us your goal"
                                description="Share what you want to become and what you want to build."
                            />
                            <FeatureCard
                                icon={<Brain size={20} />}
                                title="AI builds your path"
                                description="Your profile is used to identify gaps and create personalized modules."
                            />
                            <FeatureCard
                                icon={<BookOpen size={20} />}
                                title="Learn and adapt"
                                description="Track progress, get AI guidance, and reassess your roadmap as you improve."
                            />
                        </div>
                    </div>
                </section>
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/50 p-8 text-center md:p-12">
                        <Sparkles size={28}
                            className="mx-auto text-slate-400"
                        />
                        <h2 className="mt-5 text-3xl font-bold">
                            Build your personalized learning path.
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-slate-500">
                            Start with your Google account and we'll take care of the rest.
                        </p>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="mx-auto mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200 disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={17} className="animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    Start Learning
                                    <ArrowRight size={17} />
                                </>
                            )}
                        </button>
                    </div>
                </section>
            </main>
            <footer className="border-t border-slate-900 px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        Personalized Learning AI
                    </span>
                    <span>
                        Learn at your pace. Build your future.
                    </span>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300">
                {icon}
            </div>
            <h3 className="mt-5 text-lg font-semibold">
                {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default Landing;