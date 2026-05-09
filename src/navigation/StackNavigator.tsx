import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS } from "../styles/appStyles";
import DetailScreen from "../screens/DetailScreen";
import ListScreen from "../screens/ListScreen";
import FormScreen from "../screens/FormScreen";
import { RootStackParamList } from "./typesNavigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: "GadgetInventory",
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Detalle del Gadget",
        }}
      />

      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={({ route }) => ({
          title: route.params?.id ? "Editar Gadget" : "Nuevo Gadget",
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;