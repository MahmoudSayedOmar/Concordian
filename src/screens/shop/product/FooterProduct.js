import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../../containers/Container";
import { Row, Col } from "../../../containers/Gird";
import Button from "../../../containers/Button";

import { margin } from "../../../Areas/Common/components/config/spacing";

const FooterProduct = ({
  isAddToCart,
  loading,
  onPressAddCart,
  onPressViewCart,
}) => {
  const { t } = useTranslation();

  return (
    <Container style={{ marginBottom: margin.big, marginTop: margin.large }}>
      <Row>
        <Col>
          <Button
            title={t("common:text_add_cart")}
            onPress={onPressAddCart}
            loading={loading}
          />
        </Col>
        {isAddToCart && (
          <Col>
            <Button
              title={t("common:text_view_cart")}
              onPress={onPressViewCart}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

FooterProduct.defaultProps = {
  isAddToCart: false,
  onPressAddCart: () => {},
  onPressViewCart: () => {},
};

export default FooterProduct;
