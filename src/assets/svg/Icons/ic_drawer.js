import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent(props) {
  return (
    <Svg width="28" height="28" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* <Path d="M1 11H10" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M19 6H1" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M10 1H1" stroke="white" stroke-width="2" stroke-linecap="round" /> */}
      <Path d="M19 11H1" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M11 6H1" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M19 1H1" stroke="white" stroke-width="2" stroke-linecap="round" />
    </Svg>
  );
}


