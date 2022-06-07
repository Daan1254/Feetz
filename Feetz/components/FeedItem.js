import {View, Text, StyleSheet, ImageBackground} from 'react-native';



export default function FeedItem({BackgroundImg, title, description, price}) {
    
    return  (
        <View style={styles.feedItemContainer}>
            <ImageBackground style={{height: '100%', borderRadius: 10}} source={{uri: BackgroundImg}}>
                <Text style={styles.feedTitle}>{title}</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    feedItemContainer: {
        width: '90%',
        margin: 15,
        height: 200,
        backgroundColor: '#333',
        display: 'flex',
        borderRadius: 10
    },
    feedTitle: {
        padding: 15,
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    }
  });   