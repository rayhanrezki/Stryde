import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";

// Definisi interface User
export interface User {
    id: number;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    email_verified_at: string | null;
    is_admin: boolean;
}

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {
        auth: {
            user: User;
        };
    }
}
