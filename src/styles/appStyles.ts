import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#2563EB",
  secondary: "#1D4ED8",
  background: "#0F172A",
  card: "#1E293B",
  cardSoft: "#334155",
  white: "#FFFFFF",
  textDark: "#F8FAFC",
  textMedium: "#CBD5E1",
  textLight: "#94A3B8",
  border: "#334155",
  inputBg: "#1E293B",
  danger: "#EF4444",
  dangerBg: "#450A0A",
  success: "#22C55E",
  warning: "#F59E0B",
  shadow: "#000000",
};

export const CATEGORY_COLORS = {
  Laptop: "#6366F1",
  Phone: "#06B6D4",
  Tablet: "#A855F7",
  Accessory: "#F97316",
  Wearable: "#22C55E",
  Other: "#64748B",
};

export const SIZES = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 24,
  borderRadius: 14,
  fontSmall: 13,
  fontMedium: 16,
  fontLarge: 18,
  fontTitle: 24,
  fabSize: 60,
};

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.paddingMedium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: SIZES.fontTitle,
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    marginTop: 4,
  },
  totalBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  totalBadgeText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.fontSmall,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
  },
  infoButton: {
  position: "absolute",
  left: 24,
  bottom: 30,
  backgroundColor: COLORS.cardSoft,
  borderColor: COLORS.border,
  borderWidth: 1,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
  zIndex: 10,
  elevation: 6,
  shadowColor: COLORS.shadow,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 6,
},
  infoButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontSmall,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconText: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: SIZES.fontLarge,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  cardBrand: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  categoryPill: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "bold",
  },
  categoryLaptop: {
    backgroundColor: CATEGORY_COLORS.Laptop,
  },
  categoryPhone: {
    backgroundColor: CATEGORY_COLORS.Phone,
  },
  categoryTablet: {
    backgroundColor: CATEGORY_COLORS.Tablet,
  },
  categoryAccessory: {
    backgroundColor: CATEGORY_COLORS.Accessory,
  },
  categoryWearable: {
    backgroundColor: CATEGORY_COLORS.Wearable,
  },
  categoryOther: {
    backgroundColor: CATEGORY_COLORS.Other,
  },
  cardRight: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  priceText: {
    color: COLORS.success,
    fontSize: SIZES.fontLarge,
    fontWeight: "bold",
  },
  yearText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    marginTop: 6,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontMedium,
    textAlign: "center",
    marginTop: 80,
    paddingHorizontal: 20,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 30,
    width: SIZES.fabSize,
    height: SIZES.fabSize,
    borderRadius: SIZES.fabSize / 2,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 38,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.88)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeader: {
    marginBottom: 14,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.fontMedium,
    fontWeight: "bold",
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: SIZES.fontTitle,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontMedium,
    marginBottom: 10,
    lineHeight: 24,
  },
  infoLabel: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.paddingMedium,
    paddingBottom: 30,
  },
  hero: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroIcon: {
    fontSize: 60,
    marginBottom: 14,
  },
  categoryBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  categoryBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.fontSmall,
    fontWeight: "bold",
  },
  categoryLaptop: {
    backgroundColor: CATEGORY_COLORS.Laptop,
  },
  categoryPhone: {
    backgroundColor: CATEGORY_COLORS.Phone,
  },
  categoryTablet: {
    backgroundColor: CATEGORY_COLORS.Tablet,
  },
  categoryAccessory: {
    backgroundColor: CATEGORY_COLORS.Accessory,
  },
  categoryWearable: {
    backgroundColor: CATEGORY_COLORS.Wearable,
  },
  categoryOther: {
    backgroundColor: CATEGORY_COLORS.Other,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 18,
  },
  fieldGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  fieldBox: {
    flex: 1,
    backgroundColor: COLORS.cardSoft,
    borderRadius: SIZES.borderRadius,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  value: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: "600",
  },
  priceCard: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: SIZES.borderRadius,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.success,
    marginBottom: 22,
  },
  priceLabel: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  priceValue: {
    color: COLORS.success,
    fontSize: 28,
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 12,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: SIZES.borderRadius,
    alignItems: "center",
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: 15,
    borderRadius: SIZES.borderRadius,
    alignItems: "center",
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: "bold",
  },
  loadingText: {
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 80,
    fontSize: SIZES.fontMedium,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.paddingMedium,
    paddingBottom: 30,
  },
  modeBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 14,
  },
  modeBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.fontSmall,
    fontWeight: "bold",
  },
  hero: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.fontTitle,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    lineHeight: 20,
  },
  label: {
    color: COLORS.textMedium,
    fontSize: SIZES.fontSmall,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    marginBottom: 14,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  helpText: {
    color: COLORS.textLight,
    fontSize: SIZES.fontSmall,
    marginTop: -4,
    marginBottom: 14,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: SIZES.borderRadius,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.secondary,
    opacity: 0.7,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.cardSoft,
    paddingVertical: 15,
    borderRadius: SIZES.borderRadius,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: "bold",
  },
});