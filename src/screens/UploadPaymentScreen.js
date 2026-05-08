import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { LinearGradient } from "expo-linear-gradient";

export default function UploadPaymentScreen() {

  const [image, setImage] = useState(null);

  const pickImage = async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 1,

      });

    if (!result.canceled) {

      setImage(result.assets[0].uri);

    }

  };

  const handleUpload = () => {

    alert("Payment uploaded 🔥");

  };

  return (

    <LinearGradient
      colors={["#02120D", "#041B14", "#02120D"]}
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}

          <View style={styles.header}>

            <Text style={styles.subtitle}>
              Payment Proof
            </Text>

            <Text style={styles.title}>
              Upload Your Payment
            </Text>

          </View>

          {/* CARD */}

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.uploadBox}
              onPress={pickImage}
            >

              {image ? (

                <Image
                  source={{ uri: image }}
                  style={styles.preview}
                />

              ) : (

                <>

                  <Text style={styles.uploadIcon}>
                    ⬆
                  </Text>

                  <Text style={styles.uploadText}>
                    Select Payment Image
                  </Text>

                </>

              )}

            </TouchableOpacity>

            {/* BUTTON */}

            <TouchableOpacity
              style={styles.button}
              onPress={handleUpload}
            >

              <Text style={styles.buttonText}>
                Upload Payment
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({

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

  uploadBox: {

    height: 280,

    borderRadius: 28,

    borderWidth: 2,

    borderColor: "rgba(255,255,255,0.08)",

    borderStyle: "dashed",

    justifyContent: "center",

    alignItems: "center",

    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.03)",

  },

  uploadIcon: {
    fontSize: 42,
    marginBottom: 14,
  },

  uploadText: {
    color: "#D1D5DB",
    fontSize: 16,
    fontWeight: "500",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  button: {

    marginTop: 28,

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