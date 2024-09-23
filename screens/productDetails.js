import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
  FlatList,
  Alert,
  Pressable,
  Modal,
  TouchableOpacity,
  Linking,
  Share,
  ToastAndroid,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome,
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback, useContext, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Button,
  Divider,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLikeContext, userContext } from "../Context/context";
import { API_URL } from "../constants";
export default function ProductDetails({ navigation }) {
  const { userData } = useContext(userContext);
  const { params } = useRoute();
  const data = params?.item;
  // console.log(data);
  const [activeTab, setActiveTab] = useState(1);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const height = useWindowDimensions().height;
  const [url, setURl] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [liked, setLiked] = useState(undefined);
  const [favourite, setFavourite] = useState(false);
  const [refreshComment, setRefreshComment] = useState();
  const [actionType, setActionType] = useState("");

  const addFav = async () => {
    setFavourite(!favourite);
    try {
      const response = await fetch(`${API_URL}/favourites/${data.listingid}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          posttype: Number(data.posttype),
          userid: Number(userData.id),
          action: "add",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        ToastAndroid.show(
          data.message,
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT
        );
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { setLikeState } = useLikeContext();
  async function AlterLike(actionType) {
    try {
      // console.log(actionType);
      const response = await fetch(`${API_URL}/${data.listingid}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userid: userData.id,
          posttype: data.posttype,
          action: actionType,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        // Check if the response is in JSON format before attempting to parse
        try {
          const errorData = await response.json();
          console.log(errorData);
        } catch (jsonError) {
          // If parsing as JSON fails, log the raw response text
          console.log(
            "Error response is not in JSON format:",
            await response.text()
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const alterState = async () => {
    setLiked(!liked);
    setLikeState((prevLikeState) => !prevLikeState);
    if (liked === true) {
      AlterLike("unlike");
    }
    if (liked === false) {
      AlterLike("like");
    }
    console.log("Alter State", liked);
  };

  const addLike = async () => {
    console.log("Before", liked);
    await alterState();
  };

  const handleSubmitComment = async () => {
    // console.log("Cooment Data", data);
    setLoading(true);
    if (comment) {
      await axios
        .post(
          "http://137.184.237.55:8080/kugula/posts/comments/add",
          {
            listingid: data.listingid,
            userid: userData.id,
            posttype: data.posttype,
            comment: comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.accessToken}`,
            },
          }
        )
        .then((res) => {
          setComment("");
          Alert.alert("Successfully Commented!");
          setLoading(false);
          setRefreshComment(!refreshComment);
          console.log(res.data);
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert("An Error Occured!");
          console.log(err);
        });
    } else {
      Alert.alert("Comment can not be empty");
    }
  };

  useEffect(() => {
    async function Views() {
      try {
        const reponse = await fetch(
          `${API_URL}/view/add/${userData.id}/${data.listingid}/${data.posttype}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.accessToken}`,
            },
          }
        );
        if (reponse.ok) {
          const data = await reponse.json();
          console.log(data);
        }
        if (!reponse.ok) {
          const data = await reponse.json();
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    Views();
  }, []);

  const getComments = useCallback(async () => {
    try {
      await axios
        .get(
          `http://137.184.237.55:8080/kugula/posts/comments/${data.posttype}/${data.listingid}`,
          {
            headers: {
              Authorization: `Bearer ${userData.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const sortedComments = res.data.message?.sort((a, b) => {
            // Sort by the 'created' property in descending order
            return new Date(b.created) - new Date(a.created);
          });
          setCommentsData(sortedComments);
          // console.log(sortedComments);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refreshComment]);
  useEffect(() => {
    getComments();
  }, [getComments]);
  // /kugula/

  const validateLike = async () => {
    try {
      const response = await fetch(
        `${API_URL}/likes/check/${userData.id}/${data.posttype}/${data.listingid}`,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLiked(data);
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    validateLike();
  }, []);

  const handleRefreshing = () => {
    setRefreshing(true);
    getComments();
    setRefreshing(false);
  };
  const handleTabPress = (id) => {
    setActiveTab(id);
  };
  const handleModalVisible = (url) => {
    setModalVisible(true);
    setURl(url);
  };
  const whastsApp = () => {
    Linking.openURL(
      `whatsapp://send?text=hello,&phone=+${data.code}${data.phoneNumber}`
    );
  };
  const [fontsLoaded] = useFonts({
    Sans: require("../assets/fonts/DMSans_24pt-Regular.ttf"),
  });
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "App link",
        message: "Please install this app , AppLink :kugula_app",
        url: "kugula_url",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Text>Product Details</Text>
        <Text>{params.item.name}</Text> */}
        <Ionicons
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
          size={24}
          color="#DE1738"
          style={styles.icon}
        />
        <Text style={[styles.title, { fontFamily: "Sans" }]}>
          Product Details
        </Text>
      </View>
      {/* Images Display */}
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{ paddingHorizontal: 10, paddingVertical: 10 }}
        >
          <EvilIcons name="close" size={24} color="black" />
        </Pressable>
        <Image
          source={{
            uri: `${API_URL}/file/${url}`,
          }}
          style={{
            height: height - 300,
            objectFit: "contain",
            marginVertical: 120,
            marginHorizontal: 10,
          }}
        />
      </Modal>
      <View style={[styles.images]}>
        <View>
          <TouchableOpacity onPress={() => handleModalVisible(data?.urls[0])}>
            <Image
              source={{
                uri: `${API_URL}/file/${data?.urls[0]}`,
              }}
              width={253}
              height={284}
              style={styles.image}
            />
          </TouchableOpacity>
          <PaperProvider
            settings={{
              icon: (props) => <FontAwesome {...props} />,
            }}
          >
            <Button style={styles.button} textColor="#FFBB5C" mode="elevated">
              <Text>K</Text>
              <Text>
                {params.items?.posttype === 4
                  ? ""
                  : params.item?.formattedPrice}
              </Text>
            </Button>
          </PaperProvider>
        </View>

        {/* Side images */}
        <View style={{ flexDirection: "column", gap: 6 }}>
          <TouchableOpacity onPress={() => handleModalVisible(data?.urls[1])}>
            <Image
              source={{
                uri: `${API_URL}/file/${data?.urls[1]}`,
              }}
              width={54}
              height={65}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleModalVisible(data?.urls[2])}>
            <Image
              source={{
                uri: `${API_URL}/file/${data.urls[2]}`,
              }}
              width={54}
              height={65}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleModalVisible(data?.urls[3])}>
            <Image
              source={{
                uri: `${API_URL}/file/${data?.urls[3]}`,
              }}
              width={54}
              height={65}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* main content */}
      <KeyboardAvoidingView
        contentContainerStyle={{
          backgroundColor: "white",
          marginTop: 30,
          height: height,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        behavior="position"
        style={styles.content}
      >
        {/* <Text
					style={{
						color: "#808080",
						fontSize: 12,
						fontFamily: "Sans",
						left: 24,
						top: 10,
					}}>
					{params.item.title}
				</Text> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
            gap: 3,
          }}
        >
          <Text
            style={[
              styles.prodName,
              { fontFamily: "Sans", textTransform: "capitalize", fontSize: 14 },
            ]}
          >
            {params.item.title}
          </Text>
          <View
            style={{ flexDirection: "row", gap: 10, paddingHorizontal: 10 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="like1" size={24} color={"#DE1738"} />
              <Text
                style={[
                  {
                    fontFamily: "Sans",
                    textTransform: "capitalize",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  },
                ]}
              >
                {params.item.likes >= 2
                  ? `${params.item.likes} Likes`
                  : `${params.item.likes} Like`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons
                style={{ textAlign: "center" }}
                name="eye"
                size={24}
                color="#DE1738"
              />
              <Text
                style={[
                  {
                    fontFamily: "Sans",
                    textTransform: "capitalize",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  },
                ]}
              >
                {params.item.views >= 2
                  ? `${params.item.views} Views`
                  : `${params.item.views} View`}
              </Text>
            </View>
            <FontAwesome
              onPress={whastsApp}
              name="whatsapp"
              size={24}
              color="green"
            />

            <Ionicons
              onPress={onShare}
              name="share-social-outline"
              size={24}
              color="black"
            />
          </View>
        </View>
        {params.item.category === "Real Estate" ? (
          <View style={{ flexDirection: "row", left: 24, columnGap: 5 }}>
            <SimpleLineIcons
              style={{ textAlign: "center" }}
              name="location-pin"
              size={12}
              color="#808080"
            />
            <Text
              style={{
                color: "#808080",
                fontSize: 12,
                fontFamily: "Sans",

                // top: 10,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              4036 Jacaranda Villa, Ndola
            </Text>
          </View>
        ) : (
          ""
        )}

        {/* Tab View */}
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            columnGap: 5,
            rowGap: 15,
          }}
        >
          <Button
            buttonColor={activeTab === 1 ? "#FFBB5C" : "white"}
            onPress={() => handleTabPress(1)}
            textColor={activeTab === 1 ? "white" : "#989EAE"}
          >
            <Text style={{ fontFamily: "Sans" }}>Description</Text>
          </Button>
          <Button
            buttonColor={activeTab === 2 ? "#FFBB5C" : "white"}
            onPress={() => handleTabPress(2)}
            textColor={activeTab === 2 ? "white" : "#989EAE"}
          >
            <Text style={{ fontFamily: "Sans" }}>All Comments</Text>
          </Button>

          <Button
            buttonColor={activeTab === 3 ? "#FFBB5C" : "white"}
            onPress={() => handleTabPress(3)}
            textColor={activeTab === 3 ? "white" : "#989EAE"}
          >
            <Text style={{ fontFamily: "Sans" }}>Add Comment</Text>
          </Button>
        </View>
        {activeTab === 1 ? (
          <View
            style={[styles.description, { flexDirection: "column", gap: 10 }]}
          >
            <Text style={[styles.descText, { fontFamily: "Sans" }]}>
              {params.item.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Pressable
                onPress={addLike}
                style={{
                  flexDirection: "row",
                  gap: 5,
                  // width: 10,
                  // height: 10,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    elevation: 5,
                    borderWidth: 1,
                    borderColor: "#DE1738",
                    gap: 5,
                    backgroundColor: "white",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      top: 3,
                    }}
                  >
                    {liked ? (
                      <AntDesign name="like1" size={18} color={"#DE1738"} />
                    ) : (
                      <AntDesign name="like2" size={18} color="#DE1738" />
                    )}
                  </Text>
                </View>

                <Text
                  style={{ fontFamily: "DM-sans", verticalAlign: "middle" }}
                >
                  {liked ? "Unlike" : "Like"}
                </Text>
              </Pressable>

              <Pressable
                onPress={addFav}
                style={{
                  flexDirection: "row",

                  gap: 5,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    elevation: 5,
                    borderWidth: 1,
                    borderColor: "#DE1738",
                    gap: 5,
                    backgroundColor: "white",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      top: 4,
                    }}
                  >
                    <FontAwesome
                      name="heart-o"
                      onPress={addFav}
                      size={18}
                      color={"#DE1738"}
                    />
                  </Text>
                </View>

                <Text
                  style={{ fontFamily: "DM-sans", verticalAlign: "middle" }}
                >
                  Add Fav
                </Text>
              </Pressable>
            </View>
            {params.item?.posttype.posttype === 4 ? (
              <View>
                <Text style={{ fontFamily: "Sans", paddingVertical: 2 }}>
                  Model: {params.item.model}
                </Text>
                <Text style={{ fontFamily: "Sans", paddingVertical: 2 }}>
                  Model Year: {params.item.modelyear}
                </Text>
                <Text style={{ fontFamily: "Sans", paddingVertical: 2 }}>
                  Chassis: {params.item.chassis}
                </Text>
                <Text style={{ fontFamily: "Sans", paddingVertical: 2 }}>
                  Mileage: {params.item.mileage}
                </Text>
                <Text style={{ fontFamily: "Sans", paddingVertical: 2 }}>
                  Make: {params.item.make}
                </Text>
                <Text style={{ fontFamily: "Sans", paddingVertical: 2 }}>
                  BodyType: {params.item.bodytype}
                </Text>
              </View>
            ) : (
              ""
            )}

            {params.item.posttype.posttype === 1 ? (
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Ionicons
                    style={{ textAlign: "center" }}
                    name="bed-outline"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontFamily: "Sans" }}>
                    {params.item.bedroom} Beds
                  </Text>
                </View>
                <View>
                  <MaterialCommunityIcons
                    name="bathtub-outline"
                    size={24}
                    color="black"
                    style={{ textAlign: "center" }}
                  />
                  <Text style={{ fontFamily: "Sans" }}>2 Baths</Text>
                </View>
                <View>
                  <MaterialIcons
                    style={{ textAlign: "center" }}
                    name="meeting-room"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontFamily: "Sans" }}>2 Rooms</Text>
                </View>
                <View>
                  <Entypo
                    style={[styles.dimensions, { textAlign: "center" }]}
                    name="cross"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontFamily: "Sans" }}>2x30km</Text>
                </View>
              </View>
            ) : (
              ""
            )}

            {/* <Button
              style={{ paddingVertical: 10, marginVertical: 20 }}
              buttonColor="#DE1738"
              textColor="white"
              onPress={() => navigation.navigate("checkout-1",{price: params.item.price})}
            >
              <Text style={{ fontFamily: "Sans" }}>Buy Now</Text>
            </Button> */}
          </View>
        ) : (
          <View style={styles.description}>
            {activeTab === 3 ? (
              <View>
                <TextInput
                  mode="outlined"
                  value={comment}
                  onChangeText={(val) => setComment(val)}
                  outlineStyle={{ borderColor: "#DE1738" }}
                  style={{
                    backgroundColor: "white",
                    paddingVertical: 10,
                    fontFamily: "Sans",
                  }}
                  contentStyle={{ fontFamily: "Sans" }}
                  multiline
                  placeholder="add your thoughts..."
                />
                <Pressable
                  style={{
                    paddingVertical: 20,
                    marginVertical: 20,
                    backgroundColor: "#DE1738",
                    borderRadius: 10,
                  }}
                  onPress={handleSubmitComment}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: "Sans",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Add
                    </Text>
                  )}
                </Pressable>
              </View>
            ) : (
              <View style={{ height: 250, paddingBottom: 25 }}>
                <FlatList
                  data={commentsData}
                  showsVerticalScrollIndicator={false}
                  onRefresh={handleRefreshing}
                  refreshing={refreshing}
                  keyExtractor={(item) => item.commentid}
                  ListEmptyComponent={
                    <Text
                      style={{ textAlign: "center", fontFamily: "DM-sans" }}
                    >
                      No Comments yet
                    </Text>
                  }
                  contentContainerStyle={{
                    paddingVertical: 10,
                  }}
                  renderItem={({ item }) => (
                    <View
                      key={item.id}
                      style={{ flexDirection: "row", gap: 10 }}
                    >
                      <View>
                        <View
                          style={{ flexDirection: "row", gap: 4, rowGap: 10 }}
                        >
                          <FontAwesome
                            name="user-o"
                            size={16}
                            color="#989EAE"
                          />
                          <Text
                            style={{
                              fontFamily: "Sans",
                              fontSize: 16,
                              color: "#989EAE",
                            }}
                          >
                            {item.userid.username}
                          </Text>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                          <Text
                            style={{
                              fontFamily: "Sans",
                              fontSize: 16,
                              color: "#989EAE",
                              paddingVertical: 2,
                            }}
                          >
                            {item.comment}
                          </Text>

                          <Text
                            style={{
                              fontFamily: "Sans",
                              fontSize: 10,
                              color: "#989EAE",
                            }}
                          >
                            {new Date(item.date).toLocaleString()}
                          </Text>
                          <Pressable
                            style={{
                              flexDirection: "row",
                              gap: 5,
                              paddingHorizontal: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Sans",
                                color: "#DE1738",
                                fontSize: 13,
                              }}
                            >
                              reply
                            </Text>
                            <Octicons name="reply" size={13} color="#DE1738" />
                          </Pressable>
                        </View>
                      </View>

                      <Divider />
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DE1738",
  },
  header: {
    top: Platform.OS === "android" ? 54 : 58,
    left: 24,
    flexDirection: "row",
    columnGap: 10,
  },
  icon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 45,
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    borderRadius: 10,
  },
  images: {
    flexDirection: "row",
    columnGap: 20,
    top: 100,
    left: 30,
  },
  button: {
    position: "absolute",
    top: -270,
    left: 15,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    flex: 1,
    top: 120,
  },
  prodName: {
    color: "#2F2F2F",
    fontSize: 18,
    left: 24,
    paddingVertical: 8,
    lineHeight: 27,
  },
  description: {
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  descText: {
    lineHeight: 15,
    color: "#808080",
    fontSize: 14,
    textAlign: "justify",
  },
  dimensions: {
    borderWidth: 1,
    width: 24,
    height: 24,
  },
});
