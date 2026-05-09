import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  List: undefined;
  Detail: { id: number };
  Form: { id?: number };
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;