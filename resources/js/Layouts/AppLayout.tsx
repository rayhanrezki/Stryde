import { Head } from "@inertiajs/react";

export default function AppLayout({
    children,
    title = "",
}: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
                ></script>
            </Head>
            <main>{children}</main>
        </>
    );
}
