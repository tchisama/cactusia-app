import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import OrderItem from '@/components/global/OrderItem';
import { useEffect, useState } from 'react';
import {db} from "@/firebase"

import { Timestamp, collection, onSnapshot } from 'firebase/firestore'

export type Order = {
  id: string;
  firstName: string;
  lastName: string;
  number: string;
  address: string;
  city: string;
  price: number;
  createdAt: Timestamp;
  cart: CartItem[];
  status:"New"|"Confirmé"|"Prêt"|"En livraison"|"Livré"|"Injoignable"|"Reporté"|"Annulé"|"Fake"
};
export interface CartItem {
  cactus: string;
  pot: string;
  quantity: number;
}

export default function TabTwoScreen() {


  const [orders,setOrders] = useState<Order[]>()

  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "orders"), (doc) => {
        setOrders(
          doc.docs.map(d=>({...d.data() as Order ,id : d.id }))
        )
    });
    return()=> unsub()
  },[])







  return (
    <ScrollView style={styles.container}>
      {
        orders &&
        orders.map((order,i)=>{
          return(
            <OrderItem order={order} key={i} />
          )
        })
      }
      <View style={{ height: 100 , backgroundColor: '#fff'}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 12,
    paddingBottom: 10,
    backgroundColor:"white"
  },
});
