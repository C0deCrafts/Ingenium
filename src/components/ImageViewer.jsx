import {Image} from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage,styles }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles} />;
}