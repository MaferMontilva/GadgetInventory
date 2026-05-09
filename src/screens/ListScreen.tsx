import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenProps } from "../navigation/typesNavigation";
import { gadgetService } from "../services/gadgetService";
import { COLORS, listStyles } from "../styles/appStyles";
import { Gadget } from "../types/gadget";

const normalizeText = (text: string): string => {
  return text.trim().toLowerCase();
};

const getCategoryStyle = (category: string) => {
  const normalizedCategory = normalizeText(category);

  if (
    normalizedCategory.includes("laptop") ||
    normalizedCategory.includes("lapto") ||
    normalizedCategory.includes("portatil") ||
    normalizedCategory.includes("portátil")
  ) {
    return listStyles.categoryLaptop;
  }

  if (
    normalizedCategory.includes("phone") ||
    normalizedCategory.includes("iphone") ||
    normalizedCategory.includes("celular") ||
    normalizedCategory.includes("smartphone")
  ) {
    return listStyles.categoryPhone;
  }

  if (
    normalizedCategory.includes("tablet") ||
    normalizedCategory.includes("ipad") ||
    normalizedCategory.includes("tab")
  ) {
    return listStyles.categoryTablet;
  }

  if (
    normalizedCategory.includes("accessory") ||
    normalizedCategory.includes("accesorio") ||
    normalizedCategory.includes("audifono") ||
    normalizedCategory.includes("audífono") ||
    normalizedCategory.includes("airpods")
  ) {
    return listStyles.categoryAccessory;
  }

  if (
    normalizedCategory.includes("wearable") ||
    normalizedCategory.includes("watch") ||
    normalizedCategory.includes("reloj")
  ) {
    return listStyles.categoryWearable;
  }

  return listStyles.categoryOther;
};

const getGadgetIcon = (gadget: Gadget): string => {
  const normalizedText = normalizeText(
    `${gadget.name} ${gadget.brand} ${gadget.category}`
  );

  if (
    normalizedText.includes("macbook") ||
    normalizedText.includes("laptop") ||
    normalizedText.includes("lapto") ||
    normalizedText.includes("notebook") ||
    normalizedText.includes("portatil") ||
    normalizedText.includes("portátil")
  ) {
    return "💻";
  }

  if (
    normalizedText.includes("iphone") ||
    normalizedText.includes("phone") ||
    normalizedText.includes("celular") ||
    normalizedText.includes("smartphone")
  ) {
    return "📱";
  }

  if (
    normalizedText.includes("tablet") ||
    normalizedText.includes("ipad") ||
    normalizedText.includes("tab")
  ) {
    return "📲";
  }

  if (
    normalizedText.includes("airpods") ||
    normalizedText.includes("audifono") ||
    normalizedText.includes("audífono") ||
    normalizedText.includes("headset") ||
    normalizedText.includes("accessory") ||
    normalizedText.includes("accesorio")
  ) {
    return "🎧";
  }

  if (
    normalizedText.includes("watch") ||
    normalizedText.includes("reloj") ||
    normalizedText.includes("wearable")
  ) {
    return "⌚";
  }

  return "🔌";
};

const ListScreen = ({ navigation }: ScreenProps<"List">) => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const loadGadgets = async (): Promise<void> => {
    try {
      setLoading(true);

      const data = await gadgetService.getAll();
      setGadgets(data);
    } catch (error) {
      Alert.alert("Error", "No se pueden cargar los gadgets");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGadgets();
    }, [])
  );

  const filteredGadgets = useMemo(() => {
    const normalizedSearch = normalizeText(searchText);

    return gadgets.filter((gadget) => {
      const gadgetName = normalizeText(gadget.name);
      const gadgetBrand = normalizeText(gadget.brand);

      return (
        gadgetName.includes(normalizedSearch) ||
        gadgetBrand.includes(normalizedSearch)
      );
    });
  }, [gadgets, searchText]);

  const getEmptyMessage = (): string => {
    if (loading) {
      return "Cargando...";
    }

    if (searchText.trim() !== "" && filteredGadgets.length === 0) {
      return "Gadget no encontrado";
    }

    return "Todavía no hay gadgets registrados. Agrega el primero.";
  };

  const getResultCount = (): number => {
    if (searchText.trim() === "") {
      return gadgets.length;
    }

    return filteredGadgets.length;
  };

  const renderGadget = ({ item }: ListRenderItemInfo<Gadget>) => {
    return (
      <TouchableOpacity
        style={listStyles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <View style={listStyles.cardLeft}>
          <View style={listStyles.iconCircle}>
            <Text style={listStyles.iconText}>{getGadgetIcon(item)}</Text>
          </View>

          <View style={listStyles.cardInfo}>
            <Text style={listStyles.cardName}>{item.name}</Text>

            <Text style={listStyles.cardBrand}>
              {item.brand} - {item.category}
            </Text>

            <View
              style={[listStyles.categoryPill, getCategoryStyle(item.category)]}
            >
              <Text style={listStyles.categoryText}>{item.category}</Text>
            </View>
          </View>
        </View>

        <View style={listStyles.cardRight}>
          <Text style={listStyles.priceText}>${item.price.toFixed(2)}</Text>
          <Text style={listStyles.yearText}>Año: {item.purchaseYear}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <View>
          <Text style={listStyles.headerTitle}>TechStore</Text>
          <Text style={listStyles.headerSubtitle}>
            Inventario local de gadgets
          </Text>
        </View>

        <View style={listStyles.totalBadge}>
          <Text style={listStyles.totalBadgeText}>{getResultCount()}</Text>
        </View>
      </View>

      <View style={listStyles.searchContainer}>
        <TextInput
          style={listStyles.searchInput}
          placeholder="Buscar por nombre o marca..."
          placeholderTextColor={COLORS.textLight}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <TouchableOpacity
        style={listStyles.infoButton}
        activeOpacity={0.85}
        onPress={() => setShowInfoModal(true)}
      >
        <Text style={listStyles.infoButtonText}>Información</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredGadgets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGadget}
        contentContainerStyle={listStyles.list}
        ListEmptyComponent={
          <Text style={listStyles.emptyText}>{getEmptyMessage()}</Text>
        }
      />

      <TouchableOpacity
        style={listStyles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Form", {})}
      >
        <Text style={listStyles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showInfoModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={listStyles.modalOverlay}>
          <View style={listStyles.modalContainer}>
            <View style={listStyles.modalHeader}>
              <TouchableOpacity
                style={listStyles.backButton}
                onPress={() => setShowInfoModal(false)}
              >
                <Text style={listStyles.backButtonText}>← Volver</Text>
              </TouchableOpacity>

              <Text style={listStyles.modalTitle}>Información académica</Text>
            </View>

            <View style={listStyles.infoCard}>
              <Text style={listStyles.infoText}>
                <Text style={listStyles.infoLabel}>Asignatura: </Text>
                Desarrollo de Aplicaciones Móviles
              </Text>

              <Text style={listStyles.infoText}>
                <Text style={listStyles.infoLabel}>Título: </Text>
                Examen Práctico - GadgetInventory
              </Text>

              <Text style={listStyles.infoText}>
                <Text style={listStyles.infoLabel}>Estudiantes: </Text>
                Mario Vinicio Molina Tufiño y María Fernanda Montilva
                Contreras
              </Text>

              <Text style={listStyles.infoText}>
                <Text style={listStyles.infoLabel}>Fecha del examen: </Text>
                09/05/2026
              </Text>

              <Text style={listStyles.infoText}>
                <Text style={listStyles.infoLabel}>Docente: </Text>
                Mg. Viviana Flores
              </Text>

              <Text style={listStyles.infoText}>
                <Text style={listStyles.infoLabel}>Carrera: </Text>
                Informática
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListScreen;