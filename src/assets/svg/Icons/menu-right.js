import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MenuRight = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM4 18a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1ZM5 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H5Z"
            fill="#FFF"
        />
    </Svg>
)

export default MenuRight
