import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Replace with your actual API base URL
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
      setError("Failed to load colleges.");
    } finally {
      setLoadingColleges(false);
    }
  };

  const handleLogin = async () => {
    if (!selectedCollege)
      return setError("Please select your college first.");

    if (selectedCollege === "NotListed")
      return setError("College not registered.");

    if (!email || !password)
      return setError("Please fill all fields.");

    setError("");
    setIsSubmitting(true);

    try {
      // Your login logic here
      console.log("Student logging in", email);

      navigation.navigate("StudentDashboard"); // TODO: Add screen later
    } catch (err) {
      setError("Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>🎓 Student Login</Text>

        <Text style={styles.label}>Select Your College</Text>

        <View style={styles.pickerContainer}>
          {loadingColleges ? (
            <ActivityIndicator size="large" color="#333" />
          ) : (
            <Picker
              selectedValue={selectedCollege}
              onValueChange={(value) => {
                setSelectedCollege(value);
                setError("");
              }}
              style={styles.picker}
            >
              <Picker.Item
                label={
                  loadingColleges
                    ? "Loading colleges..."
                    : "-- Choose College --"
                }
                value=""
              />

              {colleges.map((college) => (
                <Picker.Item
                  key={college.collegeId}
                  label={college.collegeName}
                  value={college.collegeId.toString()}
                />
              ))}

              <Picker.Item
                label="My College is not listed"
                value="NotListed"
              />
            </Picker>
          )}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {selectedCollege && selectedCollege !== "NotListed" && !error && (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              disabled={isSubmitting}
            >
              <Text style={styles.btnText}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StudentRegister", {
                  collegeId: selectedCollege,
                })
              }
            >
              <Text style={styles.registerText}>
                Not registered yet? Register here
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    marginTop: 100,
    marginHorizontal: 25,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#333",
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  picker: { height: 50, width: "100%" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  registerText: {
    color: "#4f46e5",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
