import { Dimensions, Platform } from 'react-native';

const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&

        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
}

export default isIphoneX;