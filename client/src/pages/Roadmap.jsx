import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Target, Sparkles, ChevronDown, Loader2, ListChecks, Code2 } from "lucide-react";

import { getLearningPath, getUserProgress, createProgress, updateProgress } from "../services/api";
import { toast } from "react-toastify";

function Roadmap() {
    const navigate = useNavigate();

    const [learningPath, setLearningPath] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedModule, setExpandedModule] = useState(null);
    const [activeLearningModule, setActiveLearningModule] = useState(null);
    const [assessmentAnswers, setAssessmentAnswers] = useState({});
    const [assessmentResults, setAssessmentResults] = useState({});
    const [assessmentSubmitting, setAssessmentSubmitting] = useState(false);

    useEffect(() => {
        const loadRoadmap = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    navigate("/login");
                    return;
                }
                const [pathResult, progressResult] = await Promise.all([
                    getLearningPath(userId),
                    getUserProgress(userId),
                ]);
                if (pathResult.paths && pathResult.paths.length > 0) {
                    setLearningPath(pathResult.paths[0]);
                }
                setProgress(progressResult.progress || []);
            } catch (error) {
                console.error("Failed to load roadmap:", error);
            } finally {
                setLoading(false);
            }
        };
        loadRoadmap();
    }, [navigate]);

    const isModuleCompleted = (moduleId) => {
        return progress.some((item) => item.moduleId === moduleId && item.completed);
    };

    const handleCompleteModule = async (module) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId || !learningPath) return;
            const existingProgress = progress.find((item) => item.moduleId === module._id);
            if (existingProgress) {
                await updateProgress(existingProgress._id, {
                    completed: true,
                    completedAt: new Date(),
                });
                setProgress((prev) => prev.map((item) => item._id === existingProgress._id
                    ? {
                        ...item,
                        completed: true,
                        completedAt: new Date(),
                    }
                    : item
                ));
                return;
            }
            const result = await createProgress({
                user: userId,
                learningPath: learningPath._id,
                moduleId: module._id,
                completed: true,
                completedAt: new Date(),
            });
            setProgress((prev) => [
                ...prev,
                result.progress,
            ]);
        } catch (error) {
            console.error("Failed to update module progress:", error);
        }
    };

    const toggleTask = async (module) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId || !learningPath) return;
            const existingProgress = progress.find((item) => item.moduleId === module._id);
            if (existingProgress) {
                const newTaskCompleted = !existingProgress.taskCompleted;
                const result = await updateProgress(existingProgress._id,
                    {
                        taskCompleted: newTaskCompleted,
                        taskCompletedAt: newTaskCompleted ? new Date() : null,
                    }
                );
                setProgress((prev) => prev.map((item) => item._id === existingProgress._id ? result.progress : item));
                return;
            }
            const result = await createProgress({
                user: userId,
                learningPath: learningPath._id,
                moduleId: module._id,
                completed: false,
                completedAt: null,
                taskCompleted: true,
                taskCompletedAt: new Date(),
            });
            setProgress((prev) => [
                ...prev,
                result.progress,
            ]);
        } catch (error) {
            console.error("Failed to update task progress:", error);
        }
    };

    const handleAssessmentAnswer = (moduleId, questionIndex, answerIndex) => {
        setAssessmentAnswers((prev) => ({
            ...prev,
            [moduleId]: {
                ...(prev[moduleId] || {}),
                [questionIndex]: answerIndex,
            },
        }));
    };

    const handleAssessmentSubmit = async (module) => {
        const assessment = module.assessment;
        if (!assessment?.questions?.length) {
            return;
        }
        const answers = assessmentAnswers[module._id] || {};
        const unanswered = assessment.questions.some((_, index) => answers[index] === undefined);
        if (unanswered) {
            toast.warning("Please answer every question before submitting.");
            return;
        }
        try {
            setAssessmentSubmitting(true);
            let correct = 0;
            assessment.questions.forEach((question, index) => {
                    if (Number(answers[index]) === Number(question.correctAnswer)) {
                        correct++
                    }
                }
            );
            const score = Math.round((correct / assessment.questions.length) * 100);
            setAssessmentResults((prev) => ({
                ...prev,
                [module._id]: {
                    score,
                    correct,
                    total: assessment.questions.length,
                },
            }));
            const userId = localStorage.getItem("userId");
            if (!userId || !learningPath) {
                throw new Error("User session not found.");
            }

            const existingProgress = progress.find(
                (item) =>
                    item.moduleId === module._id
            );

            if (existingProgress) {
                const updated = await updateProgress(existingProgress._id,
                    {
                        score,
                    }
                );
                setProgress((prev) => prev.map((item) => item._id === existingProgress._id
                    ? {
                        ...item,
                        score,
                    }
                    : item
                ));
                return updated;
            }
            const result = await createProgress({
                user: userId,
                learningPath: learningPath._id,
                moduleId: module._id,
                completed: false,
                score,
            });

            setProgress((prev) => [
                ...prev,
                result.progress,
            ]);
        } catch (error) {
            console.error("Assessment submission failed:", error);
            toast.error(error.response?.data?.message || "Unable to save assessment result.");
        } finally {
            setAssessmentSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <div className="flex items-center gap-3 text-slate-400">
                    <Loader2 size={20}
                        className="animate-spin"
                    />
                    Loading your personalized roadmap...
                </div>
            </div>
        );
    }

    if (!learningPath) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
                <div className="text-center">
                    <Sparkles size={34}
                        className="mx-auto mb-4 text-slate-500"
                    />
                    <h1 className="text-2xl font-bold">
                        No learning path found
                    </h1>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Complete your onboarding to generate your personalized AI learning path.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/onboarding")}
                        className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                    >
                        Complete Onboarding
                    </button>
                </div>
            </div>
        );
    }

    const totalModules = learningPath.modules?.length || 0;
    const completedModules = learningPath.modules?.filter((module) => isModuleCompleted(module._id)).length || 0;
    const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <main className="mx-auto max-w-7xl px-6 py-10">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </button>

                <section className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                        Your personalized roadmap
                    </p>
                    <h1 className="mt-3 max-w-5xl text-4xl font-bold tracking-tight md:text-5xl">
                        {learningPath.title}
                    </h1>
                    <p className="mt-4 max-w-4xl text-base leading-7 text-slate-400">
                        {learningPath.description}
                    </p>
                </section>

                <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Overall progress
                            </p>
                            <p className="mt-1 text-3xl font-bold">
                                {overallProgress}%
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-sm text-slate-500">
                                Modules completed
                            </p>
                            <p className="mt-1 text-lg font-semibold">
                                {completedModules} /{" "}
                                {totalModules}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-full rounded-full bg-white transition-all"
                            style={{
                                width: `${overallProgress}%`,
                            }}
                        />
                    </div>
                </section>

                {learningPath.skillGaps?.length > 0 && (
                    <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <Target size={19} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Skills to develop
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Areas identified by AI based on your profile.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {learningPath.skillGaps.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">
                            Your Learning Path
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Work through each module and track your progress as you learn.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {learningPath.modules?.map((module, index) => {
                            const expanded = expandedModule === module._id;
                            const completed = isModuleCompleted(module._id);
                            const taskCompleted = progress.some((item) => item.moduleId === module._id && item.taskCompleted);

                                return (
                                    <div
                                        key={module._id || index}
                                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setExpandedModule(expanded ? null : module._id)}
                                            className="w-full p-6 text-left transition hover:bg-slate-900"
                                        >
                                            <div className="flex gap-5">
                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                                        completed ? "bg-emerald-400 text-slate-950" : "bg-white text-slate-950" }`}
                                                >
                                                    {completed ? (<CheckCircle2 size={20} />) : (index + 1)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                                                Module{" "}{index + 1}
                                                            </p>
                                                            <h3 className="mt-1 text-xl font-semibold">
                                                                {module.title}
                                                            </h3>
                                                        </div>
                                                        <div className="flex shrink-0 items-center gap-3">
                                                            <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
                                                                <Clock size={16} />
                                                                {module.estimatedHours}{" "} hrs
                                                            </div>
                                                            <ChevronDown size={20}
                                                                className={`text-slate-500 transition-transform ${expanded ? "rotate-180" : "" }`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 max-w-4xl leading-6 text-slate-400">
                                                        {module.description}
                                                    </p>
                                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                                        <span className="flex items-center gap-2 text-sm text-slate-500 sm:hidden">
                                                            <Clock size={15} />
                                                            {module.estimatedHours}{" "} hrs
                                                        </span>
                                                        {completed ? (
                                                            <span className="flex items-center gap-2 text-sm text-emerald-400">
                                                                <CheckCircle2 size={15} />
                                                                Completed
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm text-slate-500">
                                                                Click to start learning →
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>

                                        {expanded && (
                                            <div className="border-t border-slate-800 px-6 pb-6">
                                                <div className="space-y-7 pt-6 sm:ml-16">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Target size={18}
                                                                className="text-slate-500"
                                                            />
                                                            <h4 className="font-semibold">
                                                                Learning objectives
                                                            </h4>
                                                        </div>
                                                        {activeLearningModule === module._id && (
                                                            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
                                                                <div className="mb-7">
                                                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                                                        Current Lesson
                                                                    </p>
                                                                    <h4 className="mt-2 text-2xl font-semibold">
                                                                        {module.title}
                                                                    </h4>
                                                                    <p className="mt-3 text-sm leading-7 text-slate-400">
                                                                        {module.learningMaterial?.overview || module.description}
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-8">
                                                                    {module.learningMaterial?.concepts?.length > 0 && (
                                                                        <div>
                                                                            <h5 className="text-lg font-semibold">
                                                                                What you'll learn
                                                                            </h5>
                                                                            <div className="mt-5 space-y-5">
                                                                                {module.learningMaterial.concepts.map((concept, index) => (
                                                                                    <div
                                                                                        key={concept.title || index}
                                                                                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
                                                                                    >
                                                                                        <div className="flex items-start gap-3">
                                                                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-slate-950">
                                                                                                {index + 1}
                                                                                            </div>
                                                                                            <div>
                                                                                                <h6 className="font-semibold text-white">
                                                                                                    {concept.title}
                                                                                                </h6>
                                                                                                <p className="mt-2 text-sm leading-7 text-slate-400">
                                                                                                    {concept.explanation}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {module.learningMaterial?.example && (
                                                                        <div>
                                                                            <h5 className="text-lg font-semibold">
                                                                                Practical example
                                                                            </h5>
                                                                            <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-black/40 p-5 text-sm leading-7 text-slate-300">
                                                                                <code>
                                                                                    {module.learningMaterial.example}
                                                                                </code>
                                                                            </pre>
                                                                        </div>
                                                                    )}

                                                                    {module.learningMaterial?.keyTakeaways?.length > 0 && (
                                                                        <div>
                                                                            <h5 className="text-lg font-semibold">
                                                                                Key takeaways
                                                                            </h5>
                                                                            <div className="mt-4 space-y-3">
                                                                                {module.learningMaterial.keyTakeaways.map((takeaway, index) => (
                                                                                    <div
                                                                                        key={index}
                                                                                        className="flex items-start gap-3"
                                                                                    >
                                                                                        <CheckCircle2 size={17}
                                                                                        className="mt-0.5 shrink-0 text-slate-500"
                                                                                        />
                                                                                        <p className="text-sm leading-6 text-slate-300">
                                                                                            {takeaway}
                                                                                        </p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <div className="border-t border-slate-800 pt-7">
                                                                        <h5 className="text-lg font-semibold">
                                                                            Practice Task
                                                                        </h5>
                                                                        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                                                                            <p className="text-sm leading-7 text-slate-300">
                                                                                {module.practiceTask || "No practice task available yet."}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {module.assessment?.questions?.length > 0 && (
                                                            <div className="border-t border-slate-800 pt-7">
                                                                <div className="flex items-center gap-2">
                                                                    <ListChecks size={18}
                                                                        className="text-slate-500"
                                                                    />
                                                                    <h5 className="text-lg font-semibold">
                                                                        {module.assessment.title || "Module Assessment"}
                                                                    </h5>
                                                                </div>
                                                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                                                    Test your understanding of the concepts covered in this module.
                                                                </p>
                                                                <div className="mt-5 space-y-5">
                                                                    {module.assessment.questions.map((question, questionIndex) => {
                                                                        const selectedAnswer = assessmentAnswers[module._id]?.[questionIndex];
                                                                        const result = assessmentResults[module._id];
                                                                        const submitted = Boolean(result);
                                                                        return (
                                                                            <div
                                                                                key={questionIndex}
                                                                                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
                                                                            >
                                                                                <p className="font-medium leading-7 text-white">
                                                                                    {questionIndex + 1}.{" "}
                                                                                    {question.question}
                                                                                </p>
                                                                                <div className="mt-4 space-y-2">
                                                                                    {question.options.map((option, optionIndex) => {
                                                                                        const selected = Number(selectedAnswer) === optionIndex;
                                                                                        const correct = Number(question.correctAnswer) === optionIndex;
                                                                                        let className = "border-slate-800 bg-slate-900 hover:border-slate-600";
                                                                                        if (submitted && correct) {
                                                                                            className = "border-emerald-500/40 bg-emerald-500/10";
                                                                                        } else if (submitted && selected) {
                                                                                            className = "border-red-500/40 bg-red-500/10";
                                                                                        } else if (selected) {
                                                                                            className = "border-white bg-white/10";
                                                                                        }

                                                                                        return (
                                                                                            <button
                                                                                                key={optionIndex}
                                                                                                type="button"
                                                                                                disabled={submitted}
                                                                                                onClick={() => handleAssessmentAnswer(module._id,questionIndex,optionIndex)}
                                                                                                className={`w-full rounded-xl border p-4 text-left text-sm transition ${className}`}
                                                                                            >
                                                                                                <div className="flex gap-3">
                                                                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-700 text-xs">
                                                                                                        {String.fromCharCode(65 + optionIndex)}
                                                                                                    </span>
                                                                                                    <span className="leading-6 text-slate-300">
                                                                                                        {option}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </button>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                                {submitted && (
                                                                                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                                                        <p className="text-sm leading-6 text-slate-400">
                                                                                            {question.explanation}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                                {!assessmentResults[module._id] ? (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleAssessmentSubmit(module)}
                                                                        disabled={assessmentSubmitting}
                                                                        className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                                                                    >
                                                                        {assessmentSubmitting ? (
                                                                            <>
                                                                                <Loader2 size={17} className="animate-spin" />
                                                                                Submitting...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <ListChecks size={17} />
                                                                                Submit Assessment
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                ) : (
                                                                    <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                                                                        <p className="text-sm text-slate-500">
                                                                            Assessment Result
                                                                        </p>
                                                                        <p className="mt-2 text-3xl font-bold">
                                                                            {assessmentResults[module._id].score} %
                                                                        </p>
                                                                        <p className="mt-2 text-sm text-slate-400">
                                                                            {assessmentResults[module._id].correct}{" "} of{" "} {assessmentResults[module._id].total}{" "} correct
                                                                        </p>
                                                                        {assessmentResults[module._id].score >= 70 ? (
                                                                            <p className="mt-3 text-sm text-emerald-400">
                                                                                ✓ Assessment passed
                                                                            </p>
                                                                        ) : (
                                                                            <p className="mt-3 text-sm text-amber-400">
                                                                                Review the material and try again.
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        {module.skills?.length > 0 && (
                                                            <div className="mt-4 space-y-2">
                                                                {module.skills.map((skill) => (
                                                                    <div
                                                                        key={skill}
                                                                        className="flex items-center gap-3 text-sm text-slate-300"
                                                                    >
                                                                        <CheckCircle2 size={15}
                                                                            className="text-slate-500"
                                                                        />
                                                                        Understand and apply{" "}
                                                                        <span className="font-medium text-white">
                                                                            {skill}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <ListChecks size={18}
                                                                className="text-slate-500"
                                                            />
                                                            <h4 className="font-semibold">
                                                                Hands-on tasks
                                                            </h4>
                                                        </div>

                                                        {module.practiceTask ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleTask(module)}
                                                                className={`mt-4 flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                                                                    taskCompleted ? "border-emerald-500/20 bg-emerald-500/5" : "border-slate-800 bg-slate-950/50 hover:bg-slate-900"
                                                                }`}
                                                            >
                                                                <div
                                                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                                                        taskCompleted ? "bg-emerald-400 text-slate-950" : "bg-white/5 text-slate-400"
                                                                    }`}
                                                                >
                                                                    {taskCompleted ? (<CheckCircle2 size={15} />) : (1)}
                                                                </div>
                                                                <div>
                                                                    <p
                                                                        className={`text-sm leading-6 ${ taskCompleted ? "text-slate-500 line-through" : "text-slate-300" }`}
                                                                    >
                                                                        {module.practiceTask}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-slate-600">
                                                                        {taskCompleted ? "Completed" : "Click to mark complete"}
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        ) : (
                                                            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                                                                <p className="text-sm text-slate-500">
                                                                    Practice task will appear here when generated by AI.
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {module.skills?.length > 0 && (
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <BookOpen size={18}
                                                                className="text-slate-500"
                                                                />
                                                                <h4 className="font-semibold">
                                                                    Skills you'll practice
                                                                </h4>
                                                            </div>
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {module.skills.map((skill) => (
                                                                    <span
                                                                        key={skill}
                                                                        className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-300"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {module.reason && (
                                                        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                                                            <div className="flex gap-3">
                                                                <Sparkles size={18}
                                                                    className="mt-0.5 shrink-0 text-slate-500"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium text-white">
                                                                        Why AI recommended this
                                                                    </p>
                                                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                                                        {module.reason}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {module.prerequisites?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                                                Prerequisites
                                                            </p>
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {module.prerequisites.map((item) => (
                                                                    <span
                                                                        key={item}
                                                                        className="rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-400"
                                                                    >
                                                                        {item}
                                                                        
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeLearningModule === module._id ? (
                                                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle2 size={17} />
                                                                Learning session active
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveLearningModule(module._id)}
                                                            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                                                        >
                                                            <BookOpen size={17} />
                                                            Start Learning
                                                        </button>
                                                    )}

                                                    {activeLearningModule === module._id && (
                                                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                                                            <div className="mb-5">
                                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                                                    Current Lesson
                                                                </p>
                                                                <h4 className="mt-2 text-lg font-semibold">
                                                                    {module.title}
                                                                </h4>
                                                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                                                    {module.description}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-5">
                                                                <div>
                                                                    <h5 className="mb-2 text-sm font-semibold">
                                                                        What you'll learn
                                                                    </h5>
                                                                    <ul className="space-y-2">
                                                                        {module.skills?.map((skill) => (
                                                                            <li
                                                                                key={skill}
                                                                                className="flex items-center gap-2 text-sm text-slate-400"
                                                                            >
                                                                                <CheckCircle2 size={15}
                                                                                    className="text-slate-500"
                                                                                />
                                                                                {skill}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h5 className="mb-2 text-sm font-semibold">
                                                                        Why this matters
                                                                    </h5>
                                                                    <p className="text-sm leading-6 text-slate-400">
                                                                        {module.reason}
                                                                    </p>
                                                                </div>
                                                                <div className="border-t border-slate-800 pt-5">
                                                                    <h5 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                                                        <Code2 size={16} />
                                                                        Practice Task
                                                                    </h5>
                                                                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                                                        <p className="text-sm leading-6 text-slate-400">
                                                                            {module.practiceTask || "Build a small project that applies the skills from this module."}
                                                                        </p>
                                                                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                                                            <Code2 size={14} />
                                                                            Hands-on practice
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="border-t border-slate-800 pt-7">
                                                                    <h5 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                                                        <BookOpen size={18} />
                                                                        Recommended Resources
                                                                    </h5>
                                                                    {module.resources?.length > 0 ? (
                                                                        <div className="space-y-3">
                                                                            {module.resources.map((resource) => (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        navigate("/resource", {
                                                                                            state: {
                                                                                                resource,
                                                                                            },
                                                                                        })
                                                                                    }
                                                                                    className="block w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-slate-700 hover:bg-slate-900"
                                                                                >
                                                                                    <div className="flex items-start justify-between gap-4">
                                                                                        <div className="flex gap-3">
                                                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                                                                                <BookOpen size={16} />
                                                                                            </div>
                                                                                            <div>
                                                                                                <p className="text-sm font-medium text-white">
                                                                                                    {resource.title}
                                                                                                </p>
                                                                                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                                                                                    {resource.description}
                                                                                                </p>
                                                                                                <p className="mt-2 text-xs text-slate-600">
                                                                                                    {resource.type}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <span className="shrink-0 text-sm text-slate-500">
                                                                                            Study →
                                                                                        </span>
                                                                                    </div>
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <p className="text-sm leading-6 text-slate-500">
                                                                            No verified resources are available for this module yet.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-end border-t border-slate-800 pt-5">
                                                        {completed ? (
                                                            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400">
                                                                <CheckCircle2 size={18} />
                                                                Module completed
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCompleteModule(module)}
                                                                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                                                            >
                                                                Mark module as complete
                                                                <CheckCircle2 size={17} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Roadmap;