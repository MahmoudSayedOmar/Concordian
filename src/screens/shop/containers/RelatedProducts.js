import React from "react";

import { useTranslation } from "react-i18next";
import Heading from "../../../containers/Heading";
import ProductList from "../../../screens/home/containers/ProductList";

import { padding } from "../../../Areas/Common/components/config/spacing";

function RelatedProducts({ data }) {
  const { t } = useTranslation();
  return (
    <ProductList
      headingElement={
        <Heading
          title={t("catalog:text_related")}
          containerStyle={{ paddingHorizontal: padding.large }}
        />
      }
      navigationType="push"
      fields={{
        boxed: true,
        product_type: {
          type: "custom",
          ids: data,
        },
      }}
      layout="threecolumns"
    />
  );
}

export default RelatedProducts;
