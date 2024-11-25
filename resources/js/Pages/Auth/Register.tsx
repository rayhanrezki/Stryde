import { motion } from "framer-motion";
import {
    Apple,
    Facebook,
    ArrowRight,
    ChromeIcon as Google,
} from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const slideUp = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Section - Register Form */}
            <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-12">
                <Head title="Register" />

                <motion.div
                    className="mx-auto w-full max-w-md"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="lg:hidden">
                        <h1 className="mb-8 text-4xl font-black">KICKS</h1>
                    </div>

                    <motion.h2
                        className="mb-6 text-2xl font-semibold"
                        variants={slideUp}
                        transition={{ delay: 0.3 }}
                    >
                        Register
                    </motion.h2>

                    <motion.form
                        onSubmit={submit}
                        className="space-y-4"
                        variants={slideUp}
                        transition={{ delay: 0.5 }}
                    >
                        <div>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Name"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

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

                        <div>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm Password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="flex w-full items-center justify-between rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-black/90"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={processing}
                        >
                            <span>REGISTER</span>
                            <ArrowRight className="h-5 w-5" />
                        </motion.button>
                    </motion.form>

                    <motion.div
                        className="mt-6 grid grid-cols-3 gap-4"
                        variants={slideUp}
                        transition={{ delay: 0.6 }}
                    >
                        {/* Social login buttons */}
                        {/* ... existing social buttons code ... */}
                    </motion.div>

                    <motion.p
                        className="mt-6 text-xs text-gray-600"
                        variants={slideUp}
                        transition={{ delay: 0.7 }}
                    >
                        By clicking 'Register' you agree to our website
                        StrydeClub Terms & Conditions, Stryde Privacy Notice and
                        Terms & Conditions.
                    </motion.p>

                    <motion.p
                        className="mt-4 text-center text-sm text-gray-600"
                        variants={slideUp}
                        transition={{ delay: 0.8 }}
                    >
                        Already have an account?{" "}
                        <Link
                            href={route("login")}
                            className="font-semibold text-black hover:underline"
                        >
                            Log in
                        </Link>
                    </motion.p>
                </motion.div>
            </div>

            {/* Right Section - Hero Image */}
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
                    className="absolute right-8 top-8 text-4xl font-black text-white font-rubik"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Stryde
                </motion.h1>
            </motion.div>
        </div>
    );
}
