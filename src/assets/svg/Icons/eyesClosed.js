import * as React from 'react';
import Svg, { Path } from "react-native-svg"

export default function EyesClosed(props) {
    const { size, color } = props;

    return (
        <Svg
            width={size ? size : 16}
            height={size ? size : 16}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            {...props}
        >
            <Path
                d="M2.8 7.8c2.1 1 4.5 1.6 7 1.6s4.9-.6 7-1.6m-7 2v3M5.1 9.2l-1.5 2.6m11-2.6 1.5 2.6"
                stroke={color ? color : "#161823"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                opacity={0.5}
            />
        </Svg>
    );
}