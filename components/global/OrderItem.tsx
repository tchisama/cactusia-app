import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Order } from '@/app/(tabs)/two'
import { Timestamp } from 'firebase/firestore'
import { useOrder } from '@/store/order'
import { Link, router } from 'expo-router'
import StateSwitcher from './StateSwitcher'

type Props = {
  order:Order
}



const states = [
  {
    name: "New",
    color: "#7cb518",
    id: 1
  },
  {
    name: "Confirmé",
    color: "#277DA1",
    id: 2
  },
  {
    name: "Prêt",
    color: "#4D908E",
    id: 3
  },
  {
    name: "En livraison",
    color: "#985277",
    id: 4
  },
  {
    name: "Livré",
    color: "#5c8001",
    id: 5
  },
  {
    name: "Injoignable",
    color: "#bb4d00",
    id: 6
  },
  {
    name: "Reporté",
    color: "#D69E2E",
    id: 7
  },
  {
    name: "Annulé",
    color: "#c32f27",
    id: 8
  },
  {
    name: "Fake",
    color: "#333333",
    id: 9
  }
];









const OrderItem = ({order}: Props) => {
    const [selectedState, setSelectedState] = useState(states[1]); // Default state
    const {order:_order,setOrder} = useOrder()


  useEffect(() => {
    setSelectedState(states.find((s) => (s.name as string ).toLowerCase() === order.status.toLocaleLowerCase()) || states[2]);
  }, [order])



  return (
          
          <TouchableOpacity onPress={()=>{setOrder(order);router.navigate("/order")}}  style={styles.card}>
              <View style={{ display: 'flex',gap: 25, flexDirection: 'row' , justifyContent: 'space-between'}}>
                <View style={{ flex:1}}>
                  <Text style={{...styles.state,backgroundColor:selectedState.color,color:"white",borderColor:selectedState.color}}>{order.status}</Text>
                  {/* <StateSwitcher/> */}
                  <Text style={styles.title}>{order.firstName} . {order.lastName}</Text>
                  <Text style={styles.title}>{order.number}</Text>
                </View>
                <View style={{ flex:1}}>
                  <Text style={{...styles.title,marginBottom:4}}>{formatCreatedAt(order.createdAt)}</Text>
                  <Text style={styles.title}>{order.cart.reduce((acc, cur) => acc + (cur.quantity), 0)} Pots</Text>
                  <Text style={styles.title}>{order.city}</Text>
                </View>
                  <Ionicons style={{ alignSelf:"center"}} name="chevron-forward" size={15} color="#666" />
              </View>
          </TouchableOpacity>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  card:{
    backgroundColor:"white",
    padding: 14,
    borderRadius: 5,
    borderColor: '#00000011',
    borderBottomWidth:1,
    marginBottom:4,
  },
  state: {
    marginBottom:4,
    fontSize: 10,
    fontWeight: 'bold',
    padding:1,
    paddingHorizontal: 8,
    borderRadius: 25,
    alignSelf:"flex-start",
    borderWidth:1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})


 const formatCreatedAt = (timestamp: Timestamp) => {
    const dateObject = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateObject.toLocaleString('en-US', options).replace(',', ' /');
  };
