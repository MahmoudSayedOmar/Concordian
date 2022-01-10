import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { ThemedView, Header } from "../../components";
import { TextHeader, IconHeader } from "../../containers/HeaderComponent";
import Empty from "../../containers/Empty";
import Container from "../../containers/Container";
import Detail from "../../containers/vendor/Detail";
import { ItemVendor } from "../../containers/vendor";

import { detailVendorSelector } from "../../modules/vendor/selectors";

function StoreDetail(props) {
  const { t, vendorDetail, ...rest } = props;
  if (vendorDetail.size < 1) {
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          rightComponent={<TextHeader title={t("catalog:text_store_detail")} />}
        />
        <Empty
          icon="box"
          title={t("empty:text_title_product")}
          subTitle={t("empty:text_subtitle_product")}
          titleButton={t("common:text_go_shopping")}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView isFullView>
      <Header
        leftComponent={<IconHeader />}
        centerComponent={<TextHeader title={vendorDetail.get("store_name")} />}
      />
      <Container>
        <ItemVendor store={vendorDetail.toJS()} />
      </Container>
      <Detail vendorDetail={vendorDetail.toJS()} {...rest} />
    </ThemedView>
  );
}

const mapStateToProps = (state) => {
  return {
    vendorDetail: detailVendorSelector(state),
  };
};
export default connect(mapStateToProps)(withTranslation()(StoreDetail));
