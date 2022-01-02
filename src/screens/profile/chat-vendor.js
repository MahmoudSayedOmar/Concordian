import React from "react";
import { Header, ThemedView } from "../../Areas/Common/components";
import { IconHeader, TextHeader } from "../../containers/HeaderComponent";
import Chat from "./vendor/Chat";

class ChatVendor extends React.Component {
  render() {
    const { navigation } = this.props;

    const store = navigation.getParam("store", {});
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={store.name} />}
        />
        <Chat />
      </ThemedView>
    );
  }
}

export default ChatVendor;
