import React, {
  useState,
} from "react";
import { router } from "expo-router";
import client from "../api/client";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createBooking }
from "../api/booking";

export default function BookingScreen() {
  const [hikingDate, setHikingDate] =
  useState("");

const [totalPerson, setTotalPerson] =
  useState("");

const [nik, setNik] =
  useState("");

const [phone, setPhone] =
  useState("");

const [address, setAddress] =
  useState("");

const [
  emergencyContact,
  setEmergencyContact,
] = useState("");

const [loading, setLoading] =
  useState(false);

  const handleBooking =
  async () => {

  try {

    setLoading(true);

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const response =
      await createBooking(

        {
          hikingDate,
          totalPerson:
            Number(totalPerson),
          nik,
          phone,
          address,
          emergencyContact,
        },

        token
      );

    console.log(
      response.data
    );

    alert(
      "Booking berhasil 🔥"
    );

    router.push("/history");

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

    alert("Booking gagal");

  } finally {

    setLoading(false);

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
              Hiking Booking
            </Text>

            <Text style={styles.title}>
              Book Your Adventure
            </Text>

          </View>

          {/* FORM CARD */}

          <View style={styles.card}>

            <Text style={styles.label}>
              Hiking Date
            </Text>

            <TextInput
              placeholder="2026-05-10"
              placeholderTextColor="#6B7280"
              style={styles.input}
              value={hikingDate}
              onChangeText={setHikingDate}
            />

            <Text style={styles.label}>
              Total Person
            </Text>

            <TextInput
              placeholder="3"
              placeholderTextColor="#6B7280"
              style={styles.input}
              keyboardType="numeric"
              value={totalPerson}
              onChangeText={setTotalPerson}
            />

            <Text style={styles.label}>
              NIK
            </Text>

            <TextInput
              placeholder="1234567890123456"
              placeholderTextColor="#6B7280"
              style={styles.input}
              keyboardType="numeric"
              value={nik}
              onChangeText={setNik}
            />

            <Text style={styles.label}>
              Phone Number
            </Text>

            <TextInput
              placeholder="08123456789"
              placeholderTextColor="#6B7280"
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>
              Address
            </Text>

            <TextInput
              placeholder="Bandar Lampung"
              placeholderTextColor="#6B7280"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.label}>
              Emergency Contact
            </Text>

            <TextInput
              placeholder="08111111111"
              placeholderTextColor="#6B7280"
              style={styles.input}
              keyboardType="phone-pad"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />

            {/* BUTTON */}

            <TouchableOpacity
              style={styles.button}
              onPress={handleBooking}
            >

              <Text style={styles.buttonText}>
                Book Now
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({
    backButton: {
  marginTop: 20,
  marginLeft: 24,
    },

    backText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    },

  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
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

  card: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 32,
    padding: 22,
  },

  label: {
    color: "#D1D5DB",
    fontSize: 14,
    marginBottom: 10,
    marginTop: 14,
    fontWeight: "500",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: "#FFFFFF",
    fontSize: 15,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#69F0AE",
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
  },

  buttonText: {
    color: "#02120D",
    fontSize: 16,
    fontWeight: "700",
  },

});