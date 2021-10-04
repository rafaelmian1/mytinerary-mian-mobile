import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignForm = (props) => {
  const [signin, setSignin] = useState(props.route.name == "signin");
  const [errors, setErrors] = useState([]);
  const [secure, setSecure] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(
    countries.map((country) => {
      return { label: country, value: country };
    })
  );
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    img: "",
    country: "",
    // google: false,
  });

  useEffect(() => {
    setUser({ ...user, country: value });
  }, [value]);

  const signUpHandler = async (e) => {
    let errors = await props.signUp(user, props);
    errors && setErrors(errors.map((err) => err.field));
  };
  const getStorage = async () => {
    try {
      let token = await AsyncStorage.getItem("tokenMyTinerary");
    } catch (err) {
      console.log(err);
    }
  };
  getStorage();
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            width: Dimensions.get("window").width - 40,
            padding: 32,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <Text style={styles.title}>
            {signin ? "Welcome back!\nEnjoy MyTinerary " : "Register now!"}
          </Text>
          {!signin && (
            <>
              <View
                style={{
                  ...styles.inputContainer,
                }}
              >
                <TextInput
                  style={styles.input}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.nativeEvent.text.trim() })
                  }
                  placeholder="First Name"
                  placeholderTextColor="black"
                />
                <Ionicons
                  style={{ paddingRight: 15 }}
                  name="person-outline"
                  size={24}
                  color={errors.includes("country") ? "red" : "black"}
                />
              </View>
              <View
                style={{
                  ...styles.inputContainer,
                }}
              >
                <TextInput
                  style={styles.input}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.nativeEvent.text.trim() })
                  }
                  placeholder="Last Name"
                  placeholderTextColor="black"
                />
                <Ionicons
                  style={{ paddingRight: 15 }}
                  name="person-outline"
                  size={24}
                  color={errors.includes("country") ? "red" : "black"}
                />
              </View>
            </>
          )}
          <View
            style={{
              ...styles.inputContainer,
            }}
          >
            <TextInput
              style={styles.input}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.nativeEvent.text.toLowerCase().trim(),
                })
              }
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor="black"
            />
            <Ionicons
              style={{ paddingRight: 15 }}
              name="ios-mail-open-outline"
              size={24}
              color={errors.includes("country") ? "red" : "black"}
            />
          </View>
          <View
            style={{
              ...styles.inputContainer,
            }}
          >
            <TextInput
              style={styles.input}
              onChange={(e) =>
                setUser({ ...user, password: e.nativeEvent.text })
              }
              secureTextEntry={secure}
              placeholder="Password"
              placeholderTextColor="black"
            />
            <Ionicons
              style={{ paddingRight: 15 }}
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={errors.includes("country") ? "red" : "black"}
              onPress={() => setSecure(!secure)}
            />
          </View>
          {!signin && (
            <>
              <View
                style={{
                  ...styles.inputContainer,
                }}
              >
                <TextInput
                  style={styles.input}
                  onChange={(e) =>
                    setUser({ ...user, img: e.nativeEvent.text })
                  }
                  placeholder="Profile picture URL (optional)"
                  placeholderTextColor="black"
                />
                <Ionicons
                  style={{ paddingRight: 15 }}
                  name="md-image-outline"
                  size={24}
                  color={errors.includes("country") ? "red" : "black"}
                />
              </View>
              <View style={{ width: 300 }}>
                <DropDownPicker
                  listMode="MODAL"
                  modalProps={{
                    animationType: "fade",
                  }}
                  modalContentContainerStyle={styles.selectModal}
                  placeholder="Select your country"
                  style={{
                    ...styles.inputContainer,
                    paddingLeft: 22,
                    borderColor: errors.includes("country") ? "red" : "black",
                    backgroundColor: "transparent",
                  }}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </>
          )}
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="rgba(255,255,255,0.2)"
            style={styles.buttonContainer}
            onPress={() => {
              signin ? props.logIn(user, props) : signUpHandler();
            }}
          >
            <Text style={styles.button}>
              {signin ? "Log In " : "Create an Account "}
            </Text>
          </TouchableHighlight>
          <Text style={{ fontSize: 14, color: "black" }}>
            {!signin ? "Already have an account? " : "Don't have an account? "}
            <Text
              onPress={() => setSignin(!signin)}
              style={{
                color: "black",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              {!signin ? "Log In" : "Create an Account"}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = {
  logIn: usersActions.logIn,
  signUp: usersActions.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height - 80,
    backgroundColor: "#d4c1ae",
  },
  title: {
    fontSize: 36,
    fontFamily: "LatoRegular",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { height: 0.5, width: 0.5 },
    textShadowRadius: 5,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
  },
  selectModal: {
    padding: 20,
  },
  input: {
    height: "100%",
    margin: 12,
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    width: 200,
    padding: 10,
    marginVertical: 30,
    backgroundColor: "black",
    borderRadius: 25,
  },
  button: {
    color: "white",
    fontFamily: "Lato",
    fontSize: 20,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 5,
  },
});

const countries = [
  "Afganistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Indian Ocean Ter",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Canary Islands",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Channel Islands",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos Island",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote DIvoire",
  "Croatia",
  "Cuba",
  "Curaco",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Ter",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Great Britain",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Hawaii",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "Indonesia",
  "India",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea North",
  "Korea Sout",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malaysia",
  "Malawi",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Midway Islands",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Nambia",
  "Nauru",
  "Nepal",
  "Netherland Antilles",
  "Netherlands",
  "Nevis",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau Island",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Phillipines",
  "Pitcairn Island",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of Montenegro",
  "Republic of Serbia",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "St Barthelemy",
  "St Eustatius",
  "St Helena",
  "St Kitts-Nevis",
  "St Lucia",
  "St Maarten",
  "St Pierre & Miquelon",
  "St Vincent & Grenadines",
  "Saipan",
  "Samoa",
  "Samoa American",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tahiti",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos Is",
  "Tuvalu",
  "Uganda",
  "United Kingdom",
  "Ukraine",
  "United Arab Erimates",
  "United States of America",
  "Uraguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City State",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (Brit)",
  "Virgin Islands (USA)",
  "Wake Island",
  "Wallis & Futana Is",
  "Yemen",
  "Zaire",
  "Zambia",
  "Zimbabwe",
];
