import { FlatList, Image, Linking, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

import { CheckIcon, ScrollView, Select } from "native-base";
import { db } from '@/firebase';

import { useOrder } from '@/store/order';

type Props = {}



const states = [
  {
    name: "New",
    color: "#98b000",
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
    color: "#3c8001",
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




const StateSwitcher = (props: Props) => {

  const {order,setOrder} = useOrder()
  const [selectedState, setSelectedState] = useState(states[1]); // Default state
  const [openStateChanger, setOpenStateChanger] = useState(false)



  useEffect(() => {
    if(!order) return
    setSelectedState(states.find((s) => (s.name as string ).toLowerCase() === order.status.toLocaleLowerCase()) || states[2]);
  }, [order])



  const changeState = (state:{color:string,name:string})=>{
    if(!order) return
    updateDoc(doc(db,"orders",order.id),{
      status:state.name
    })


    const oldState = selectedState;
    addDoc(collection(db,"notifications"),{
      message:`Order of ${[order?.firstName,order?.lastName].join(" ")} , status changed from ${oldState.name} to ${state.name}`,
      date: Timestamp.now(),
      type:"order-state-change",
      from:oldState.name,
      to:state.name,
      order:order,
      user: {
        name:"cactusia app",
        email:"",
      }
    })

  }
  return (
      <View style={{flexDirection:"row",justifyContent:"space-between",zIndex:1000,position:"relative"}}>
        <View style={{
          position:"relative",
        }}>
          <TouchableOpacity  onPress={()=>setOpenStateChanger(!openStateChanger)}>
            <Text style={{...styles.state,backgroundColor:selectedState.color,color:"white",borderColor:selectedState.color}}>{selectedState.name}</Text>
          </TouchableOpacity>
          {
            openStateChanger &&
            <View style={{
              position:"absolute",
              top:30,
              left:0,
              backgroundColor:"white",
              zIndex:1000,
              width:140,
              padding:5,
              borderWidth:1,
              borderColor:"#00000022",
              borderRadius:20
            }}>
          {
            states.map((s,i)=>{
              return(
                <TouchableOpacity key={i} onPress={()=>{setSelectedState(s);setOpenStateChanger(false) ; changeState(s)}}>
                  <Text key={i} style={{...styles.state,backgroundColor:s.color,color:"white",borderColor:s.color,alignSelf:"stretch", paddingVertical:8}}>{s.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
          }
        </View>
        {/* <Text style={{fontSize:14}}>{formatCreatedAt(order?.createdAt)}</Text> */}
      </View>
  )
}

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

export default StateSwitcher
