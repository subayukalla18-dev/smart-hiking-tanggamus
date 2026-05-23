import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from
"@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [showForm, setShowForm] =
    useState(false);

    const handleLogout =
  async () => {

  try {

    await AsyncStorage.removeItem(
      "token"
    );

    router.replace("/login");

  } catch (error) {

    console.log(error);

  }

};

  return (

    <LinearGradient
      colors={["#02120D", "#041B14", "#02120D"]}
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >

            <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
>

  <Text style={styles.backText}>
    ← Back
  </Text>

</TouchableOpacity>
          {/* HEADER */}

          <View style={styles.header}>

            <Text style={styles.subtitle}>
              Your Account
            </Text>

            <Text style={styles.title}>
              Profile
            </Text>

          </View>

          {/* PROFILE CARD */}

          <View style={styles.profileCard}>

  <Image
    source={{
      uri: "https://i.pravatar.cc/300",
    }}
    style={styles.avatar}
  />

  <TouchableOpacity
    style={styles.changePhotoButton}
  >

    <Text style={styles.changePhotoText}>
      Change Photo
    </Text>

  </TouchableOpacity>

  <Text style={styles.name}>
    Muhammad Radityo
  </Text>

  <Text style={styles.email}>
    radit@gmail.com
  </Text>

  <TouchableOpacity
  style={styles.editButton}
  onPress={() =>
    setShowForm(!showForm)
  }
>

  <Text style={styles.editButtonText}>

    {showForm
      ? "Close Edit"
      : "Edit Profile"}

  </Text>

</TouchableOpacity>

  {showForm && (

<View style={styles.formWrapper}>

    <TextInput
      placeholder="Full Name"
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />

    <TextInput
      placeholder="Email"
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />

    <TextInput
      placeholder="Phone Number"
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />

    <TextInput
      placeholder="Address"
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />

  </View>
  )}

  <TouchableOpacity style={styles.saveButton}>

    <Text style={styles.saveText}>
      Save Profile
    </Text>

  </TouchableOpacity>

</View>

          {/* STATS */}

          <View style={styles.statsWrapper}>

            <View style={styles.statsCard}>

              <Text style={styles.statsValue}>
                12
              </Text>

              <Text style={styles.statsLabel}>
                Hiking
              </Text>

            </View>

            <View style={styles.statsCard}>

              <Text style={styles.statsValue}>
                8
              </Text>

              <Text style={styles.statsLabel}>
                Finished
              </Text>

            </View>

            <View style={styles.statsCard}>

              <Text style={styles.statsValue}>
                2
              </Text>

              <Text style={styles.statsLabel}>
                Active
              </Text>

            </View>

          </View>

          {/* MENU */}

          <View style={styles.menuCard}>

            <TouchableOpacity style={styles.menuItem}>

              <Text style={styles.menuText}>
                📜 Booking History
              </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>

              <Text style={styles.menuText}>
                💳 Payment
              </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>

              <Text style={styles.menuText}>
                ⚙ Settings
              </Text>

            </TouchableOpacity>

          </View>

          {/* LOGOUT */}

          <TouchableOpacity style={styles.logoutButton}>
            onPress={handleLogout}

            <Text style={styles.logoutText}>
              Logout
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  editButton: {

  paddingVertical: 16,
  borderRadius: 20,
  alignItems: "center",
  marginTop: 28,
},

editButtonText: {

  color: "#69F0AE",
  fontWeight: "700",
  fontSize: 15,
},

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 28,
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },

  profileCard: {

    backgroundColor: "rgba(255,255,255,0.05)",

    borderRadius: 34,

    padding: 28,

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.05)",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  email: {
    color: "#9CA3AF",
    marginTop: 8,
    fontSize: 15,
  },

  statsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  statsCard: {

    flex: 1,

    backgroundColor: "rgba(255,255,255,0.05)",

    borderRadius: 24,

    paddingVertical: 22,

    marginHorizontal: 4,

    alignItems: "center",
  },

  statsValue: {
    color: "#69F0AE",
    fontSize: 24,
    fontWeight: "700",
  },

  statsLabel: {
    color: "#9CA3AF",
    marginTop: 8,
    fontSize: 13,
  },

  menuCard: {

    backgroundColor: "rgba(255,255,255,0.05)",

    borderRadius: 30,

    marginTop: 28,

    paddingVertical: 8,
  },

  menuItem: {

    paddingVertical: 20,

    paddingHorizontal: 22,

    borderBottomWidth: 1,

    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  menuText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },

  logoutButton: {

    marginTop: 34,

    backgroundColor: "#EF4444",

    paddingVertical: 18,

    borderRadius: 24,

    alignItems: "center",
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  backButton: {
  marginTop: 20,
  marginBottom: 20,
},

backText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "500",
},

changePhotoButton: {
  marginBottom: 20,
},

changePhotoText: {
  color: "#69F0AE",
  fontWeight: "600",
},

formWrapper: {
  width: "100%",
  marginTop: 28,
},

input: {
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: 18,
  paddingVertical: 16,
  paddingHorizontal: 18,
  color: "#FFFFFF",
  marginBottom: 16,
},

saveButton: {
  backgroundColor: "#69F0AE",
  paddingVertical: 18,
  borderRadius: 22,
  alignItems: "center",
  marginTop: 12,
  width: "100%",
},

saveText: {
  color: "#02120D",
  fontWeight: "700",
  fontSize: 16,
},

});