import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleRoleSelect = (role) => {
    if (role === "student") {
      navigation.navigate("StudentLogin");
    } else {
      navigation.navigate("AdminLogin");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920",
      }}
      style={styles.background}
      imageStyle={{ opacity: 0.85 }}
    >
      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>EduLink</Text>

        <Text style={styles.subtitle}>
          A secure portal for <Text style={styles.highlight}>Students</Text> and{" "}
          <Text style={styles.highlight}>Administrators</Text> to manage
          academic information and workflows.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRoleSelect("student")}
          >
            <Text style={styles.buttonText}>Student Portal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRoleSelect("admin")}
          >
            <Text style={styles.buttonText}>Admin Portal</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Secure • Smart • Student-Centric</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  content: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#e6e6e6",
    marginBottom: 40,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: "bold",
    color: "#bcdcff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    marginTop: 50,
    color: "#dcdcdc",
    letterSpacing: 2,
    fontSize: 12,
  },
});
