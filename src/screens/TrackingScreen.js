import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function TrackingScreen() {

  const [status, setStatus] = useState("CHECK_IN");

  const nextStatus = () => {

    if (status === "CHECK_IN") {
      setStatus("ON_HIKE");

    } else if (status === "ON_HIKE") {
      setStatus("FINISHED");
    }
  };

  return (

    <LinearGradient
      colors={["#02120D", "#041B14", "#02120D"]}
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.smallText}>
            SMART HIKING
          </Text>

          <Text style={styles.title}>
            Tracking Pendaki
          </Text>

          <Text style={styles.subtitle}>
            Realtime hiking activity status
          </Text>

        </View>

        {/* STATUS CARD */}

        <LinearGradient
          colors={["#67E8B4", "#34D399"]}
          style={styles.statusCard}
        >

          <Text style={styles.statusLabel}>
            CURRENT STATUS
          </Text>

          <Text style={styles.statusText}>
            {status}
          </Text>

          <Text style={styles.statusDesc}>

            {status === "CHECK_IN" &&
              "Pendaki sudah check-in di basecamp"}

            {status === "ON_HIKE" &&
              "Pendaki sedang melakukan pendakian"}

            {status === "FINISHED" &&
              "Pendakian telah selesai dengan aman"}

          </Text>

        </LinearGradient>

        {/* TIMELINE */}

        <View style={styles.timelineCard}>

          <Text style={styles.timelineTitle}>
            Tracking Timeline
          </Text>

          {/* CHECK IN */}

          <View style={styles.timelineItem}>

            <View style={styles.activeCircle} />

            <View style={styles.timelineContent}>

              <Text style={styles.activeText}>
                CHECK_IN
              </Text>

              <Text style={styles.timelineDesc}>
                Pendaki check-in di basecamp
              </Text>

            </View>

          </View>

          <View style={styles.line} />

          {/* ON HIKE */}

          <View style={styles.timelineItem}>

            <View
              style={
                status === "ON_HIKE" ||
                status === "FINISHED"
                  ? styles.activeCircle
                  : styles.circle
              }
            />

            <View style={styles.timelineContent}>

              <Text
                style={
                  status === "ON_HIKE" ||
                  status === "FINISHED"
                    ? styles.activeText
                    : styles.inactiveText
                }
              >
                ON_HIKE
              </Text>

              <Text style={styles.timelineDesc}>
                Pendaki memulai perjalanan
              </Text>

            </View>

          </View>

          <View style={styles.line} />

          {/* FINISHED */}

          <View style={styles.timelineItem}>

            <View
              style={
                status === "FINISHED"
                  ? styles.activeCircle
                  : styles.circle
              }
            />

            <View style={styles.timelineContent}>

              <Text
                style={
                  status === "FINISHED"
                    ? styles.activeText
                    : styles.inactiveText
                }
              >
                FINISHED
              </Text>

              <Text style={styles.timelineDesc}>
                Pendakian selesai
              </Text>

            </View>

          </View>

        </View>

        {/* BUTTON */}

        {status !== "FINISHED" && (

          <TouchableOpacity
            style={styles.button}
            onPress={nextStatus}
          >

            <Text style={styles.buttonText}>

              {status === "CHECK_IN"
                ? "Mulai Mendaki"
                : "Selesaikan Pendakian"}

            </Text>

          </TouchableOpacity>

        )}

        {status === "FINISHED" && (

          <View style={styles.finishedBox}>

            <Text style={styles.finishedText}>
              Pendakian selesai 🎉
            </Text>

          </View>

        )}

      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    marginTop: 35,
    marginBottom: 28,
  },

  smallText: {
    color: "#67E8B4",
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "#8FA39B",
    marginTop: 10,
    fontSize: 15,
  },

  statusCard: {

    borderRadius: 32,

    padding: 28,

    marginBottom: 28,

    shadowColor: "#67E8B4",
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 10,
  },

  statusLabel: {
    color: "#064E3B",

    fontSize: 13,
    fontWeight: "600",

    letterSpacing: 2,
  },

  statusText: {
    color: "#02120D",

    fontSize: 34,
    fontWeight: "700",

    marginTop: 12,
  },

  statusDesc: {
    color: "#064E3B",

    marginTop: 14,

    fontSize: 15,

    lineHeight: 22,
  },

  timelineCard: {

    backgroundColor: "rgba(255,255,255,0.05)",

    borderRadius: 28,

    padding: 24,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },

  timelineTitle: {
    color: "#FFFFFF",

    fontSize: 18,
    fontWeight: "600",

    marginBottom: 24,
  },

  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  timelineContent: {
    marginLeft: 18,
  },

  activeCircle: {
    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#67E8B4",
  },

  circle: {
    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#3B4A45",
  },

  line: {
    width: 2,
    height: 38,

    backgroundColor: "#2E3D38",

    marginLeft: 8,

    marginVertical: 8,
  },

  activeText: {
    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "600",
  },

  inactiveText: {
    color: "#7C8A87",

    fontSize: 15,
    fontWeight: "500",
  },

  timelineDesc: {
    color: "#8FA39B",

    marginTop: 6,

    fontSize: 14,

    lineHeight: 20,
  },

  button: {

    backgroundColor: "#67E8B4",

    paddingVertical: 18,

    borderRadius: 22,

    alignItems: "center",

    marginTop: 28,
  },

  buttonText: {
    color: "#02120D",

    fontSize: 16,
    fontWeight: "600",
  },

  finishedBox: {

    backgroundColor: "rgba(103,232,180,0.12)",

    padding: 22,

    borderRadius: 22,

    alignItems: "center",

    marginTop: 28,
  },

  finishedText: {
    color: "#67E8B4",

    fontSize: 16,
    fontWeight: "600",
  },

});