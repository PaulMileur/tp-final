import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../config/firebase";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import Confirm from "./Confirm";
import ModifOeuvre from "./ModifOeuvre";

export default function ListeOeuvre({ update, setUpdate }) {
  const [oeuvres, setOeuvres] = useState([]);
  const [id, setId] = useState("");
  useEffect(
    function () {
      getDocs(collection(db, "oeuvres")).then(function (reponse) {
        const resultat = reponse.docs.map(function (doc) {
          return { ...doc.data(), id: doc.id };
        });
        setOeuvres(resultat);
      });
    },
    [update]
  );

  function supprimer(id) {
    deleteDoc(doc(db, "oeuvres", id)).then(function () {
      setUpdate(function (update) {
        return !update;
      });
      alert("L'oeuvre a bien été supprimé de la base de données.");
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 28, color: "teal", padding: 10 }}>
        Liste des oeuvres disponibles
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ padding: 10 }}
          data={oeuvres}
          renderItem={function ({ item }) {
            return (
              <View style={{ flex: 1 }}>
                {item.id === id ? (
                  <ModifOeuvre
                    item={item}
                    setUpdate={setUpdate}
                    setId={setId}
                  />
                ) : (
                  <View style={{ paddingBottom: 25, flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 25 }}>{item.nom}</Text>
                      <TouchableOpacity
                        onPress={function () {
                          setId(item.id);
                        }}
                      >
                        <MaterialCommunityIcons
                          name={"autorenew"}
                          size={30}
                          color={"orange"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={function () {
                          Confirm(function () {
                            supprimer(item.id);
                          });
                        }}
                      >
                        <MaterialCommunityIcons
                          name={"delete"}
                          size={30}
                          color={"red"}
                        />
                      </TouchableOpacity>
                    </View>
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
                )}
              </View>
            );
          }}
          keyExtractor={function () {
            return Math.random().toString();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
