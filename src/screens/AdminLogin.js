import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
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

export default function CollegeAdminLogin() {
  const navigation = useNavigation();

  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/public/colleges`);
        setColleges(response.data);
      } catch (err) {
        setError("Network Error: Unable to fetch colleges.");
      } finally {
        setLoadingColleges(false);
      }
    };
    fetchColleges();
  }, []);

  const handleLogin = async () => {
    if (!selectedCollege) return setError("Please select your college first.");
    if (!email || !password) return setError("Please fill all fields.");
    
    setError("");
    setIsSubmitting(true);
    try {
      navigation.navigate("AdminDashboard");
    } catch (err) {
      setError("Login failed. Check credentials.");
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
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.brandName}>EDU<Text style={styles.brandLight}>LINK</Text></Text>
              <Text style={styles.adminTag}>ADMINISTRATION PORTAL</Text>
            </View>

            {/* Login Card */}
            <View style={styles.actionCard}>
              <Text style={styles.welcomeText}>Staff Login</Text>
              
              {/* IMPROVED DROPDOWN SECTION */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Institution</Text>
                <View style={styles.pickerWrapper}>
                  {loadingColleges ? (
                    <ActivityIndicator size="small" color="#3b82f6" style={{ height: 55 }} />
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
                      >
                        <Picker.Item label="Select Institution" value="" color="#94a3b8" />
                        {colleges.map((clg) => (
                          <Picker.Item 
                            key={clg.collegeId} 
                            label={clg.collegeName} 
                            value={clg.collegeName} 
                            color={Platform.OS === 'ios' ? '#fff' : '#000'}
                          />
                        ))}
                        <Picker.Item label="My college is not listed..." value="NotListed" color="#fb7185" />
                      </Picker>
                      {/* Visual Arrow Indicator */}
                      <View style={styles.customArrowContainer}>
                         <Text style={{color: '#94a3b8', fontSize: 10}}>▼</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>

              {selectedCollege && selectedCollege !== "NotListed" && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Admin Email</Text>
                    <TextInput
                      placeholder="admin@institution.edu"
                      value={email}
                      onChangeText={setEmail}
                      style={styles.input}
                      placeholderTextColor="#64748b"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      style={styles.input}
                      placeholderTextColor="#64748b"
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
                      {isSubmitting ? "AUTHENTICATING..." : "SIGN IN"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {selectedCollege === "NotListed" && (
                <TouchableOpacity 
                    onPress={() => navigation.navigate("CollegeAdminRequest")}
                    style={styles.requestButton}
                >
                  <Text style={styles.requestText}>Request Registration</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back to Home</Text>
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
  adminTag: { color: "#3b82f6", fontSize: 12, letterSpacing: 4, marginTop: 5, fontWeight: "700" },
  actionCard: {
    width: width * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  welcomeText: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 25, textAlign: 'center' },
  
  inputGroup: { marginBottom: 18 },
  inputLabel: { 
    color: "#94a3b8", 
    fontSize: 11, 
    fontWeight: "700", 
    marginBottom: 8, 
    marginLeft: 4, 
    textTransform: 'uppercase', 
    letterSpacing: 1.5 
  },
  
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
  },
  customArrowContainer: {
    position: 'absolute',
    right: 15,
    pointerEvents: 'none',
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
    backgroundColor: "#3b82f6",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#3b82f6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontWeight: "700", letterSpacing: 1 },
  errorText: { color: "#fb7185", fontSize: 13, marginBottom: 15, textAlign: "center" },
  requestButton: {
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.4)",
    borderRadius: 14,
    marginTop: 10,
  },
  requestText: { color: "#60a5fa", fontWeight: "700", textAlign: "center", letterSpacing: 0.5 },
  backButton: { marginTop: 30 },
  backButtonText: { color: "#64748b", fontSize: 14, fontWeight: "600" },
});