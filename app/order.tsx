import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useOrder } from '@/store/order'
import { Timestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

import { CheckIcon, Select } from "native-base";


type Props = {}

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



const order = (props: Props) => {
  const {order,setOrder} = useOrder()
  const [selectedState, setSelectedState] = useState(states[1]); // Default state
  const [openStateChanger, setOpenStateChanger] = useState(false)


  useEffect(() => {
    if(!order) return
    setSelectedState(states.find((s) => (s.name as string ).toLowerCase() === order.status.toLocaleLowerCase()) || states[2]);
  }, [order])
  

  return (
    (order && states) &&

    <View style={{
      flex:1,
      padding:15,
      backgroundColor:"white",
    }}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <View style={{
          position:"relative",
        }}>
          <TouchableOpacity onPress={()=>setOpenStateChanger(true)}>
            <Text style={{...styles.state,backgroundColor:selectedState.color+"30",color:selectedState.color,borderColor:selectedState.color}}>{order.status}</Text>
          </TouchableOpacity>
          {
            openStateChanger &&
            <View style={{
              position:"absolute",
              top:30,
              left:0,
              backgroundColor:"white",
              zIndex:100,
              width:140,
              padding:5,
              borderWidth:1,
              borderColor:"#00000022",
              borderRadius:20
            }}>
          {
            states.map((s,i)=>{
              return(
                <TouchableOpacity key={i} onPress={()=>{setSelectedState(s);setOpenStateChanger(false)}}>
                  <Text key={i} style={{...styles.state,backgroundColor:s.color+"30",color:s.color,borderColor:s.color,alignSelf:"stretch", paddingVertical:8}}>{s.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
          }
        </View>
        <Text style={{fontSize:14}}>{formatCreatedAt(order?.createdAt)}</Text>
      </View>



      <View style={{flexDirection:"row",gap:8,marginVertical:10}}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome  name="whatsapp" size={24} color="black" />
          <Text>Confirm Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="trash-o" size={24} color="black" />
          <Text>Delete Order</Text>
        </TouchableOpacity>

      </View>

      <Text style={{fontSize:24}}>{order.cart.reduce((acc,item)=>acc+item.quantity,0)} Pots</Text>
      <Text style={{fontSize:18}}>{order?.firstName} {order?.lastName}</Text>
      <Text style={{fontSize:18}}>{order?.number}</Text>
      <Text style={{fontSize:18}}>{order?.city}</Text>
      <Text style={{fontSize:18}}>{order?.address}</Text>
    </View>
  )
}

export default order

const styles = StyleSheet.create({
  button:{
    flexDirection:"row",
    alignItems:"center",
    gap:5,
    padding:8,
    borderWidth:1,
    borderRadius:5,
    borderColor:"#3333",
    flex:1,
  },
  state: {
    marginBottom:4,
    fontSize: 14,
    fontWeight: 'bold',
    padding:3,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignSelf:"flex-start",
    borderWidth:1,
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

