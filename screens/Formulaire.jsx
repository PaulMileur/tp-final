import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Formulaire() {
  const [oeuvre, setOeuvre] = useState({
    nom: "",
    description: "",
    image: "",
    auteur: "",
    dt_creation: "",
  });

  const [message, setMessage] = useState(false);

  function submit() {
    addDoc(collection(db, "oeuvres"), oeuvre).then(function () {
      setMessage(true);
      setTimeout(function () {
        setMessage(false);
      }, 1500);
      setOeuvre({
        nom: "",
        description: "",
        image: "",
        auteur: "",
        dt_creation: "",
      });
    });
  }

  function remplir(t, nom) {
    const cloneOeuvre = { ...oeuvre };
    cloneOeuvre[nom] = t;
    setOeuvre(cloneOeuvre);
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 28,
          color: "teal",
          padding: 10,
          paddingHorizontal: 20,
        }}
      >
        Ajouter une nouvelle oeuvre
      </Text>
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
      <TouchableOpacity style={styles.boxBtn} onPress={submit}>
        <Text style={styles.btn}>Ajouter</Text>
      </TouchableOpacity>
      {message && (
        <View>
          <Text style={styles.success}>Oeuvre enregistré dans firebase</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  inputMultiline: {
    borderColor: "black",
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  boxBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "teal",
    color: "white",
    padding: 10,
    width: "50%",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
  },
  success: {
    padding: 10,
    backgroundColor: "green",
    textAlign: "center",
    marginTop: 10,
  },
});
