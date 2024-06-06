import React from 'react';
import { StyleSheet, Text, View } from "react-native";

interface ItemFlatProps {
  title: string;
  description: string;
}
const ItemFlat = (props: ItemFlatProps) => {
  return (
    <View style={styles.itemFlatContainer}>
      <View style={styles.itemFlat}>
        <View style={styles.row}>
          <Text style={styles.itemFlatTitle}>Name: </Text>
          <Text style={styles.itemFlatTitle}>{props.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemFlatTitle}>Species: </Text>
          <Text style={styles.itemFlatTitle}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
}

export default ItemFlat;

const styles = StyleSheet.create({
  itemFlatContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  itemFlat: {
    width: '100%',
    height: 100,

    paddingHorizontal: 16,
    
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',

    borderRadius: 0,

    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras para Android
    elevation: 5,

    // position: 'absolute',
    // right: 12,
    // bottom: 12
  },
  itemFlatTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    textTransform: 'capitalize'
  },
  row: {
    flexDirection: 'row'
  }
});
