import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { router } from "expo-router";

import { register } from "../api/auth";

export default function RegisterScreen() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!name || !email || !password) {

      alert("Isi semua field");

      return;
    }

    try {

      setLoading(true);

      const response = await register({

        name,
        email,
        password,

      });

      console.log(response.data);

      alert("Register berhasil 🔥");

      router.back();

} catch (error) {

  console.log("ERROR RESPONSE:");
  console.log(error.response?.data);

  console.log("ERROR STATUS:");
  console.log(error.response?.status);

  console.log("ERROR MESSAGE:");
  console.log(error.message);

  alert(
    JSON.stringify(
      error.response?.data || error.message
    )
  );

} finally {

      setLoading(false);

    }

  };

  return (

    <LinearGradient
      colors={["#02120D", "#052E24", "#02120D"]}
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
            style={styles.topBackButton}
            onPress={() => router.back()}
            >

            <Text style={styles.topBackText}>
                ← Back
            </Text>

            </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          style={{ flex: 1 }}
        >

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.content}>

              {/* TITLE */}

              <Text style={styles.title}>
                CREATE ACCOUNT
              </Text>

              <Text style={styles.subtitle}>
                Smart Hiking Tanggamus
              </Text>

              {/* FORM */}

              <View style={styles.formCard}>

                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                {/* BUTTON */}

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >

                  <Text style={styles.registerText}>

                    {loading
                      ? "Loading..."
                      : "REGISTER"}

                  </Text>

                </TouchableOpacity>

                {/* LOGIN */}

                <TouchableOpacity
                  onPress={() =>
                    router.back()
                  }
                >

                  <Text style={styles.loginText}>

                    Already have an account?
                    {" "}
                    <Text
                      style={{
                        color: "#69F0AE",
                        fontWeight: "700",
                      }}
                    >
                      Login
                    </Text>

                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </SafeAreaView>

    </LinearGradient>

  );

}

const styles = StyleSheet.create({
topBackButton: {
  paddingHorizontal: 24,
  paddingTop: 16,
},

topBackText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600",
},

    backButton: {
  marginBottom: 28,
},

backText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600",
},

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 28,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    color: "#9CA3AF",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 42,
    letterSpacing: 0,
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

  registerButton: {

    backgroundColor: "#69F0AE",

    paddingVertical: 18,

    borderRadius: 22,

    alignItems: "center",

    marginTop: 8,
  },

  registerText: {

    color: "#02120D",

    fontWeight: "800",

    fontSize: 18,
  },

  loginText: {

    color: "#9CA3AF",

    textAlign: "center",

    marginTop: 26,

    fontSize: 14,
  },

});