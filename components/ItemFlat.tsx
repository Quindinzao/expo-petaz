import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ItemFlatProps {
  title: string;
  body: string;
  titleLabel: string;
  bodyLabel: string;
  onPress?: () => void;
}
const ItemFlat = (props: ItemFlatProps) => {
  return (
    <TouchableOpacity style={styles.itemFlatContainer}>
      <TouchableOpacity 
        style={styles.itemFlat}
        onPress={props.onPress} 
        activeOpacity={props.onPress ? 0.7 : 1}>
        <View style={styles.row}>
          <Text style={styles.label}>{props.titleLabel}</Text>
          <Text style={styles.itemFlatTitle} numberOfLines={2} ellipsizeMode="tail">{props.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{props.bodyLabel}</Text>
          <Text style={styles.itemFlatTitle} numberOfLines={2} ellipsizeMode="tail">{props.body}</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
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
    paddingVertical: 8,
    
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',

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
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    textTransform: 'capitalize'
  },
  label: {
    width: 100,
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  row: {
    flexDirection: 'row'
  }
});
