import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { updateUser, generateLearningPath } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Clock, Target, Brain, BookOpen, } from "lucide-react";
import { toast } from "react-toastify";

const steps = [
    {
        id: 1,
        title: "What's your goal?",
        subtitle: "Tell us what you want to achieve.",
        icon: Target,
    },
    {
        id: 2,
        title: "What's your experience?",
        subtitle: "This helps us set the right difficulty.",
        icon: Brain,
    },
    {
        id: 3,
        title: "What do you already know?",
        subtitle: "Add the skills you've already developed.",
        icon: BookOpen,
    },
    {
        id: 4,
        title: "How do you like to learn?",
        subtitle: "We'll adapt your path to your preferences.",
        icon: Sparkles,
    },
    {
        id: 5,
        title: "How much time can you commit?",
        subtitle: "We'll build a realistic schedule.",
        icon: Clock,
    },
];

function Onboarding() {

    const [currentStep, setCurrentStep] = useState(1);
    const [courseInput, setCourseInput] = useState("");
    const [profile, setProfile] = useState({
        goal: "",
        experienceLevel: "",
        skills: [],
        interests: [],
        completedCourses: [],
        learningPreference: "Mixed",
        weeklyHours: 5,
    });
    const [skillInput, setSkillInput] = useState("");
    const [interestInput, setInterestInput] = useState("");

    const updateProfile = (field, value) => {
        setProfile((prev) => ({
        ...prev,
        [field]: value,
        }));
    };
    

    const addSkill = () => {
        const skill = skillInput.trim();
        if (!skill) return;
        if (!profile.skills.includes(skill)) {
        updateProfile("skills", [...profile.skills, skill]);
        }
        setSkillInput("");
    };

    const removeSkill = (skillToRemove) => {
        updateProfile("skills", profile.skills.filter((skill) => skill !== skillToRemove));
    };

    const addInterest = () => {
        const interest = interestInput.trim();
        if (!interest) return;
        if (!profile.interests.includes(interest)) {
        updateProfile("interests", [...profile.interests, interest]);
        }
        setInterestInput("");
    };

    const removeInterest = (interestToRemove) => {
        updateProfile("interests", profile.interests.filter((interest) => interest !== interestToRemove));
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
        }
    };

    const generatePath = async () => {
        if (!profile.goal.trim()) {
            toast.warning("Please describe your learning goal.");
            return;
        }
        if (!profile.experienceLevel) {
            toast.warning("Please select your experience level.");
            return;
        }
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("Your Google account could not be identified. Please sign in again.");
            }
            const userResult = await updateUser(userId, {
                ...profile,
                onboardingCompleted: true,
            });
            if (userResult.user) {
                localStorage.setItem("learnerProfile", JSON.stringify(userResult.user));
            }
            await generateLearningPath(userId);
            toast.info("Your personalized learning path is ready!");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Profile / learning path generation failed:", error);
            const message = error.response?.data?.message || error.message || "Unable to generate your learning path.";
            toast.error(message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = "/login";
                return;
            }
            setProfile((prev) => ({
                ...prev,
                name: user.displayName || "",
                email: user.email || "",
            }));
        });
        return () => unsubscribe();
    }, []);

    const addCompletedCourse = () => {
        const course = courseInput.trim();
        if (!course) return;
        if (!profile.completedCourses.includes(course)) {
            updateProfile("completedCourses", [...profile.completedCourses, course]);
        }
        setCourseInput("");
    };

    const removeCompletedCourse = (courseToRemove) => {
        updateProfile("completedCourses", profile.completedCourses.filter((course) => course !== courseToRemove));
    };

    const current = steps[currentStep - 1];
    const Icon = current.icon;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
                <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950">
                    <Sparkles size={18} />
                    </div>
                    <span className="font-semibold">
                    Personalized Learning AI
                    </span>
                </div>
                <span className="text-sm text-slate-400">
                    Step {currentStep} of {steps.length}
                </span>
                </div>
                <div className="mb-12 h-1 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{
                    width: `${(currentStep / steps.length) * 100}%`,
                    }}
                />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-3xl">
                        <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                            <Icon size={26} />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                            {current.title}
                            </h1>
                            <p className="mt-3 text-lg text-slate-400">
                            {current.subtitle}
                            </p>
                            {currentStep === 1 && (
                            <div className="mt-10">
                                <div className="mb-5 grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        value={profile.name}
                                        readOnly
                                        placeholder="Your name"
                                        className="rounded-xl cursor-not-allowed border border-slate-800 bg-slate-900 px-4 py-3 outline-none focus:border-slate-500"
                                    />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        readOnly
                                        placeholder="Your email"
                                        className="rounded-xl cursor-not-allowed border border-slate-800 bg-slate-900 px-4 py-3 outline-none focus:border-slate-500"
                                    />
                                    </div>
                                <textarea
                                value={profile.goal}
                                onChange={(e) => updateProfile("goal", e.target.value)}
                                placeholder="Example: I want to become a full-stack developer and build scalable SaaS applications."
                                className="min-h-44 w-full resize-none rounded-2xl border border-slate-800 bg-slate-900 p-5 text-lg outline-none transition focus:border-slate-500"
                                />
                                <p className="mt-3 text-sm text-slate-500">
                                Don't worry about writing the perfect answer. Just tell us what you're aiming for.
                                </p>
                            </div>
                            )}
                            {currentStep === 2 && (
                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                    <button
                                    key={level}
                                    onClick={() => updateProfile("experienceLevel", level)}
                                    className={`rounded-2xl border p-6 text-left transition ${ profile.experienceLevel === level ? "border-white bg-white text-slate-950" : "border-slate-800 bg-slate-900 hover:border-slate-600" }`}
                                    >
                                        <div className="text-lg font-semibold">
                                            {level}
                                        </div>
                                        <div className="mt-2 text-sm opacity-60">
                                            {level === "Beginner" &&
                                            "I'm just getting started."}
                                            {level === "Intermediate" &&
                                            "I know the fundamentals."}
                                            {level === "Advanced" &&
                                            "I have strong experience."}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            )}
                            {currentStep === 3 && (
                                <div className="mt-10">
                                    <div className="flex gap-3">
                                    <input
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addSkill();
                                        }}}
                                        placeholder="e.g. JavaScript"
                                        className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 outline-none focus:border-slate-500"
                                    />
                                    <button
                                        onClick={addSkill}
                                        className="rounded-xl bg-white px-5 font-medium text-slate-950"
                                    >
                                        Add
                                    </button>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                    {profile.skills.map((skill) => (
                                        <button
                                        key={skill}
                                        onClick={() => removeSkill(skill)}
                                        className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                        >
                                        {skill} ×
                                        </button>
                                    ))}
                                    </div>
                                    <p className="mt-8 text-sm text-slate-500">
                                    Add technologies, subjects, or skills you've already learned.
                                    </p>
                                </div>
                            )}
                            {currentStep === 4 && (
                                <div className="mt-10">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                    {["Video", "Reading", "Project Based", "Mixed"].map((preference) => (
                                        <button
                                            key={preference}
                                            onClick={() => updateProfile("learningPreference", preference)}
                                            className={`rounded-2xl border p-6 text-left transition ${ profile.learningPreference === preference ? "border-white bg-white text-slate-950" : "border-slate-800 bg-slate-900 hover:border-slate-600" }`}
                                        >
                                        <div className="text-lg font-semibold">
                                            {preference}
                                        </div>
                                        <div className="mt-2 text-sm opacity-60">
                                            {preference === "Video" &&
                                            "I learn best by watching."}
                                            {preference === "Reading" &&
                                            "I prefer documentation and articles."}
                                            {preference === "Project Based" &&
                                            "I learn by building things."}
                                            {preference === "Mixed" &&
                                            "Give me a combination."}
                                        </div>
                                        </button>
                                    ))}
                                    </div>
                                    <div className="mt-10">
                                        <p className="mb-3 font-medium">
                                            Interests
                                        </p>
                                        <div className="flex gap-3">
                                            <input
                                                value={interestInput}
                                                onChange={(e) => setInterestInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addInterest();
                                                }}}
                                                placeholder="e.g. AI, startups, web development"
                                                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 outline-none focus:border-slate-500"
                                            />
                                            <button
                                                onClick={addInterest}
                                                className="rounded-xl bg-white px-5 font-medium text-slate-950"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {profile.interests.map((interest) => (
                                            <button
                                                key={interest}
                                                onClick={() =>
                                                removeInterest(interest)
                                                }
                                                className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                            >
                                                {interest} ×
                                            </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Courses or learning you've already completed
                                        </label>
                                        <p className="mb-3 text-xs text-slate-500">
                                            Add courses, certifications, tutorials, or major topics you have already studied. This helps AI avoid teaching you the same material again.
                                        </p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={courseInput}
                                                onChange={(e) => setCourseInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        addCompletedCourse();
                                                    }
                                                }}
                                                placeholder="e.g. Java Fundamentals"
                                                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={addCompletedCourse}
                                                className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {profile.completedCourses.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {profile.completedCourses.map((course) => (
                                                    <button
                                                        key={course}
                                                        type="button"
                                                        onClick={() => removeCompletedCourse(course)}
                                                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:border-red-500/40 hover:text-red-300"
                                                        >
                                                            {course} ×
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {currentStep === 5 && (
                                <div className="mt-10">
                                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                                        <div className="flex items-end justify-between">
                                            <div>
                                            <p className="text-sm text-slate-400">
                                                Weekly commitment
                                            </p>
                                            <p className="mt-2 text-5xl font-bold">
                                                {profile.weeklyHours}
                                                <span className="ml-2 text-xl text-slate-500">
                                                hours
                                                </span>
                                            </p>
                                            </div>
                                            <Clock className="text-slate-500" />
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="40"
                                            value={profile.weeklyHours}
                                            onChange={(e) => updateProfile("weeklyHours", Number(e.target.value))}
                                            className="mt-10 w-full"
                                        />
                                        <div className="mt-3 flex justify-between text-xs text-slate-500">
                                            <span>1 hr</span>
                                            <span>20 hrs</span>
                                            <span>40 hrs</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 rounded-2xl border border-slate-800 p-6">
                                        <p className="text-sm text-slate-400">
                                            Your goal
                                        </p>
                                        <p className="mt-2">
                                            {profile.goal || "Not specified"}
                                        </p>
                                        <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Experience
                                                </p>
                                                <p className="mt-1">
                                                    {profile.experienceLevel || "Not specified"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Skills
                                                </p>
                                                <p className="mt-1">
                                                    {profile.skills.length || 0}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Learning style
                                                </p>
                                                <p className="mt-1">
                                                    {profile.learningPreference}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="mt-12 flex items-center justify-between">
                <button
                    onClick={previousStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-slate-400 transition hover:text-white disabled:invisible"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
                {currentStep < steps.length ? (
                    <button
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                    Continue
                    <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                    onClick={generatePath}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                    Generate My Learning Path
                    <Sparkles size={18} />
                    </button>
                )}
                </div>
            </div>
        </div>
    );
}

export default Onboarding;