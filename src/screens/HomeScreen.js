import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
        }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Gradient-style Overlay */}
        <View style={styles.gradientOverlay} />

        <SafeAreaView style={styles.contentContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoIcon}>E</Text>
            </View>
            <Text style={styles.brandName}>
              EDU<Text style={styles.brandLight}>LINK</Text>
            </Text>
            <Text style={styles.tagline}>Future-Ready Education</Text>
          </View>

          {/* Bottom Action Sheet */}
          <View style={styles.actionCard}>
            <Text style={styles.welcomeText}>Get Started</Text>
            <Text style={styles.instructionText}>
              Select your identity to access the personalized dashboard.
            </Text>

            {/* Student Button - Primary */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => navigation.navigate("StudentLogin")}
            >
              <Text style={styles.primaryButtonText}>I am a Student</Text>
            </TouchableOpacity>

            {/* Admin Button - Outlined/Sleek */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("AdminLogin")}
            >
              <Text style={styles.secondaryButtonText}>Staff Administration</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <View style={styles.dot} />
              <Text style={styles.footerText}>SECURED BY END-TO-END ENCRYPTION</Text>
              <View style={styles.dot} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.7)", // Deep navy tint
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    // Soft Glow
    shadowColor: "#3b82f6",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  logoIcon: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
  },
  brandName: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
  },
  brandLight: {
    fontWeight: "300",
    color: "#94a3b8",
  },
  tagline: {
    color: "#94a3b8",
    fontSize: 14,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginTop: 8,
  },
  actionCard: {
    width: width * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.08)", // Hyper-subtle glass
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)", // Works on web/ios if supported
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#3b82f6",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "transparent",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3b82f6",
    marginHorizontal: 8,
  },
});