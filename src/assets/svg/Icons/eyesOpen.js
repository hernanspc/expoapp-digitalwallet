import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const EyesOpen = (props) => {
    const { size, color } = props

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            width={size ? size : 16}
            height={size ? size : 16}
            {...props}
        >
            <G
                stroke={color ? color : "#161823"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                opacity={0.5}
            >
                <Path d="M9.8 4.8c3 0 5.3 1.7 7 5-1.7 3.3-4 5-7 5s-5.3-1.7-7-5c1.6-3.4 4-5 7-5z" />
                <Path d="M9.8 11.8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </G>
        </Svg>
    )

}

export default EyesOpen
