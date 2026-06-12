import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import * as Location from "expo-location";
import { ImageBackground } from "react-native";
import { router } from "expo-router";
import { getProfile } from "../api/auth";
import { getMyBookings } from "../api/booking";

export default function DashboardScreen() {
  const pulseAnim =
  useRef(new Animated.Value(1))
  .current;

  const [greeting, setGreeting] =
  useState("");

  const [userName, setUserName] =
  useState("");

  const [activeBooking, setActiveBooking] =
  useState(null);

  const [recentBookings, setRecentBookings] =
  useState([]);  

  useEffect(() => {

  loadProfile();
  loadBookings();
  loadGreeting();

}, []);

useEffect(() => {

  Animated.loop(

    Animated.sequence([

      Animated.timing(
        pulseAnim,
        {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        pulseAnim,
        {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }
      ),

    ])

  ).start();

}, []);

const loadProfile = async () => {

  try {

    const token =
      await AsyncStorage.getItem("token");

    if (!token) return;

    const response =
      await getProfile(token);

    console.log(response.data);

    /*
      backend:
      response.data.data.name
    */

    setUserName(
      response.data.data.name
    );

  } catch (error) {

    console.log(error);

  }
};

const loadBookings = async () => {

  try {

    const token =
      await AsyncStorage.getItem("token");

    const response =
      await getMyBookings(token);

    const bookings =
      response.data.data || [];

    const active =
      bookings.find(
        (item) =>
          item.status !== "FINISHED"
      );

    setActiveBooking(active || null);

    setRecentBookings(
      bookings
        .slice()
        .reverse()
        .slice(0, 3)
    );

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

  }

};

const loadGreeting = () => {

  const hour =
    new Date().getHours();
  if (hour >= 4 && hour < 11) {
    setGreeting("Selamat Pagi");
  } else if (hour >= 11 && hour < 15) {
    setGreeting("Selamat Siang");
  } else if (hour >= 15 && hour < 18) {
    setGreeting("Selamat Sore");
  } else {
    setGreeting("Selamat Malam");
  }
};



  const { name } = useLocalSearchParams();
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {

  fetchWeather();

}, []);

const fetchWeather = async () => {

  try {

    // izin lokasi

    let { status } =

      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {

      console.log("Izin lokasi ditolak");

      return;

    }

    // ambil koordinat user

    const location =

      await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;

    const longitude = location.coords.longitude;

    // fetch weather realtime lokasi user

    const response = await axios.get(

      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a93339cc1662e625cef7bdb68717889a`

    );

    setWeather(response.data);

    setCity(response.data.name);

  } catch (error) {

    console.log(error);

  }

};

const latestBooking =
  recentBookings.length > 0
    ? recentBookings[0]
    : null;
  
  const currentStatus =
  latestBooking?.status || "PENDING";

  const isApproved =
    currentStatus === "APPROVED";

  const isOnHike =
    currentStatus === "ON_HIKE";

  const isFinished =
    currentStatus === "FINISHED";

  return (

    <LinearGradient
      colors={["#02120D", "#041B14", "#02120D"]}
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {/* TOP */}

          <View style={styles.topBar}>

            <View>

              <Text style={styles.welcome}>
                {greeting}
              </Text>

              <Text style={styles.name}>
                {userName || "User"}
              </Text>

            </View>

            <TouchableOpacity
  style={styles.avatar}
  onPress={() => router.push("/profile")}
>

  <Text style={styles.avatarText}>
    R
  </Text>

</TouchableOpacity>

          </View>

          {/* HERO CARD */}

          <LinearGradient
  colors={["#69F0AE", "#34D399"]}
  style={styles.heroCard}
>

  <Text style={styles.heroLabel}>
    TRACKING STATUS
  </Text>

  <Text style={styles.heroStatus}>
  {currentStatus}
  </Text>

  <Text style={styles.heroDesc}>
    {currentStatus === "PENDING"
      ? "Waiting admin approval"
      : currentStatus === "APPROVED"
      ? "Booking has been approved"
      : currentStatus === "ON_HIKE"
      ? "You are currently hiking Mount Tanggamus"
      : "Hiking completed"}
  </Text>

  {/* TRACKER */}

  <View style={styles.trackerWrapper}>

    {/* STEP 1 */}

    <View style={styles.stepItem}>

      <View style={styles.activeStep} />

      <Text style={styles.stepText}>
        CHECK-IN
      </Text>

    </View>

    <View style={styles.stepLine} />

    {/* STEP 2 */}

    <View style={styles.stepItem}>

      <View
        style={
          isApproved ||
          isOnHike ||
          isFinished
            ? styles.activeStep
            : styles.inactiveStep
        }
      />

      <Text style={styles.stepText}>
        APPROVED
      </Text>

    </View>

    <View style={styles.stepLine} />

    {/* STEP 3 */}

    {/* STEP 3 */}

<View style={styles.stepItem}>

{isOnHike ? (

  <Animated.View
    style={[
      styles.activeStep,
      {
        opacity: pulseAnim,
        transform: [
          {
            scale: pulseAnim,
          },
        ],
      },
    ]}
  />

) : (

  <View
    style={
      isFinished
        ? styles.activeStep
        : styles.inactiveStep
    }
  />

)}

  <Text style={styles.stepText}>
    ON HIKE
  </Text>

</View>

    <View
      style={[
        styles.stepLine,
        {
          backgroundColor:
            "rgba(255,255,255,0.35)",
        },
      ]}
    />

    {/* STEP 4 */}

    <View style={styles.stepItem}>

      {isFinished ? (

  <Animated.View
    style={[
      styles.activeStep,
      {
        opacity: pulseAnim,
        transform: [
          {
            scale: pulseAnim,
          },
        ],
      },
    ]}
  />

) : (

  <View style={styles.inactiveStep} />

)}

      <Text style={styles.stepText}>
        FINISHED
      </Text>

    </View>

  </View>

  {/* EXTRA INFO */}

</LinearGradient>

          {/* INFO */}

          <View style={styles.infoWrapper}>

            <TouchableOpacity
            style={styles.passCard}
            disabled={!activeBooking}
            onPress={() => {
              if (activeBooking) {
                router.push("/ticket");
              }
            }}
          >

  <Text style={styles.passLabel}>
  HIKING PASS
</Text>

{activeBooking ? (
  <>

    <Text style={styles.passMountain}>
      Mt. Tanggamus
    </Text>

    <Text style={styles.passDate}>
      {new Date(
        activeBooking.hikingDate
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </Text>

    <View style={styles.passStatusRow}>

      <Animated.View
        style={[
          styles.activeDot,
          {
            opacity: pulseAnim,
            transform: [
              {
                scale: pulseAnim,
              },
            ],
          },
        ]}
      />

      <Text style={styles.passStatus}>
        {activeBooking.status}
      </Text>

    </View>

    <Text style={styles.viewTicket}>
      View Ticket →
    </Text>

  </>
) : (
  <>
    <Text style={styles.passMountain}>
      No Active Ticket
    </Text>

    <Text style={styles.passDate}>
      No available hiking pass
    </Text>
  </>
)}

</TouchableOpacity>

            <LinearGradient

  colors={

    weather?.weather[0]?.main === "Rain"

      ? ["#1E3A5F", "#0F172A"]

      : weather?.weather[0]?.main === "Clouds"

      ? ["#475569", "#1E293B"]

      : ["#2563EB", "#60A5FA"]

  }

  style={styles.weatherCard}
>

  <Text style={styles.weatherLocation}>
  {city || "Loading..."}
  </Text>

  <Text style={styles.weatherDegree}>
    {weather?.main?.temp || "--"}°
  </Text>

  <Text style={styles.weatherCondition}>

    {weather?.weather[0]?.main || "Loading"}

  </Text>

  <Text style={styles.weatherHighLow}>
    H:32°  L:25°
  </Text>

</LinearGradient>

          </View>

          {/* ACTIONS */}

          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/booking")}
          >

            <Text style={styles.actionText}>
              Book Hiking
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/history")}
          >

            <Text style={styles.secondaryText}>
              View Hiking Story
            </Text>

          </TouchableOpacity>

         <Text style={styles.sectionTitle}>
  Recent Activity
</Text>

{latestBooking ? (

  <View style={styles.activityCard}>

    <Text style={styles.activityTitle}>
      Booking Pendakian
    </Text>

    <Text style={styles.activityTime}>
      {new Date(
        latestBooking.hikingDate
      ).toLocaleDateString("id-ID")}
    </Text>

    <Text
      style={{
        marginTop: 6,
        fontWeight: "700",
        color:
          latestBooking.status === "APPROVED"
            ? "#22C55E"
            : latestBooking.status === "PENDING"
            ? "#EAB308"
            : "#38BDF8",
      }}
    >
      {latestBooking.status}
    </Text>

  </View>

) : (

  <View style={styles.activityCard}>

    <Text style={styles.activityTitle}>
      Belum ada aktivitas
    </Text>

    <Text style={styles.activityTime}>
      Silakan buat booking terlebih dahulu
    </Text>

  </View>

)}



</ScrollView>

      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({
passCard: {

  flex: 1,
  height: 180,
  backgroundColor:
    "rgba(255,255,255,0.06)",

  borderRadius: 28,
  padding: 20,
  justifyContent: "space-between",
  borderWidth: 1,

  borderColor:
    "rgba(255,255,255,0.06)",
},

passLabel: {

  color: "#69F0AE",
  fontSize: 12,
  fontWeight: "700",
  letterSpacing: 0,
},

passMountain: {

  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "800",
  marginTop: 8,
},

passDate: {

  color: "#8FA59C",
  fontSize: 13,
  marginTop: 4,
},

passStatusRow: {

  flexDirection: "row",
  alignItems: "center",
},

activeDot: {

  width: 10,
  height: 10,
  borderRadius: 999,
  backgroundColor: "#69F0AE",
  marginRight: 8,
},

passStatus: {

  color: "#69F0AE",
  fontSize: 12,
  fontWeight: "700",
},

viewTicket: {

  color: "#FFFFFF",
  fontWeight: "700",
  marginTop: 12,
},

trackerWrapper: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginTop: 18,
},

stepItem: {
  alignItems: "center",
  width: 55,
},

activeStep: {

  width: 18,
  height: 18,
  borderRadius: 999,
  backgroundColor: "#FFFFFF",
  shadowColor: "#FFFFFF",
  shadowOpacity: 0.9,
  shadowRadius: 10,
  elevation: 10,
},

inactiveStep: {
  width: 16,
  height: 16,
  borderRadius: 999,
  backgroundColor: "rgba(255,255,255,0.35)",
},

stepLine: {
  flex: 5,
  height: 3,
  backgroundColor: "#FFFFFF",
  marginHorizontal: 0,
  marginTop: 8,
},


stepText: {

  color: "#FFFFFF",
  fontSize: 10,
  marginTop: 10,
  fontWeight: "700",
},

heroBottom: {

  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 28,
},

heroInfo: {

  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "600",
},

mountainCard: {
flex: 1,

  height: 180,
  borderRadius: 28,
  justifyContent: "flex-start",
  padding: 20,

},

overlay: {

  flex: 1,
  borderRadius: 28,
  padding: 20,
  justifyContent: "flex-start",

},

weatherCard: {

  flex: 1,
  height: 180,
  borderRadius: 28,
  justifyContent: "flex-start",
  padding: 20,

},

weatherLocation: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "600",
},

weatherDegree: {
  color: "#FFFFFF",
  fontSize: 40,
  fontWeight: "300",
  marginTop: 8,
},

weatherCondition: {
  color: "#FFFFFF",
  fontSize: 20,
  fontWeight: "500",
  marginTop: 10,
},

weatherHighLow: {
  color: "rgba(255,255,255,0.85)",
  fontSize: 15,
  marginTop: 6,
},

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  topBar: {
    marginTop: 9,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: "#7C8A87",
    fontSize: 15,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 6,
  },

  avatar: {
    width: 54,
    height: 54,

    borderRadius: 27,

    backgroundColor: "rgba(255,255,255,0.08)",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },

  heroCard: {
    marginTop: 35,

    borderRadius: 34,

    padding: 22,
  },

  heroLabel: {
    color: "#064E3B",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
  },

  heroStatus: {
    color: "#032117",
    fontSize: 42,
    fontWeight: "700",

    marginTop: 4,
  },

  heroDesc: {
    color: "#064E3B",

    marginTop: 6,

    fontSize: 15,
    lineHeight: 24,
  },

  infoWrapper: {
    flexDirection: "row",
    gap: 16,

    marginTop: 24,
  },

 infoCard: {

  flex: 1,

  height: 180,

  backgroundColor: "rgba(255,255,255,0.04)",

  borderRadius: 28,

  padding: 20,

  justifyContent: "flex-start",

},

  infoIcon: {
    fontSize: 26,
  },

  infoTitle: {

  color: "rgba(255,255,255,0.78)",

  fontSize: 13,

  fontWeight: "500",

  marginTop: 8,

},

  infoValue: {

  color: "#FFFFFF",

  fontSize: 20,

  fontWeight: "700",

  marginTop: 2,

},

  sectionTitle: {
    color: "#FFFFFF",

    fontSize: 20,
    fontWeight: "600",

    marginTop: 34,
    marginBottom: 18,
  },

  actionButton: {
    backgroundColor: "#67E8B4",

    paddingVertical: 20,

    borderRadius: 22,

    alignItems: "center",
  },

  actionText: {
    color: "#032117",

    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {

    marginTop: 16,

    backgroundColor: "rgba(255,255,255,0.05)",

    paddingVertical: 20,

    borderRadius: 22,

    alignItems: "center",
  },

  secondaryText: {
    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "600",
  },

  activityCard: {

    backgroundColor: "rgba(255,255,255,0.05)",

    padding: 22,

    borderRadius: 24,

    marginBottom: 16,
  },

  activityTitle: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "600",
  },

  activityTime: {
    color: "#7C8A87",

    marginTop: 8,

    fontSize: 14,

    lineHeight: 20
  },

});