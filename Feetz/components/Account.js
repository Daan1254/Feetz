import {View, Text} from 'react-native';


const Account = ({data})=> {
    return (
        <View>
            <Text>{data.id}</Text>
            <Text>{data.username}</Text>
            <Text>{data.password}</Text>
        </View>
    )
}


export default Account;