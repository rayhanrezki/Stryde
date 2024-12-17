import { motion } from "framer-motion";
import {
    Facebook,
    ArrowRight,
    ChromeIcon as Google,
    Github,
} from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const slideUp = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <AuthLayout>
            <div className="flex min-h-screen bg-gray-100">
                <Head title="Log in" />

                {/* Left Section - Hero Image */}
                <motion.div
                    className="relative hidden w-1/2 lg:block"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 bg-black/20" />
                    <img
                        src="/images/HeroAstronaut.jpg"
                        alt="Stryde"
                        className="h-full w-full object-cover"
                    />
                    <motion.h1
                        className="absolute left-8 top-8 text-4xl font-black font-rubik text-white"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <a href="/" className="text-white">
                            Stryde
                        </a>
                    </motion.h1>
                </motion.div>

                {/* Right Section - Login Form */}
                <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-12">
                    <motion.div
                        className="mx-auto w-full max-w-md"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="lg:hidden">
                            <h1 className="mb-8 text-4xl font-black font-rubik">
                                Stryde
                            </h1>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <motion.h2
                            className="mb-6 text-2xl font-semibold"
                            variants={slideUp}
                            transition={{ delay: 0.3 }}
                        >
                            Login
                        </motion.h2>

                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            variants={slideUp}
                            transition={{ delay: 0.5 }}
                        >
                            <div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Email"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Password"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-gray-600"
                                >
                                    Keep me logged in
                                </label>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-between rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-black/90 disabled:opacity-75"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>EMAIL LOGIN</span>
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </motion.form>

                        {canResetPassword && (
                            <motion.div
                                className="mb-2 mt-3"
                                variants={slideUp}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </motion.div>
                        )}

                        <motion.div
                            className="mt-6 grid grid-cols-3 gap-4"
                            variants={slideUp}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.a
                                href="auth/google/redirect"
                                className="flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Google className="h-6 w-6" />
                            </motion.a>

                            <motion.a
                                href="auth/github/redirect"
                                className="flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github className="h-6 w-6" />
                            </motion.a>

                            <motion.button
                                className="flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Facebook className="h-6 w-6 text-blue-600" />
                            </motion.button>
                        </motion.div>

                        <motion.p
                            className="mt-6 text-xs text-gray-600"
                            variants={slideUp}
                            transition={{ delay: 0.7 }}
                        >
                            By clicking 'Log In' you agree to our website
                            KicksClub Terms & Conditions, Kicks Privacy Notice
                            and Terms & Conditions.
                        </motion.p>

                        <motion.p
                            className="mt-4 text-center text-sm text-gray-600"
                            variants={slideUp}
                            transition={{ delay: 0.8 }}
                        >
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className="font-semibold text-black hover:underline"
                            >
                                Register
                            </Link>
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </AuthLayout>
    );
}
