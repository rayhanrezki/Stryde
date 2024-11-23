import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
    const pageTransition = {
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 },
    };

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}
