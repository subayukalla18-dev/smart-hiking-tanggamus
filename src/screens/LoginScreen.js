import { useState } from "react";


import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from "../api/auth";

export default function LoginScreen() {

  const [showLoginForm, setShowLoginForm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    alert("Google Login");
  };

 const handleEmailLogin = async () => {

  if (!email || !password) {

    alert("Isi email & password dulu");

    return;
  }

  try {

    setLoading(true);

    const response = await login({

      email,
      password,

    });

    console.log(response.data);

    /*
      BACKEND BAYU RESPONSE:

      {
        success: true,
        data: {
          access_token: "..."
        }
      }
    */

    const token =
      response.data.data.access_token;

    // SAVE TOKEN
    await AsyncStorage.setItem(
      "token",
      token
    );

    console.log(
      "TOKEN:",
      token
    );

    alert("Login berhasil 🔥");

    // GO DASHBOARD
    router.replace("/(tabs)");

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    alert("Login gagal");

  } finally {

    setLoading(false);

  }

};

  return (

  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >

    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
        <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#03150F", "#06251B", "#03150F"]}
        style={styles.container}
      >
        {/* GLOW */}
        <View style={styles.glowCircle} />

        <SafeAreaView style={styles.safeArea}>

          {/* LOGO */}
          <View style={styles.logoWrapper}>

  <Image
    source={require("../../assets/images/Tanggamuz.png")}
    style={{
      width: 150,
      height: 150,
       marginBottom: 12,

       marginTop: -40,
    }}
  />

</View>

          {/* TITLE */}
          <View style={styles.header}>

            <Text style={styles.mainTitle}>
              SMART HIKING
            </Text>

            <Text style={styles.subTitle}>
              Track every journey safely
            </Text>

            <Text style={styles.tagline}>
              Safety First Hiking System
            </Text>

          </View>

          {/* CARD */}
          <View style={styles.card}>

            <Text style={styles.signText}>
              Sign in to start trek
            </Text>
            <Text style={styles.smallDesc}>
              Monitor your hiking journey safely
            </Text>

            {!showLoginForm ? (
              <>
                {/* GOOGLE BUTTON */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.googleButton}
                  onPress={handleGoogleLogin}
                >
                  <Ionicons
                    name="logo-google"
                    size={22}
                    color="#EA4335"
                  />

                  <Text style={styles.googleText}>
                    LOGIN WITH GOOGLE
                  </Text>
                </TouchableOpacity>

                {/* EMAIL BUTTON */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setShowLoginForm(true)}
                >
                  <LinearGradient
                    colors={["#65E0A3", "#46C98C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.emailButton}
                  >
                    <Ionicons
                      name="person-outline"
                      size={22}
                      color="white"
                    />

                    <Text style={styles.emailText}>
                      LOGIN WITH EMAIL
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* EMAIL INPUT */}
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#A7B0AC"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />

                {/* PASSWORD INPUT */}
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#A7B0AC"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />

                {/* LOGIN BUTTON */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleEmailLogin}
                >
                  <LinearGradient
                    colors={["#65E0A3", "#46C98C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.emailButton}
                  >
                    <Text style={styles.emailText}>
                      {loading ? "Loading..." : "LOGIN"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}

            {/* REGISTER */}
            <View style={styles.registerWrapper}>

  <Text style={styles.registerLabel}>
    DON'T HAVE AN ACCOUNT?
  </Text>

  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() =>
      router.push("/register")
    }
  >

    <Text style={styles.registerText}>
      REGISTER NOW
    </Text>

  </TouchableOpacity>

</View>

          </View>
        </SafeAreaView>
      </LinearGradient>
      </ScrollView>
    </TouchableWithoutFeedback>
    
  </KeyboardAvoidingView>

);
}

const styles = StyleSheet.create({
  mainTitle: {

  color: "#FFFFFF",
  fontSize: 46,
  marginBottom: 10,
  fontWeight: "900",
  letterSpacing: -2,
  fontStyle: "italic",
},

subTitle: {

  color: "#8FA59C",
  marginTop: 8,
  marginBottom: 6,
  fontSize: 15,
  letterSpacing: 0,
},

tagline: {

  color: "#69F0AE",
  marginTop: 0,
  marginBottom: 18,
  fontSize: 13,
  fontWeight: "700",
  letterSpacing: 0,
},

  logo: {
  width: 90,
  height: 90,
  resizeMode: "contain",
},

  container: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "space-between",
  },

  safeArea: {
  flex: 1,
  justifyContent: "center",
  paddingBottom: 20,
},

  glowCircle: {

  position: "absolute",
  top: -40,
  alignSelf: "center",
  width: 520,
  height: 520,
  borderRadius: 999,
  backgroundColor: "#0F3B2C",
  opacity: 0.10,
},

  logoWrapper: {
    alignItems: "center",
    marginTop: 32,
  },

  header: {
  alignItems: "center",
  marginTop: -5,
  marginBottom: 34,
},

  welcome: {
  color: "white",
  fontSize: 64,
  fontWeight: "900",
  fontStyle: "italic",
  letterSpacing: -3,
},

  subtitle: {
  color: "#8FA59C",
  textAlign: "center",
  marginTop: 10,
  fontSize: 15,
  letterSpacing: 4,
  lineHeight: 24,
  fontWeight: "500",
},

card: {

  marginTop: -25,
  marginBottom: 12,
  backgroundColor:
    "rgba(255,255,255,0.06)",

  borderRadius: 34,
  paddingHorizontal: 24,
  paddingVertical: 26,
  borderWidth: 1,
  borderColor:
    "rgba(255,255,255,0.05)",

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },

  shadowOpacity: 0.18,
  shadowRadius: 20,
  elevation: 8,
},

  signText: {
  color: "white",
  textAlign: "center",
  fontSize: 18,
  fontWeight: "700",
  fontStyle: "italic",
  marginBottom: 10,
},

  googleButton: {
    backgroundColor: "white",
    borderRadius: 999,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 20,
    marginBottom: 20,
  },

  googleText: {
    color: "#1F4334",
    fontWeight: "600",
    fontSize: 17,
    marginLeft: 12,
  },

  emailButton: {
    borderRadius: 999,
    shadowColor: "#69F0AE",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 20,
  },

  emailText: {
    color: "black",
    fontWeight: "600",
    fontSize: 17,
    marginLeft: 12,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 18,
    color: "white",
    fontSize: 16,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  registerWrapper: {
    alignItems: "center",
    marginTop: 24,
  },

  registerLabel: {
    color: "#6B7F76",
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: "700",
  },

  registerText: {
    color: "#59D7A1",
    marginTop: 14,
    fontSize: 18,
    fontWeight: "800",
  },

  smallDesc: {

  color: "#8FA59C",
  textAlign: "center",
  fontSize: 13,
  marginBottom: 24,
},

});