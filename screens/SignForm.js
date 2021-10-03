import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
  const signin = props.route.name == "signin";
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
    let errors = await props.signUp(user);
    errors && setErrors(errors.map((err) => err.field));
  };
  console.log(errors);
  const getStorage = async () => {
    try {
      let token = await AsyncStorage.getItem("tokenMyTinerary");
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  };
  getStorage();
  return (
    <ScrollView>
      <SafeAreaView style={styles.formContainer}>
        <Text style={styles.title}>
          {signin ? "Log In" : "Create an Account"}
        </Text>
        {!signin && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.nativeEvent.text.trim() })
                }
                // value={text}
                placeholder="First Name"
                placeholderTextColor="black"
              />
              <Ionicons
                style={{ paddingRight: 15 }}
                name="person-outline"
                size={24}
                color="black"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.nativeEvent.text.trim() })
                }
                // value={text}
                placeholder="Last Name"
                placeholderTextColor="black"
              />
              <Ionicons
                style={{ paddingRight: 15 }}
                name="person-outline"
                size={24}
                color="black"
              />
            </View>
          </>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.nativeEvent.text.toLowerCase().trim(),
              })
            }
            placeholder="Email"
            placeholderTextColor="black"
          />
          <Ionicons
            style={{ paddingRight: 15 }}
            name="ios-mail-open-outline"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChange={(e) => setUser({ ...user, password: e.nativeEvent.text })}
            secureTextEntry={secure}
            placeholder="Password"
            placeholderTextColor="black"
          />
          <Ionicons
            style={{ paddingRight: 15 }}
            name={secure ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="black"
            onPress={() => setSecure(!secure)}
          />
        </View>
        {!signin && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChange={(e) => setUser({ ...user, img: e.nativeEvent.text })}
                placeholder="Profile picture URL (optional)"
                placeholderTextColor="black"
              />
              <Ionicons
                style={{ paddingRight: 15 }}
                name="md-image-outline"
                size={24}
                color="black"
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
                style={{ ...styles.inputContainer, paddingLeft: 22 }}
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
          underlayColor="white"
          style={styles.buttonContainer}
          onPress={() => {
            // console.log(user);
            signin ? props.logIn(user) : signUpHandler();
          }}
        >
          <Text style={styles.button}>
            {signin ? "Log In" : "Create an Account"}
          </Text>
        </TouchableHighlight>
      </SafeAreaView>
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
  getCountries: usersActions.getCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);

const styles = StyleSheet.create({
  formContainer: { flex: 1, alignItems: "center" },
  title: { fontSize: 30, fontFamily: "Lato", color: "red", marginVertical: 40 },
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
    width: 100,
    padding: 10,
    marginTop: 30,
    backgroundColor: "#e6e1dd",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    color: "black",
    fontFamily: "Lato",
    fontSize: 20,
    textAlign: "center",
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
