import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ScreenProps } from "../navigation/typesNavigation";
import { gadgetService } from "../services/gadgetService";
import { detailStyles } from "../styles/appStyles";
import { Gadget } from "../types/gadget";

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Laptop":
      return detailStyles.categoryLaptop;
    case "Phone":
      return detailStyles.categoryPhone;
    case "Tablet":
      return detailStyles.categoryTablet;
    case "Accessory":
      return detailStyles.categoryAccessory;
    case "Wearable":
      return detailStyles.categoryWearable;
    default:
      return detailStyles.categoryOther;
  }
};

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "Laptop":
      return "💻";
    case "Phone":
      return "📱";
    case "Tablet":
      return "📲";
    case "Accessory":
      return "🎧";
    case "Wearable":
      return "⌚";
    default:
      return "🔌";
  }
};

const DetailScreen = ({ navigation, route }: ScreenProps<"Detail">) => {
  const { id } = route.params;

  const [gadget, setGadget] = useState<Gadget | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadGadget = async (): Promise<void> => {
    try {
      setLoading(true);

      const data = await gadgetService.getById(id);

      if (data === null) {
        Alert.alert("Error", "Gadget no encontrado");
        navigation.goBack();
        return;
      }

      setGadget(data);
    } catch (error) {
      Alert.alert("Error", "No se puede cargar el gadget");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGadget();
    }, [id])
  );

  const handleDelete = async (): Promise<void> => {
    if (gadget === null) {
      return;
    }

    try {
      setLoading(true);
      await gadgetService.delete(gadget.id);
      Alert.alert("Exitoso", "Gadget eliminado con éxito");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el gadget");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (): void => {
    if (gadget === null) {
      return;
    }

    Alert.alert(
      "Eliminar gadget",
      `¿Estás seguro de que quieres eliminar el gadget "${gadget.name}"? Esta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: handleDelete,
        },
      ]
    );
  };

  if (gadget === null) {
    return (
      <View style={detailStyles.container}>
        <Text style={detailStyles.loadingText}>
          {loading ? "Cargando..." : "Cargando..."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={detailStyles.container}
      contentContainerStyle={detailStyles.scrollContent}
    >
      <View style={detailStyles.hero}>
        <Text style={detailStyles.heroIcon}>
          {getCategoryIcon(gadget.category)}
        </Text>

        <View
          style={[
            detailStyles.categoryBadge,
            getCategoryStyle(gadget.category),
          ]}
        >
          <Text style={detailStyles.categoryBadgeText}>
            {gadget.category}
          </Text>
        </View>
      </View>

      <View style={detailStyles.card}>
        <Text style={detailStyles.title}>{gadget.name}</Text>

        <View style={detailStyles.fieldGrid}>
          <View style={detailStyles.fieldBox}>
            <Text style={detailStyles.label}>Brand</Text>
            <Text style={detailStyles.value}>{gadget.brand}</Text>
          </View>

          <View style={detailStyles.fieldBox}>
            <Text style={detailStyles.label}>Year</Text>
            <Text style={detailStyles.value}>{gadget.purchaseYear}</Text>
          </View>
        </View>

        <View style={detailStyles.priceCard}>
          <Text style={detailStyles.priceLabel}>Price</Text>
          <Text style={detailStyles.priceValue}>
            ${gadget.price.toFixed(2)}
          </Text>
        </View>

        <View style={detailStyles.buttonContainer}>
          <TouchableOpacity
            style={detailStyles.editButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Form", { id: gadget.id })}
          >
            <Text style={detailStyles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={detailStyles.deleteButton}
            activeOpacity={0.85}
            onPress={confirmDelete}
          >
            <Text style={detailStyles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;