import React, { useReducer, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, DarkColors, DayColors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useFormik } from "formik";
import * as Yup from "yup";
import ListingInputs from "./ListingInputs";
import LongInputs from "./DescriptionTextInput";
import { MotiView } from "moti";
import { FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";
import Countries from "../constants/Countries";
import Industry from "../constants/Categories";
import { SafeAreaView } from "react-native-safe-area-context";

import { Picker as MyPicker } from "react-native-woodpicker";
import {useDispatch, useSelector} from "react-redux";
import {addListing} from "../redux/actions/data-action";
import ToastMessage from "./Toast";
import {clearErrors, clearMessage} from "../redux/actions/user-action";

function Wrap({ children }) {
  return (
    <MotiView
      style={{
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      {children}
    </MotiView>
  );
}

const FILE_SIZE = 160 * 1024;

const phoneRegExp = /^[+]?\d*$/;
const schema = Yup.object().shape({
  fullName: Yup.string().required("Name is Required"),
  Company: Yup.string().required("Company name is Required"),
  Country: Yup.string().required("Country of Incorporation is Required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  Date: Yup.date().required("Date of Incorporation is Required"),
  RCNumbers: Yup.string().required("RC Numbers is Required"),
  OfficeAddress: Yup.string().required("Office address is Required"),
  Industry: Yup.string().required("Industry is Required"),
  Website: Yup.string().required("Website link is Required"),
  TargetHard: Yup.string().required("Target hard capital is Required"),
  TargetSoft: Yup.string().required("Target soft capital is Required"),
  Description: Yup.string().required("Description is Required"),
  SocialMedia: Yup.string().required("Social media links is Required"),
  Documentation: Yup.mixed()
    .required("Legal Documentation is Required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    ),
  Identification: Yup.string().required("Means of ID is Required"),
  Phone: Yup.string()
    .matches(phoneRegExp, "Wrong input")
    .required("Phone  is Required"),
});

const Listing = ({ theme, action }) => {
  const [pitchDoc, setPitchDoc] = useState(null);
  const [cacDoc, setCACDoc] = useState(null);
  const [userIDDoc, setUserIdDoc] = useState(null);

  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const user = useSelector(state => state.user)
  const {loading} = data
  const {message, error} = user

  //const [date, setDate] = useState(new Date())
  const [country, setCountry] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const [visible, toggle] = useReducer((s) => !s, true);
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
      isValid,
    setFieldValue,
    touched,
  } = useFormik({
    validationSchema: schema,
    initialValues: {
      fullName: "",
      Phone: "",
      Company: "",
      email: "",
      Pitch: pitchDoc,
      Link: "",
      Country: "",
      Date: date,
      RCNumbers: "",
      OfficeAddress: "",
      Industry: "",
      Description: "",
      TargetHard: "",
      TargetSoft: "",
      Website: "",
      SocialMediaIG: "",
      SocialMediaFB: "",
      SocialMediaTwitter: "",
      NIN: "",
      Identification: userIDDoc,
      cacDoc: cacDoc
    },
    onSubmit: (values) => {
      const { fullName,Phone,Company,email,Pitch,Link, Country, Date, RCNumbers,OfficeAddress,Industry,
        Description, TargetHard, TargetSoft,Website,SocialMediaIG,cacDoc, SocialMediaFB,SocialMediaTwitter, NIN, Identification } = values;
      const ListingData = new FormData();

      ListingData.append("fullName", fullName);
      ListingData.append("company", Company);
      ListingData.append("country", Country);
      ListingData.append("email", email);
      ListingData.append("date", Date);
      ListingData.append("RCNumbers", RCNumbers);
      ListingData.append("pitch", Pitch);
      ListingData.append("officeAddress", OfficeAddress);
      ListingData.append("industry", Industry);
      ListingData.append("NIN", NIN);
      ListingData.append("website", Website);
      ListingData.append("ProjectVideo", Link);
      ListingData.append("targetSoft", TargetSoft);
      ListingData.append("targetHard", TargetHard);
      ListingData.append("description", Description);
      ListingData.append("socialMediaIG", SocialMediaIG);
      ListingData.append("socialMediaFB", SocialMediaFB);
      ListingData.append("socialMediaTwitter", SocialMediaTwitter);
      ListingData.append("phone", Phone);
      ListingData.append("documentation", fileInput.files[0], cacDoc);
      ListingData.append("identification", fileInput.files[0], Identification)

      dispatch(addListing(ListingData))
    },
  });

  const getPitch = async () => {
    // make sure that we have the permission

    // launch the camera with the following settings
    let doc = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });
    // make sure a image was taken:
    if (doc.type === "success") {
      await setFieldValue("pitch", doc.uri);

      console.log(doc);

      //react does not support file url so we write the code below
    }
  };

  const getCAC = async () => {
    // make sure that we have the permission

    // launch the camera with the following settings
    let doc = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    // make sure a image was taken:
    if (doc.type === "success") {
      await setCACDoc(doc.uri);

      console.log(pitchDoc);

      //react does not support file url so we write the code below
    }
  };

  const getID = async () => {
    // make sure that we have the permission

    // launch the camera with the following settings
    let doc = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    // make sure a image was taken:
    if (doc.type === "success") {
      await setUserIdDoc(doc.uri);

      //console.log(userIDDoc);

      //react does not support file url so we write the code below
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme === "Dark" ? DarkColors.primaryDarkThree : "#eee",
      }}
    >
      <ScrollView scrollEnabled contentContainerStyle={styles.backdrop}>
        <View style={[styles.content]}>
          <View style={styles.backButtonWrap}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 70,
                flexDirection: "row",
                alignItems: "flex-start",
              }}
              onPress={action}
            >
              <Ionicons
                name="ios-arrow-back-sharp"
                size={34}
                color={Colors.Primary}
              />
            </TouchableOpacity>

            <Text
              style={{
                alignItems: "center",
                fontFamily: "Gordita-Black",
                fontSize: 12,
                height: 50,
                color: "#eee",
              }}
            >
              The listing form
            </Text>
          </View>
          <View
            style={{
              height: 890,
              width: "100%",
            }}
          >
            <AnimatePresence exitBeforeEnter>
              {visible && (
                <Wrap key="firstForm">
                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Your full name"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      error={errors.fullName}
                      touched={touched.fullName}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.fullName}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Your phone number"
                      autoCapitalize="none"
                      keyboardType="numeric"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("Phone")}
                      onBlur={handleBlur("Phone")}
                      error={errors.Phone}
                      touched={touched.Phone}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Phone}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Your Company name"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      error={errors.Company}
                      touched={touched.Company}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Company}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Your email"
                      autoCapitalize="none"
                      autoCompleteType="email"
                      keyboardType="email-address"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={errors.email}
                      touched={touched.email}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.email}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={getPitch}
                      style={{
                        width: 140,
                        height: 45,
                        borderColor: DayColors.cream,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderRadius: 10,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme === "Dark" ? "#eee" : "#333",
                          fontFamily: "Gordita-bold",
                        }}
                      >
                        Upload Pitch
                      </Text>
                      <FontAwesome5
                        name="file-upload"
                        size={18}
                        color={theme === "Dark" ? "#eee" : "#333"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Pitch}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Link to Project video on Youtube - (Optional)"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("link")}
                      onBlur={handleBlur("link")}
                      error={errors.link}
                      touched={touched.link}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.lINK}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    {Platform.OS === "android" ? (
                      <View
                        style={{
                          width: wp("80%"),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: 60,
                          borderRadius: 15,
                          borderColor: "#ddd",
                          borderWidth: 2,
                          padding: 8,
                        }}
                      >
                        <Picker
                          label="Country of registration"
                          onBlur={handleBlur("country")}
                          style={{
                            color: theme === "Dark" ? "#eee" : "#333",
                            width: "100%",
                            height: 45,
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                          }}
                          mode="dialog"
                          selectedValue={values.country}
                          onValueChange={
                            (itemValue, itemIndex) =>
                              setFieldValue("Country", itemValue)
                            //setCountry(itemValue)
                          }
                        >
                          {Countries.map((country, index) => (
                            <Picker.Item
                              label={country.label}
                              value={country.value}
                              key={index}
                            />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <MyPicker
                        textInputStyle={{
                          fontFamily: "Gordita-medium",
                          fontSize: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme === "Dark" ? "#eee" : "#333",
                        }}
                        containerStyle={{
                          width: wp("85%"),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 60,
                          borderRadius: 15,
                          padding: 8,
                          marginTop: 10,
                          borderColor: "#ddd",
                          borderWidth: 2,
                          backgroundColor:
                            theme == "Dark" ? DarkColors.primaryDark : "#eee",
                        }}
                        item={values.Country}
                        items={Countries}
                        onItemChange={(item, index) =>
                          setFieldValue("Country", item.value)
                        }
                        title="Select Country"
                        placeholder={`Country of registration: ${values.Country}`}
                        //isNullable
                        backdropAnimation={{ opactity: 0 }}
                        //mode="dropdown"
                        //isNullable
                        //disable
                      />
                    )}
                  </View>

                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Country}
                  </Text>

                  <View style={{ paddingHorizontal: 32, width: "100%" }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={showDatepicker}
                      style={{
                        width: 160,
                        height: 45,
                        backgroundColor: DayColors.cream,
                        borderRadius: 10,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#333",
                          fontFamily: "Gordita-bold",
                        }}
                      >
                        Date of registration
                      </Text>

                      <FontAwesome5
                        name="calendar-alt"
                        size={18}
                        color={"#333"}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        padding: 12,
                        fontSize: 11,
                        fontFamily: "Gordita-bold",
                        color: theme === "Dark" ? "#eee" : "#333",
                      }}
                    >
                      {date ? date.toDateString() : "Select date..."}
                    </Text>

                    {show && (
                      <DateTimePicker
                        style={{
                          backgroundColor: "#333",
                        }}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Date}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Your RC Number"
                      autoCapitalize="none"
                      keyboardType="numeric"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("RCNumbers")}
                      onBlur={handleBlur("RCNumbers")}
                      error={errors.RCNumbers}
                      touched={touched.RCNumbers}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.RCNumbers}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Your Office Address"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("OfficeAddress")}
                      onBlur={handleBlur("OfficeAddress")}
                      error={errors.OfficeAddress}
                      touched={touched.OfficeAddress}
                    />
                  </View>

                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.OfficeAddress}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    {Platform.OS === "android" ? (
                      <View
                        style={{
                          width: wp("80%"),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: 60,
                          borderRadius: 15,
                          borderColor: "#ddd",
                          borderWidth: 2,
                          padding: 8,
                        }}
                      >
                        <Picker
                          label="Company Industry/Category"
                          onBlur={handleBlur("Industry")}
                          style={{
                            color: theme === "Dark" ? "#eee" : "#333",
                            width: "100%",
                            height: 45,
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                          }}
                          mode="dialog"
                          selectedValue={values.Industry}
                          onValueChange={
                            (itemValue, itemIndex) =>
                              setFieldValue("Industry", itemValue)
                            //setCountry(itemValue)
                          }
                        >
                          {Industry.map((Industry, index) => (
                            <Picker.Item
                              label={Industry.label}
                              value={Industry.value}
                              key={index}
                            />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <MyPicker
                        textInputStyle={{
                          fontFamily: "Gordita-medium",
                          fontSize: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme === "Dark" ? "#eee" : "#333",
                        }}
                        containerStyle={{
                          width: wp("85%"),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 60,
                          borderRadius: 15,
                          padding: 8,
                          marginTop: 10,
                          borderColor: "#ddd",
                          borderWidth: 2,
                          backgroundColor:
                            theme == "Dark" ? DarkColors.primaryDark : "#eee",
                        }}
                        item={values.Industry}
                        items={Industry}
                        onItemChange={(item, index) =>
                          setFieldValue("Industry", item.value)
                        }
                        title="Company Industry/Category"
                        placeholder={`Category: ${values.Industry}`}
                        //isNullable
                        backdropAnimation={{ opactity: 0 }}
                        //mode="dropdown"
                        //isNullable
                        //disable
                      />
                    )}
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Industry}
                  </Text>
                </Wrap>
              )}

              {!visible && (
                <Wrap key="secondForm">
                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <LongInputs
                      height={170}
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Company Description"
                      autoCapitalize="none"
                      editable
                      keyboardAppearance="dark"
                      returnKeyLabel="next"
                      numberOfLines={4}
                      multiline
                      onChangeText={handleChange("Description")}
                      onBlur={handleBlur("Description")}
                      error={errors.Description}
                      touched={touched.Description}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Description}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Target Amount (Soft cap)"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("TargetSoft")}
                      onBlur={handleBlur("TargetSoft")}
                      error={errors.TargetSoft}
                      touched={touched.TargetSoft}
                    />
                  </View>

                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.TargetSoft}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Target Amount (Hard cap)"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("TargetHard")}
                      onBlur={handleBlur("TargetHard")}
                      error={errors.TargetHard}
                      touched={touched.TargetHard}
                    />
                  </View>

                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.TargetHard}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Company Website (Link)"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("Website")}
                      onBlur={handleBlur("Website")}
                      error={errors.Website}
                      touched={touched.Website}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.Website}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Instagram handle"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("SocialMedia")}
                      onBlur={handleBlur("SocialMedia")}
                      error={errors.SocialMedia}
                      touched={touched.SocialMedia}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.SocialMedia}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Twitter handle"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("SocialMedia")}
                      onBlur={handleBlur("SocialMedia")}
                      error={errors.SocialMedia}
                      touched={touched.SocialMedia}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.SocialMedia}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 32,
                      marginBottom: 1,
                      width: "100%",
                    }}
                  >
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Facebook link"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("SocialMedia")}
                      onBlur={handleBlur("SocialMedia")}
                      error={errors.SocialMediaIG}
                      touched={touched.SocialMediaIG}
                    />
                  </View>

                  <Text style={styles.errorText} numberOfLines={1}>
                    {errors.SocialMediaIG}
                  </Text>

                  <View style={{ paddingHorizontal: 32, width: "100%" }}>
                    <ListingInputs
                      color={theme === "Dark" ? "#eee" : "#131313"}
                      placeholder="Please provide NIN (only nigerians)"
                      autoCapitalize="none"
                      keyboardType="phone-pad"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      onChangeText={handleChange("NIN")}
                      onBlur={handleBlur("NIN")}
                      error={errors.NIN}
                      touched={touched.NIN}
                    />
                  </View>
                  <Text style={styles.errorText} numberOfLines={1}></Text>

                  <View
                    style={{
                      paddingHorizontal: 32,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      marginVertical: 5,
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={getCAC}
                      style={{
                        width: 140,
                        height: 45,
                        borderColor: DayColors.cream,
                        borderWidth: 2,
                        borderStyle: "dashed",
                        borderRadius: 10,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme === "Dark" ? "#eee" : "#333",
                          fontFamily: "Gordita-bold",
                        }}
                      >
                        Upload CAC doc
                      </Text>
                      <FontAwesome5
                        name="file-upload"
                        size={18}
                        color={theme === "Dark" ? "#eee" : "#333"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 32,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      marginVertical: 5,
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={getID}
                      style={{
                        width: 150,
                        height: 45,
                        borderColor: DayColors.dimGreen,
                        borderWidth: 2,
                        borderStyle: "dashed",
                        borderRadius: 10,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          color: theme === "Dark" ? "#eee" : "#333",
                          fontSize: 10,
                          fontFamily: "Gordita-bold",
                        }}
                      >
                        Identification Doc
                      </Text>
                      <FontAwesome5
                        name="id-card"
                        size={18}
                        color={theme === "Dark" ? "#eee" : "#333"}
                      />
                    </TouchableOpacity>
                  </View>
                </Wrap>
              )}
            </AnimatePresence>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            bottom: 0,
            height: 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={toggle}
            style={{
              width: 100,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: DayColors.strongLemon,
            }}
          >
            <Text
              style={{
                fontFamily: "Gordita-bold",
              }}
            >
              {visible ? (
                <>
                  Next{" "}
                  <FontAwesome5 name="chevron-right" size={14} color="black" />
                </>
              ) : (
                <>
                  Prev{" "}
                  <FontAwesome5 name="chevron-left" size={14} color="black" />
                </>
              )}
            </Text>
          </TouchableOpacity>


          {
            isValid ?
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      width: 120,
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      backgroundColor: Colors.Primary,
                    }}
                >
                  <Text
                      style={{
                        fontFamily: "Gordita-bold",
                      }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={{
                      width: 120,
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      backgroundColor: "#ddd",
                    }}
                >
                  <Text
                      style={{
                        fontFamily: "Gordita-bold",
                      }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
          }
        </View>
        {loading && <ActivityIndicator size="large" color={Colors.Primary} />}

        {message &&
        <ToastMessage message={message} onHide={() => dispatch(clearMessage())} type='message'/>
        }

        {error && <ToastMessage message={error} onHide={() => dispatch(clearErrors())} type='error'/>}

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginBottom: 18,
    alignItems: "center",
    backgroundColor: DayColors.primaryColor,
    justifyContent: "center",
  },
  backButtonWrap: {
    width: wp(100),
    padding: 15,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-evenly",
    bottom: 0,
  },
  errorText: {
    paddingHorizontal: 32,
    fontSize: 10,
    alignItems: "flex-start",
    width: "75%",
    color: "#FF5A5F",
    padding: 2,
  },
});

export default Listing;
