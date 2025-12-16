import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const { width } = Dimensions.get("window");
const API_BASE_URL = "http://localhost:80";

export default function StudentLogin() {
  const navigation = useNavigation();

  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(true);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setLoadingColleges(true);
      const response = await axios.get(`${API_BASE_URL}/api/v1/public/colleges`);
      setColleges(response.data || []);
    } catch (err) {
      setError("Connectivity issue: Failed to load colleges.");
    } finally {
      setLoadingColleges(false);
    }
  };

  const handleLogin = async () => {
    if (!selectedCollege) return setError("Please select your college first.");
    if (selectedCollege === "NotListed") return setError("College not registered.");
    if (!email || !password) return setError("Please fill all fields.");

    setError("");
    setIsSubmitting(true);
    try {
      navigation.navigate("StudentDashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" }}
        style={styles.background}
      >
        <View style={styles.gradientOverlay} />

        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flexCenter}
          >
            <View style={styles.header}>
              <Text style={styles.brandName}>EDU<Text style={styles.brandLight}>LINK</Text></Text>
              <Text style={styles.studentTag}>STUDENT PORTAL</Text>
            </View>

            <View style={styles.actionCard}>
              <Text style={styles.welcomeText}>Welcome, Student</Text>

              {/* IMPROVED DROPDOWN SECTION */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Institution</Text>
                <View style={styles.pickerWrapper}>
                  {loadingColleges ? (
                    <ActivityIndicator size="small" color="#60a5fa" style={{ height: 55 }} />
                  ) : (
                    <>
                      <Picker
                        selectedValue={selectedCollege}
                        onValueChange={(value) => {
                          setSelectedCollege(value);
                          setError("");
                        }}
                        dropdownIconColor="#94a3b8"
                        style={styles.pickerStyle}
                        itemStyle={styles.pickerItemStyle}
                      >
                        <Picker.Item label="Select your college" value="" color="#94a3b8" />
                        {colleges.map((college) => (
                          <Picker.Item
                            key={college.collegeId}
                            label={college.collegeName}
                            value={college.collegeId.toString()}
                            color={Platform.OS === 'ios' ? '#fff' : '#000'}
                          />
                        ))}
                        <Picker.Item label="My College is not listed" value="NotListed" color="#fb7185" />
                      </Picker>
                      {/* Visual Arrow Indicator */}
                      <View style={styles.customArrowContainer}>
                         <Text style={{color: '#94a3b8', fontSize: 12}}>▼</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>

              {selectedCollege && selectedCollege !== "NotListed" && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Student Email</Text>
                    <TextInput
                      placeholder="e.g. alex@university.edu"
                      placeholderTextColor="#64748b"
                      value={email}
                      onChangeText={setEmail}
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      placeholder="••••••••"
                      placeholderTextColor="#64748b"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      style={styles.input}
                    />
                  </View>

                  {error ? <Text style={styles.errorText}>{error}</Text> : null}

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.primaryButton}
                    onPress={handleLogin}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? "SIGNING IN..." : "LOGIN TO DASHBOARD"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("StudentRegister", { collegeId: selectedCollege })}
                    style={styles.registerLink}
                  >
                    <Text style={styles.registerText}>
                      New here? <Text style={styles.registerHighlight}>Create Account</Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Change Portal</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#0f172a" },
  background: { flex: 1, width: width },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
  },
  safeArea: { flex: 1 },
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", marginBottom: 30 },
  brandName: { fontSize: 32, fontWeight: "800", color: "#fff", letterSpacing: 2 },
  brandLight: { fontWeight: "300", color: "#94a3b8" },
  studentTag: { color: "#60a5fa", fontSize: 12, letterSpacing: 4, marginTop: 5, fontWeight: "700" },
  actionCard: {
    width: width * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  welcomeText: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 25, textAlign: "center" },
  inputGroup: { marginBottom: 18 },
  inputLabel: { color: "#94a3b8", fontSize: 11, fontWeight: "700", marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 1 },
  
  /* IMPROVED PICKER WRAPPER */
  pickerWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    height: 55,
    justifyContent: 'center',
  },
  pickerStyle: {
    color: "#fff",
    width: '100%',
    backgroundColor: 'transparent',
  },
  pickerItemStyle: {
    fontSize: 16,
    height: 55,
  },
  customArrowContainer: {
    position: 'absolute',
    right: 15,
    pointerEvents: 'none', // ensures the user clicks the picker, not the arrow
  },

  input: {
    height: 55,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    paddingHorizontal: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontWeight: "700", letterSpacing: 1 },
  errorText: { color: "#fb7185", fontSize: 13, marginBottom: 15, textAlign: "center" },
  registerLink: { marginTop: 20, alignItems: "center" },
  registerText: { color: "#94a3b8", fontSize: 14 },
  registerHighlight: { color: "#60a5fa", fontWeight: "700" },
  backButton: { marginTop: 30 },
  backButtonText: { color: "#64748b", fontSize: 14, fontWeight: "600" },
});