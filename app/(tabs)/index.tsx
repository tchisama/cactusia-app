import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { Order } from './two';
import { Text, View } from '@/components/Themed';






export default function TabOneScreen() {

  const [monthsOrders,setMonthsOrders] = React.useState(0)
  const [confirmedOrders,setConfirmedOrders] = React.useState(0)
  const [confirmedProfit,setConfirmedProfit] = React.useState(0)
  const [users,setUsers] = React.useState(0)
  // start is month before 
  const start = new Date(new Date().setDate(new Date().getDate() - 30));
  // end is today
  const end = new Date();
  // useEffect(() => {
  //   const q = query(collection(db,"orders"),where("createdAt",">=",start),where("createdAt","<=",end),limit(30))
  //   getDocs(q).then((querySnapshot)=>{
  //     const docs = querySnapshot.docs.map(doc => doc.data() as Order);
  //     setMonthsOrders(docs.length)
  //     setConfirmedOrders(docs.filter((d)=>d.status === "Livré").length)
  //     setConfirmedProfit(docs.filter((d)=>d.status === "Livré").reduce((a,b)=>a + b.price,0))
  //   })
  // },[])
  
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>month orders</Text> */}
      {/* <Text style={styles.OrdersNumber}>{monthsOrders}</Text> */}
      {/* <View  style={{ display: 'flex' ,backgroundColor: '#fff', flexDirection: 'row' , justifyContent: 'space-between'}}> */}
      {/*   <View style={{backgroundColor: '#fff'}}> */}
      {/*     <Text style={styles.title}>delivered orders</Text> */}
      {/*     <Text style={styles.OrdersNumber2}>{confirmedOrders}</Text> */}
      {/*   </View> */}
      {/* </View> */}
      {/*   <View style={{backgroundColor: '#fff'}}> */}
      {/*     <Text style={styles.title}>users</Text> */}
      {/*     <Text style={styles.OrdersNumber2}>{users} customer</Text> */}
      {/*   </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"black"
  },
  OrdersNumber:{
    fontSize: 60,
    fontWeight: 'bold',
    color:"black"
  },
  OrdersNumber2:{
    fontSize: 40,
    fontWeight: 'bold',
    color:"black"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
