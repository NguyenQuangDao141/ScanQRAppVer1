import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 20, 
    backgroundColor: '#fff',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  }
});;