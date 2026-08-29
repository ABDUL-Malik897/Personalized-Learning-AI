import { useEffect, useState } from "react";
import { User, Mail, Target, Brain, BookOpen, Heart, Clock, Pencil, Save, Loader2, ArrowLeft, X, } from "lucide-react";
import { getUser, updateUser } from "../services/api";
import { toast } from "react-toastify";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [skillInput, setSkillInput] = useState("");
    const [interestInput, setInterestInput] = useState("");
    const [form, setForm] = useState({
        goal: "",
        experienceLevel: "",
        skills: [],
        interests: [],
        learningPreference: "Mixed",
        weeklyHours: 5,
        completedCourses: [],
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    window.location.href = "/login";
                    return;
                }
                const result = await getUser(userId);
                setUser(result.user);
                setForm({
                    goal: result.user.goal || "",
                    experienceLevel: result.user.experienceLevel || "Beginner",
                    skills: result.user.skills || [],
                    interests: result.user.interests || [],
                    completedCourses: result.user.completedCourses || [],
                    learningPreference: result.user.learningPreference || "Mixed",
                    weeklyHours: result.user.weeklyHours || 5,
                });
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addSkill = () => {
        const skill = skillInput.trim();
        if (!skill) return;
        const alreadyExists = form.skills.some((item) => item.toLowerCase() === skill.toLowerCase());
        if (!alreadyExists) {
            setForm((prev) => ({
                ...prev,
                skills: [...prev.skills, skill],
            }));
        }
        setSkillInput("");
    };

    const removeSkill = (skillToRemove) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.filter(
                (skill) => skill !== skillToRemove
            ),
        }));
    };

    const addInterest = () => {
        const interest = interestInput.trim();
        if (!interest) return;
        const alreadyExists = form.interests.some((item) => item.toLowerCase() === interest.toLowerCase());
        if (!alreadyExists) {
            setForm((prev) => ({
                ...prev,
                interests: [...prev.interests, interest],
            }));
        }
        setInterestInput("");
    };

    const removeInterest = (interestToRemove) => {
        setForm((prev) => ({
            ...prev,
            interests: prev.interests.filter((interest) => interest !== interestToRemove),
        }));
    };

    const handleEdit = () => {
        setSkillInput("");
        setInterestInput("");
        setEditing(true);
    };

    const handleCancelEdit = () => {
        if (!user) return;
        setForm({
            goal: user.goal || "",
            experienceLevel: user.experienceLevel || "Beginner",
            skills: user.skills || [],
            interests: user.interests || [],
            completedCourses: user.completedCourses || [],
            learningPreference: user.learningPreference || "Mixed",
            weeklyHours: user.weeklyHours || 5,
        });
        setSkillInput("");
        setInterestInput("");
        setEditing(false);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("User not found.");
            }
            const result = await updateUser(userId, {
                goal: form.goal,
                experienceLevel: form.experienceLevel,
                skills: form.skills,
                interests: form.interests,
                completedCourses: form.completedCourses,
                learningPreference: form.learningPreference,
                weeklyHours: form.weeklyHours,
            });
            setUser(result.user);
            setForm({
                goal: result.user.goal || "",
                experienceLevel: result.user.experienceLevel || "Beginner",
                skills: result.user.skills || [],
                interests: result.user.interests || [],
                completedCourses: result.user.completedCourses || [],
                learningPreference: result.user.learningPreference || "Mixed",
                weeklyHours: result.user.weeklyHours || 5,
            });
            localStorage.setItem("learnerProfile", JSON.stringify(result.user));
            setSkillInput("");
            setInterestInput("");
            setEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error(error.response?.data?.message || error.message || "Unable to update your profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 size={20}
                        className="animate-spin"
                    />
                    Loading profile...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
                <div className="text-center">
                    <p className="text-slate-400">
                        Unable to load your profile.
                    </p>
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/")}
                        className="mt-5 rounded-xl bg-white px-5 py-3 font-medium text-slate-950"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <button
                            type="button"
                            onClick={() => (window.location.href = "/dashboard")}
                            className="mb-5 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </button>
                        <p className="text-sm text-slate-500">
                            Your account
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight">
                            Profile
                        </h1>
                        <p className="mt-3 max-w-2xl text-slate-400">
                            Manage the learner information used to personalize your experience.
                        </p>
                    </div>
                    {!editing ? (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                        >
                            <Pencil size={16} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={saving}
                                className="flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 disabled:opacity-50"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
                <section className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                            <User size={19} />
                        </div>
                        <div>
                            <h2 className="font-semibold">
                                Google account
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Your identity is linked to Google.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                                <User size={14} />
                                Name
                            </div>
                            <p className="text-sm font-medium text-slate-200">
                                {user.name || "Not available"}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                                <Mail size={14} />
                                Email
                            </div>
                            <p className="break-all text-sm font-medium text-slate-200">
                                {user.email || "Not available"}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold">
                            Learning profile
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            This information is used by the AI to personalize your learning path.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
                                <Target size={16} />
                                Goal
                            </div>
                            {editing ? (
                                <textarea
                                    value={form.goal}
                                    onChange={(e) => handleChange("goal",e.target.value)}
                                    placeholder="Describe what you want to achieve..."
                                    className="min-h-32 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-600"
                                />
                            ) : (
                                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                                    <p className="text-sm leading-6 text-slate-300">
                                        {user.goal || "No goal specified."}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
                                <Brain size={16} />
                                Experience level
                            </div>
                            {editing ? (
                                <select
                                    value={form.experienceLevel}
                                    onChange={(e) => handleChange("experienceLevel", e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-slate-600"
                                >
                                    <option value="Beginner">
                                        Beginner
                                    </option>
                                    <option value="Intermediate">
                                        Intermediate
                                    </option>
                                    <option value="Advanced">
                                        Advanced
                                    </option>
                                </select>
                            ) : (
                                <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                                    {user.experienceLevel || "Beginner"}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
                                <BookOpen size={16} />
                                Skills
                            </div>
                            {editing && (
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addSkill();
                                            }
                                        }}
                                        placeholder="e.g. JavaScript"
                                        className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-slate-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={addSkill}
                                        className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                                    >
                                        Add Skill
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {form.skills.length > 0 ? (
                                    form.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300"
                                        >
                                            {skill}
                                            {editing && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill)}
                                                    className="text-slate-500 transition hover:text-white"
                                                    aria-label={`Remove ${skill}`}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-slate-500">
                                        No skills added.
                                    </span>
                                )}
                            </div>
                        </div>
                        <section className="mt-8">
                            <h2 className="text-xl font-semibold">
                                Completed Learning
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Courses, tutorials, certifications, and topics you've already studied.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {user.completedCourses?.length > 0 ? (
                                    user.completedCourses.map((course) => (
                                        <span
                                            key={course}
                                            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                                        >
                                            {course}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No previous learning added yet.
                                    </p>
                                )}
                            </div>
                        </section>
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
                                <Heart size={16} />
                                Interests
                            </div>
                            {editing && (
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="text"
                                        value={interestInput}
                                        onChange={(e) => setInterestInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addInterest();
                                            }
                                        }}
                                        placeholder="e.g. AI, SaaS, startups"
                                        className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-slate-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={addInterest}
                                        className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                                    >
                                        Add Interest
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {form.interests.length > 0 ? (
                                    form.interests.map((interest) => (
                                        <span
                                            key={interest}
                                            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300"
                                        >
                                            {interest}
                                            {editing && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeInterest(interest)}
                                                        className="text-slate-500 transition hover:text-white"
                                                        aria-label={`Remove ${interest}`}
                                                    >
                                                        ×
                                                </button>
                                            )}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-slate-500">
                                        No interests added.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
                                <BookOpen size={16} />
                                Learning preference
                            </div>
                            {editing ? (
                                <select
                                    value={form.learningPreference}
                                    onChange={(e) => handleChange("learningPreference", e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-slate-600"
                                >
                                    <option value="Video">
                                        Video
                                    </option>
                                    <option value="Reading">
                                        Reading
                                    </option>
                                    <option value="Project Based">
                                        Project Based
                                    </option>
                                    <option value="Mixed">
                                        Mixed
                                    </option>
                                </select>
                            ) : (
                                <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                                    {user.learningPreference || "Mixed"}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">
                                <Clock size={16} />
                                Weekly commitment
                            </div>
                            {editing ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                                    <div className="mb-4 flex items-end justify-between">
                                        <div>
                                            <p className="text-3xl font-bold">
                                                {form.weeklyHours}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                hours per week
                                            </p>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            1–40 hours
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="40"
                                        value={form.weeklyHours}
                                        onChange={(e) => handleChange("weeklyHours", Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                                    {user.weeklyHours || 5}{" "}
                                    hours/week
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;