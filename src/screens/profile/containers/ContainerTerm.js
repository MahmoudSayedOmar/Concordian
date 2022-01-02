import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "../../../Areas/Common/components";
import Container from "../../../containers/Container";
import { margin } from "../../../Areas/Common/components/config/spacing";
import { lineHeights } from "../../../Areas/Common/components/config";

const ContainerTerm = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Container>
        <Text h2 medium style={styles.title}>
          {t("profile:text_term_content")}
        </Text>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: margin.big,
  },
  titleList: {
    marginBottom: margin.base + 4,
  },
  description: {
    marginBottom: 50,
    lineHeight: lineHeights.h4,
  },
});

export default ContainerTerm;
