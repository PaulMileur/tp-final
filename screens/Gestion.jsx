import { View } from "react-native";
import React, { useState } from "react";
import ListeOeuvre from "../composants/ListeOeuvre";

export default function Gestion() {
  const [update, setUpdate] = useState(true);
  return (
    <View style={{ flex: 1 }}>
      <ListeOeuvre update={update} setUpdate={setUpdate} />
    </View>
  );
}
