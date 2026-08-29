import { useState } from "react";
import { signInWithGoogle } from "../services/auth";
import { toast } from "react-toastify";

function Login() {

    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithGoogle();
            const userId = result.user?._id;
            if (!userId) {
                throw new Error("User ID was not returned by the server.");
            }
            localStorage.setItem("userId", userId);
            if (result.user) {
                localStorage.setItem("learnerProfile",  JSON.stringify(result.user));
            }
            if (result.isNewUser) {
                window.location.href = "/onboarding";
            } else {
                window.location.href = "/dashboard";
            }
        } catch (error) {
            console.error("Google login failed:", error);
            toast.error(error.message || "Unable to sign in with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Sign in with Google to continue your personalized learning journey.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Signing in..." : "Continue with Google"}
                </button>
            </div>
        </div>
    );
}

export default Login;