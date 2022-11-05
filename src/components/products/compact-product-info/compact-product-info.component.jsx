import { Platform } from "react-native";
import {
  CompactImage,
  CompactWebView,
  Item,
} from "./compact-product-info.styles";
import { Text } from "../../typography/text.component";

const isAndroid = Platform.OS === "android";

const CompactProductInfo = ({ product, isMap = true }) => {
  const Image = isAndroid && isMap ? CompactWebView : CompactImage;
  return (
    <Item>
      <Image source={{ uri: product.productImage }} />
      <Text center variant="caption" numberOfLines={3}>
        {product.productTitle}
      </Text>
    </Item>
  );
};

export default CompactProductInfo;
