import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// TODO: Replace with your actual API URL
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

  // Fetch colleges on load
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/public/colleges`);
        setColleges(response.data);
      } catch (err) {
        setError("Unable to fetch colleges.");
      } finally {
        setLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);

  const handleLogin = async () => {
    if (!selectedCollege)
      return setError("Please select your college first.");

    const exists = colleges.some(
      (c) => c.collegeName === selectedCollege
    );

    if (!exists && selectedCollege !== "NotListed")
      return setError("College not registered.");

    if (!email || !password)
      return setError("Please fill all fields.");

    setError("");
    setIsSubmitting(true);

    try {
      // You will replace this with your backend login logic later
      console.log("Logging in:", email, password);

      navigation.navigate("AdminDashboard"); // TODO: Add screen later
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
        <Text style={styles.title}>🏫 College Admin Login</Text>

        <Text style={styles.label}>Select Your College</Text>

        {loadingColleges ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCollege}
              onValueChange={(value) => {
                setSelectedCollege(value);
                setError("");
              }}
              mode="dropdown"
              style={styles.picker}
            >
              <Picker.Item label="-- Choose College --" value="" />

              {colleges.map((clg) => (
                <Picker.Item
                  key={clg.collegeId}
                  label={clg.collegeName}
                  value={clg.collegeName}
                />
              ))}

              <Picker.Item label="My College is not listed" value="NotListed" />
            </Picker>
          </View>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {selectedCollege && selectedCollege !== "NotListed" && !error && (
          <>
            <TextInput
              placeholder="Admin Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              disabled={isSubmitting}
            >
              <Text style={styles.loginText}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {selectedCollege === "NotListed" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("CollegeAdminRequest")}
          >
            <Text style={styles.requestText}>
              ➕ Request College Registration
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  container: {
    marginTop: 70,
    marginHorizontal: 25,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#333",
    marginBottom: 8,
  },
  pickerWrapper: {
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
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
  },
  requestText: {
    marginTop: 15,
    fontWeight: "600",
    color: "#4f46e5",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
