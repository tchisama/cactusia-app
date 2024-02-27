import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';






export default function TabOneScreen() {


  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Today's Orders</Text>
      <Text style={styles.OrdersNumber}>4</Text>

      <View  style={{ display: 'flex', flexDirection: 'row' , justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.title}>New Orders</Text>
          <Text style={styles.OrdersNumber2}>2</Text>
        </View>
        <View>
          <Text style={styles.title}>Confirmed Orders</Text>
          <Text style={styles.OrdersNumber2}>3</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  OrdersNumber:{
    fontSize: 60,
    fontWeight: 'bold',
  },
  OrdersNumber2:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
