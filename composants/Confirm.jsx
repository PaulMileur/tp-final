import { StyleSheet, Text, View, Alert } from "react-native";

export default function Confirm(supprimer) {
  return Alert.alert(
    "Etes vous sûr ?",
    "Vous allez supprimer une oeuvre de la base de données, êtes vous sûr ?",
    [
      {
        text: "Annuler",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          supprimer();
        },
        style: "ok",
      },
    ]
  );
}

const styles = StyleSheet.create({});
