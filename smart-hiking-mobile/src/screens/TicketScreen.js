import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function TicketScreen() {

  return (

    <LinearGradient
      colors={["#02120D", "#041B14", "#02120D"]}
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>
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
            Hiking Pass
          </Text>

          <Text style={styles.title}>
            Your QR Ticket
          </Text>

        </View>

        {/* TICKET */}

        <View style={styles.ticket}>

          {/* TOP */}

          <View style={styles.topSection}>

            <Text style={styles.mountain}>
              Mount Tanggamus
            </Text>

            <View style={styles.statusBadge}>

              <Text style={styles.statusText}>
                APPROVED
              </Text>

            </View>

          </View>

          {/* INFO */}

          <View style={styles.infoWrapper}>

            <View>

              <Text style={styles.label}>
                Hiking Date
              </Text>

              <Text style={styles.value}>
                12 May 2026
              </Text>

            </View>

            <View>

              <Text style={styles.label}>
                Total Person
              </Text>

              <Text style={styles.value}>
                3 Person
              </Text>

            </View>

          </View>

          {/* DIVIDER */}

          <View style={styles.divider} />

          {/* QR */}

          <View style={styles.qrWrapper}>

            <Image

              source={{
                uri:
                  "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=SMART-HIKING-TICKET",
              }}

              style={styles.qr}

            />

          </View>

          <Text style={styles.scanText}>
            Scan this QR at basecamp gate
          </Text>

        </View>

      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  backButton: {
  marginTop: 10,
  marginBottom: 10,
},

backText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600",
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

  ticket: {

    backgroundColor: "rgba(255,255,255,0.05)",

    borderRadius: 34,

    padding: 24,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.05)",
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mountain: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  statusBadge: {

    backgroundColor: "#22C55E",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 14,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  label: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 8,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {

    height: 1,

    backgroundColor: "rgba(255,255,255,0.08)",

    marginVertical: 30,
  },

  qrWrapper: {
    alignItems: "center",
  },

  qr: {
    width: 240,
    height: 240,
    borderRadius: 20,
  },

  scanText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 22,
    fontSize: 14,
  },

});