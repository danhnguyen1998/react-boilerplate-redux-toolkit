import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size?: number) => (shortDimension / guidelineBaseWidth) * (size || 0);
export const verticalScale = (size?: number) => (longDimension / guidelineBaseHeight) * (size || 0);
export const moderateScale = (size?: number, factor = 0.5) => (size || 0) + (scale(size) - (size || 0)) * factor;
export const moderateVerticalScale = (size?: number, factor = 0.5) =>
  (size || 0) + (verticalScale(size) - (size || 0)) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
