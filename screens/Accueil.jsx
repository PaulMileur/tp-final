import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

export default function Accueil() {
  const [oeuvres, setOeuvres] = useState([]);
  useEffect(function () {
    getDocs(collection(db, "oeuvres")).then(function (reponse) {
      const resultat = reponse.docs.map(function (doc) {
        return doc.data();
      });
      setOeuvres(resultat);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 28, color: "teal", padding: 10 }}>
        Liste des oeuvres disponibles
      </Text>
      <FlatList
        style={{ padding: 10 }}
        data={oeuvres}
        keyExtractor={function () {
          return Math.random().toString();
        }}
        renderItem={function ({ item }) {
          return (
            <View style={{ paddingBottom: 25 }}>
              <Text style={{ fontSize: 25 }}>{item.nom}</Text>
              <Text>{item.description}</Text>
              <Image
                source={{
                  uri: item.image,
                  height: 200,
                }}
                resizeMode="contain"
              />
              <Text>Par {item.auteur}</Text>
              <Text>Créé à la date {item.dt_creation}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
