import {Image} from "react-native";

/**
 * ### Image Viewer Component
 *
 * Renders an image viewer to display the selected image or a placeholder image.
 * This component is typically used to display a profile image.
 *
 * @param placeholderImageSource - The source of the placeholder image.
 * @param selectedImage - The source of the selected image to be displayed.
 * @param styles - Custom styles for the image viewer.
 * @returns {JSX.Element} - The rendered image viewer as a React element.
 *
 * @example
 * // Import the ImageViewer component
 * import ImageViewer from "../../components/ImageViewer";
 * // Inside your component's render method, use the ImageViewer component like this:
 * <ImageViewer
 *    placeholderImageSource={require("../assets/images/placeholder.png")}
 *    selectedImage={"https://example.com/profile.jpg"}
 *    styles={{width: 100, height: 100}}
 * />
 * // This will render an image viewer with the specified placeholder image and selected image sources, and custom styles.
 */
export default function ImageViewer({ placeholderImageSource, selectedImage,styles }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles} />;
}