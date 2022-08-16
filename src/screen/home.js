import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Box, Button, HStack, Input, Text, VStack } from "native-base";

import api from "../services/api";

export function Home() {
  const [cep, setCep] = useState("");
  const [cepResponse, setCepResponse] = useState(null);
  const [responseVisible, setResponseVisible] = useState(false);

  async function buscar() {
    if (cep == "") {
      Alert.alert("erro", "digite algum cep valido.");
      return;
    }

    try {
      const response = await api.get(`/${cep}`);
      console.log(response.data);
      setCepResponse(response.data);
      setResponseVisible(true);
      Keyboard.dismiss();
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }

  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <HStack px={8}>
        <Input
          placeholder="Digite aqui seu cep..."
          flex={1}
          keyboardType="numeric"
          onChangeText={setCep}
        />
        <Button bg="info.500" rounded={5} onPress={buscar}>
          Buscar
        </Button>
      </HStack>

      {responseVisible && (
        <Box bg="gray.200" p={4} mt={12} rounded={5}>
          <Text>cep: {cepResponse.cep}</Text>
          <Text>rua: {cepResponse.street}</Text>
          <Text>bairro: {cepResponse.neighborhood}</Text>
          <Text>cidade: {cepResponse.city}</Text>
          <Text>estado: {cepResponse.state}</Text>
        </Box>
      )}
    </VStack>
  );
}
