import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <span className={`text-2xl font-bold font-rubik ${props.className}`}>
            Stryde
        </span>
    );
}
