import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";

import FeedItem from "./FeedItem";

export default function FeedScreen({ navigation, route, userData }) {
  const [isLoading, setLoading] = React.useState(true);
  const [jobs, setJobData] = React.useState([]);
  let url = "http://localhost:8081/jobs/";
  const getJobs = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setJobData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getJobs();
  }, [url]);
  return (
    <View style={{ overflow: "scroll" }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={({ jobs }, key) => key}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("FeedItemScreen", { data: item, userData: userData});
              }}
            >
              <FeedItem title={item.title} BackgroundImg={item.backgroundImg} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

{
  /* <FeedItem
title={"MN SCRIPTS FiveM"}
BackgroundImg="https://cdn.discordapp.com/attachments/750272962590015498/981919803625332777/WIN_20210629_14_49_23_Pro.jpg"
/> */
}
