import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getMyBookings,
} from "../api/booking";



export default function HistoryScreen() {

  const [bookings, setBookings] =
  useState([]);

const [loading, setLoading] =
  useState(true);

  const fetchBookings =
  async () => {

  try {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const response =
      await getMyBookings(
        token
      );

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    setBookings(
      response.data.data
    );

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  fetchBookings();

}, []);

  const getStatusColor = (status) => {

    switch (status) {

      case "APPROVED":
        return "#22C55E";

      case "PENDING":
        return "#EAB308";

      case "FINISHED":
        return "#38BDF8";

      default:
        return "#EF4444";
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
              Hiking Activity
            </Text>

            <Text style={styles.title}>
              Booking History
            </Text>

          </View>

          {/* BOOKING LIST */}

          {bookings.map((item) => (

            <View
              key={item.id}
              style={styles.card}
            >

              {/* TOP */}

              <View style={styles.topRow}>

                <View>

                  <Text style={styles.mountain}>
                    Mount Tanggamus
                  </Text>

                  <Text style={styles.date}>
                    {new Date(
                      item.hikingDate
                    ).toLocaleDateString(
                      "id-ID",
                      {

                        day: "numeric",

                        month: "long",

                        year: "numeric",
 
                      }
                    )}
                  </Text>

                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        getStatusColor(item.status),
                    },
                  ]}
                >

                  <Text style={styles.statusText}>
                    {item.status}
                  </Text>

                </View>

              </View>

              {/* BOTTOM */}

              <View style={styles.bottomRow}>

                <Text style={styles.info}>
                  👥 {item.totalPerson} Person
                </Text>

                <Text style={styles.info}>
                  Mt. Tanggamus
                </Text>

              </View>

            </View>

          ))}

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
  marginTop: 10,
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

    borderRadius: 28,

    padding: 20,

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.04)",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mountain: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  date: {
    color: "#9CA3AF",
    marginTop: 6,
    fontSize: 14,
  },

  statusBadge: {

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 14,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  info: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "500",
  },

});