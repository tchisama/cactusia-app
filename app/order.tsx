import { FlatList, Image, Linking, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useOrder } from '@/store/order'
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

import { CheckIcon, ScrollView, Select } from "native-base";
import { db } from '@/firebase';


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



  const changeState = (state:{color:string,name:string})=>{
    if(!order) return
    updateDoc(doc(db,"orders",order.id),{
      status:state.name
    })
  }


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
            <Text style={{...styles.state,backgroundColor:selectedState.color+"30",color:selectedState.color,borderColor:selectedState.color}}>{selectedState.name}</Text>
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
                <TouchableOpacity key={i} onPress={()=>{setSelectedState(s);setOpenStateChanger(false) ; changeState(s)}}>
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
        <TouchableOpacity onPress={()=>{
          Linking.openURL(
            `https://api.whatsapp.com/send/?phone=%2B212${order.number.slice(1)}&text=Bonjour%20${order.firstName}%20${order.lastName},%20J'espère%20que%20vous%20allez%20bien.%20Vous%20avez%20passé%20commande%20chez%20cactusia%0A%0A-1%20Coffret%20d'un%20montant%20total%20de%20*${order.price}%20DH*.%20%0A%0AMerci%20bien%20de%20me%20confirmer%20votre%20commande%20afin%20de%20vous%20envoyer%20le%20colis%20dans%20les%20plus%20brefs%20délais.%20%0A%0A${"hiba"}%20de%20cactusia`
          )
        }} style={styles.button}>
          <FontAwesome  name="whatsapp" size={24} color="black" />
          <Text>Confirm Order</Text>
          <View style={{marginLeft:"auto"}}>
          <FontAwesome  name="arrow-right" size={15} color="black" />
          </View>
        </TouchableOpacity>

      </View>

      <Text style={{fontSize:24}}>{order.cart.reduce((acc,item)=>acc+item.quantity,0)} Pots</Text>
      <Text style={{fontSize:13}}>{order?.firstName} {order?.lastName}</Text>
      <Text style={{fontSize:13}}>{order?.number}</Text>
      <Text style={{fontSize:13}}>{order?.city}</Text>
      <Text style={{fontSize:13}}>{order?.address}</Text>
      <FlatList
        data={order?.cart}
        style={{marginTop:10}}
        numColumns={3}
        renderItem={({item})=>{
          return(
            <View style={{flexDirection:"column",alignItems:"center" ,flex:1,gap:8,marginVertical:10}}>
                    <Image style={{width:70,height:70,transform:[{translateY:25}],zIndex:1}} src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F"+item.cactus+"?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' width={50} height={50}></Image>
                    <Image style={{width:80,height:100}} src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F"+item.pot+"?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' width={50} height={50}></Image>
                    <Text style={{...styles.state,fontSize:18,alignSelf:"center",borderColor:"#3332"}}>{item.quantity}</Text>
            </View>
          )
        }}
       />
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

