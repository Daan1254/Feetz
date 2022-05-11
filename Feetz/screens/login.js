import { StyleSheet, Text, View } from 'react-native';


const login = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Feetz</Text>
        </View>
    </View>
  )
}





const styles = StyleSheet.create({
    container: {
        height:'100%', 
        backgroundColor: '#30106B'
    },

    header: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        color: 'white'
    }
})

export default login