import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={18} color="#aaa" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Pesquise por filmes e séries"
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange} // Só altera o estado, não busca automaticamente
        returnKeyType="search"
        onSubmitEditing={onSearch} // Envia a busca ao pressionar Enter
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#222',
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    color: '#fff',
    fontSize: 16,
  },
});
