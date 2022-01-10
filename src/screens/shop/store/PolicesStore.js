import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text } from "../../../components";
import Container from "../../../containers/Container";
import { lineHeights } from "../../../components/config/fonts";
import { margin } from "../../../components/config/spacing";
class PolicesStore extends Component {
  render() {
    return (
      <ScrollView>
        <Container>
          <Text h3 medium style={styles.title}>
            Shipping Policy
          </Text>
          <Text colorSecondary style={styles.description}>
            Lorem ipsum dolor sente-se amet, consectetur adipiscing elit. Duis
            magna sapien, accumsan nec sapien quis, fringillafficitur nunc.{" "}
          </Text>
          <Text h3 medium style={styles.title}>
            Refund Policy
          </Text>
          <Text colorSecondary style={styles.description}>
            Lorem ipsum dolor sente-se amet, consectetur adipiscing elit. Duis
            magna sapien, accumsan nec sapien quis, fringillafficitur nunc.{" "}
          </Text>
          <Text h3 medium style={styles.title}>
            Exchange Policy
          </Text>
          <Text colorSecondary style={styles.description}>
            Lorem ipsum dolor sente-se amet, consectetur adipiscing elit. Duis
            magna sapien, accumsan nec sapien quis, fringillafficitur nunc.{" "}
          </Text>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: margin.base - 1,
  },
  description: {
    marginBottom: margin.big,
    lineHeight: lineHeights.h4,
  },
});

export default PolicesStore;
