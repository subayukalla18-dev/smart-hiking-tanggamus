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
<View style={styles.content}>

  <Image
    source={require("../../assets/images/Tanggamuz.png")}
    style={styles.logo}
  />

  <Text style={styles.mainTitle}>
    SMART HIKING
  </Text>

  <Text style={styles.description}>
  Daftar Pendakian Gunung Tanggamus
  </Text>

  {!showLoginForm ? (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => setShowLoginForm(true)}
    >

      <LinearGradient
        colors={["#65E0A3", "#46C98C"]}
        style={styles.loginButton}
      >

        <Ionicons
          name="mail-outline"
          size={22}
          color="#000"
        />

        <Text style={styles.loginButtonText}>
          Masuk Dengan Email
        </Text>

      </LinearGradient>

    </TouchableOpacity>

  ) : (

    <View style={styles.formCard}>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleEmailLogin}
      >

        <LinearGradient
          colors={["#65E0A3", "#46C98C"]}
          style={styles.loginButton}
        >

          <Text style={styles.loginButtonText}>
            {loading
              ? "Loading..."
              : "LOGIN"}
          </Text>

        </LinearGradient>

      </TouchableOpacity>

    </View>

  )}

  <View style={styles.registerWrapper}>

    <Text style={styles.registerLabel}>
      Belum punya akun?
    </Text>

    <TouchableOpacity
      onPress={() =>
        router.push("/register")
      }
    >

      <Text style={styles.registerText}>
        Daftar Sekarang
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

content: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,

  marginTop: -80,
},

logo: {
  width: 170,
  height: 170,
  resizeMode: "contain",
  marginBottom: 20,
},

mainTitle: {
  color: "#FFFFFF",
  fontSize: 42,
  fontWeight: "900",
  fontStyle: "italic",
  marginBottom: 10,
},

description: {
  color: "#C8D1CC",
  fontSize: 16,
  textAlign: "center",
  lineHeight: 15,
  marginBottom: 50,
},

loginButton: {
  width: 285,
  height: 55,
  borderRadius: 22,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},

loginButtonText: {
  color: "#000",
  fontSize: 18,
  fontWeight: "700",
  marginLeft: 10,
},

formContainer: {
  width: "100%",
  marginTop: 20,
},

  formCard: {
    backgroundColor:
      "rgba(255,255,255,0.05)",
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
  },

registerWrapper: {
  alignItems: "center",
  marginTop: 40,
},

registerLabel: {
  color: "#9CA3AF",
  fontSize: 15,
},

registerText: {
  color: "#65E0A3",
  fontSize: 15,
  fontWeight: "700",
  marginTop: 3,
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

    backgroundColor:
      "rgba(255,255,255,0.06)",

    borderRadius: 18,

    paddingVertical: 18,

    paddingHorizontal: 20,

    color: "#FFFFFF",

    fontSize: 16,

    marginBottom: 18,
  },



  smallDesc: {

  color: "#8FA59C",
  textAlign: "center",
  fontSize: 13,
  marginBottom: 24,
},

});