import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenProps } from "../navigation/typesNavigation";
import { gadgetService } from "../services/gadgetService";
import { COLORS, formStyles } from "../styles/appStyles";
import { NewGadget } from "../types/gadget";

const FormScreen = ({ navigation, route }: ScreenProps<"Form">) => {
  const id = route.params?.id;
  const isEditMode: boolean = id !== undefined;

  const [form, setForm] = useState<NewGadget>({
    name: "",
    brand: "",
    category: "",
    price: undefined,
    purchaseYear: undefined,
  });

  const [priceText, setPriceText] = useState<string>("");
  const [purchaseYearText, setPurchaseYearText] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<keyof NewGadget | null>(
    null
  );

  useEffect(() => {
    if (isEditMode && id !== undefined) {
      loadGadget(id);
    }
  }, [id, isEditMode]);

  const loadGadget = async (gadgetId: number): Promise<void> => {
    try {
      const data = await gadgetService.getById(gadgetId);

      if (data === null) {
        Alert.alert("Error", "Gadget no encontrado");
        navigation.goBack();
        return;
      }

      setForm({
        name: data.name,
        brand: data.brand,
        category: data.category,
        price: data.price,
        purchaseYear: data.purchaseYear,
      });

      setPriceText(data.price.toString());
      setPurchaseYearText(data.purchaseYear.toString());
    } catch (error) {
      Alert.alert("Error", "No se puede cargar el gadget");
    }
  };

  const handleInputChange = (key: keyof NewGadget, value: string): void => {
    if (key === "price") {
      setPriceText(value);

      const normalizedValue = value.replace(",", ".");
      const numericValue = Number(normalizedValue);

      setForm((previousForm) => ({
        ...previousForm,
        price:
          normalizedValue.trim() === "" || Number.isNaN(numericValue)
            ? undefined
            : numericValue,
      }));

      return;
    }

    if (key === "purchaseYear") {
      setPurchaseYearText(value);

      const numericValue = Number(value);

      setForm((previousForm) => ({
        ...previousForm,
        purchaseYear:
          value.trim() === "" || Number.isNaN(numericValue)
            ? undefined
            : numericValue,
      }));

      return;
    }

    setForm((previousForm) => ({
      ...previousForm,
      [key]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (
      form.name.trim() === "" ||
      form.brand.trim() === "" ||
      form.category.trim() === ""
    ) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, completa nombre, marca y categoría."
      );
      return false;
    }

    if (form.price === undefined || Number.isNaN(form.price) || form.price <= 0) {
      Alert.alert("Precio inválido", "El precio debe ser un número mayor a 0.");
      return false;
    }

    if (
      form.purchaseYear === undefined ||
      Number.isNaN(form.purchaseYear) ||
      form.purchaseYear < 2000 ||
      form.purchaseYear > 2026
    ) {
      Alert.alert(
        "Año inválido",
        "El año de compra debe estar entre 2000 y 2026."
      );
      return false;
    }

    return true;
  };

  const handleSave = async (): Promise<void> => {
    if (saving) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      if (isEditMode && id !== undefined) {
        await gadgetService.update(id, form);
        Alert.alert("Exitoso", "Gadget actualizado con éxito");
      } else {
        await gadgetService.create(form);
        Alert.alert("Exitoso", "Gadget registrado con éxito");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        isEditMode
          ? "No se pudo actualizar el gadget"
          : "No se pudo registrar el gadget"
      );
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={formStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={formStyles.scrollContent}>
        <View style={formStyles.modeBadge}>
          <Text style={formStyles.modeBadgeText}>
            {isEditMode ? "EDIT" : "CREATE"}
          </Text>
        </View>

        <View style={formStyles.hero}>
          <Text style={formStyles.title}>
            {isEditMode ? "Actualizar gadget" : "Registrar nuevo gadget"}
          </Text>

          <Text style={formStyles.subtitle}>
            {isEditMode
              ? "Modifica la información del gadget seleccionado."
              : "Agrega un nuevo gadget al inventario local de TechStore."}
          </Text>
        </View>

        <Text style={formStyles.label}>Nombre</Text>
        <TextInput
          style={[
            formStyles.input,
            focusedField === "name" && formStyles.inputFocused,
          ]}
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="MacBook Pro 14"
          placeholderTextColor={COLORS.textLight}
          maxLength={60}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
        />

        <Text style={formStyles.label}>Marca</Text>
        <TextInput
          style={[
            formStyles.input,
            focusedField === "brand" && formStyles.inputFocused,
          ]}
          value={form.brand}
          onChangeText={(value) => handleInputChange("brand", value)}
          placeholder="Apple"
          placeholderTextColor={COLORS.textLight}
          maxLength={40}
          onFocus={() => setFocusedField("brand")}
          onBlur={() => setFocusedField(null)}
        />

        <Text style={formStyles.label}>Categoría</Text>
        <TextInput
          style={[
            formStyles.input,
            focusedField === "category" && formStyles.inputFocused,
          ]}
          value={form.category}
          onChangeText={(value) => handleInputChange("category", value)}
          placeholder="Laptop"
          placeholderTextColor={COLORS.textLight}
          maxLength={40}
          onFocus={() => setFocusedField("category")}
          onBlur={() => setFocusedField(null)}
        />

        <View style={formStyles.row}>
          <View style={formStyles.halfField}>
            <Text style={formStyles.label}>Precio</Text>
            <TextInput
              style={[
                formStyles.input,
                focusedField === "price" && formStyles.inputFocused,
              ]}
              value={priceText}
              onChangeText={(value) => handleInputChange("price", value)}
              keyboardType="decimal-pad"
              placeholder="1999.99"
              placeholderTextColor={COLORS.textLight}
              onFocus={() => setFocusedField("price")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={formStyles.halfField}>
            <Text style={formStyles.label}>Año</Text>
            <TextInput
              style={[
                formStyles.input,
                focusedField === "purchaseYear" && formStyles.inputFocused,
              ]}
              value={purchaseYearText}
              onChangeText={(value) =>
                handleInputChange("purchaseYear", value)
              }
              keyboardType="number-pad"
              placeholder="2024"
              placeholderTextColor={COLORS.textLight}
              onFocus={() => setFocusedField("purchaseYear")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>

        <Text style={formStyles.helpText}>
          Año permitido entre 2000 y 2026.
        </Text>

        <TouchableOpacity
          style={[
            formStyles.saveButton,
            saving && formStyles.saveButtonDisabled,
          ]}
          activeOpacity={0.85}
          disabled={saving}
          onPress={handleSave}
        >
          <Text style={formStyles.saveButtonText}>
            {saving
              ? "Guardando..."
              : isEditMode
              ? "Actualizar Gadget"
              : "Guardar Gadget"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={formStyles.cancelButton}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={formStyles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormScreen;