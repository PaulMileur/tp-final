import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ModifOeuvre({ item, setId, setUpdate }) {
  const [oeuvre, setOeuvre] = useState(item);

  function submit(id) {
    updateDoc(doc(db, "oeuvres", id), oeuvre).then(function () {
      setOeuvre({});
      setId("");
      setUpdate(function (update) {
        return !update;
      });
    });
  }

  function remplir(valeurSaisie, nom) {
    const cloneOeuvre = { ...oeuvre };
    cloneOeuvre[nom] = valeurSaisie;
    setOeuvre(cloneOeuvre);
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="nom"
        style={styles.input}
        onChangeText={function (texteSaisi) {
          remplir(texteSaisi, "nom");
        }}
        value={oeuvre.nom}
        maxLength={255}
      />
      <TextInput
        placeholder="description"
        style={styles.inputMultiline}
        onChangeText={function (texteSaisi) {
          remplir(texteSaisi, "description");
        }}
        value={oeuvre.description}
        multiline={true}
        numberOfLines={5}
        maxLength={10000}
      />
      <TextInput
        placeholder="url de l'image"
        style={styles.input}
        onChangeText={function (texteSaisi) {
          remplir(texteSaisi, "image");
        }}
        value={oeuvre.image}
        maxLength={10000}
      />
      <TextInput
        placeholder="auteur"
        style={styles.input}
        onChangeText={function (texteSaisi) {
          remplir(texteSaisi, "auteur");
        }}
        value={oeuvre.auteur}
        maxLength={255}
      />
      <TextInput
        placeholder="date de création"
        style={styles.input}
        onChangeText={function (texteSaisi) {
          remplir(texteSaisi, "dt_creation");
        }}
        value={oeuvre.dt_creation}
        maxLength={255}
      />
      <Button
        title={"Mettre à jour"}
        onPress={function () {
          submit(oeuvre.id);
        }}
        color={"teal"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  inputMultiline: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
  },
});
