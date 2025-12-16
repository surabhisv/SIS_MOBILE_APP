import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen.js";
import StudentLogin from "../screens/StudentLogin.js";
import AdminLogin from "../screens/AdminLogin.js";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StudentLogin" component={StudentLogin} />
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
    </Stack.Navigator>
  );
}
