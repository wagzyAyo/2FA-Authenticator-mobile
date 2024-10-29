import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const checkAccountKey= (accountKey)=>{
    if(accountKey.length >= 16){
        const regx = /^[A-Z2-7]+$/i;
        if(regx.test(accountKey)){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
}

export const handleSubmit = async(accountKey, accountName, navigation)=>{
    if(!accountKey || !accountName){
        Alert.alert('Please provide account name and key');
        return;
    }

    try {
        const response = await fetch('https://twofa-authenticator.onrender.com/api/addapp', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {
                    appName: accountName
                })
            }
        );

        const data = await response.json();

        if (response.status === 200){
            
            const existingAccount = await AsyncStorage.getItem('accounts');
            const accounts = existingAccount ? JSON.parse(existingAccount) : [];
            const newAccount = {appName: accountName, accountKey}
            accounts.push(newAccount);
            await AsyncStorage.setItem('accounts', JSON.stringify(accounts))
            Alert.alert('Accounnt added');
            navigation.navigate('Home');
        } else{
            Alert.alert('Error adding newApp')
        }
        
    } catch (err) {
        console.log(err);
        Alert.alert("Error adding account", err.messge)
    }
    
}


export const handleUpdate = async(accountKey, accountName, navigation)=>{
    if(!accountKey || !accountName){
        Alert.alert('Please provide account name and key');
        return;
    }

    try {
          
        const existingAccount = await AsyncStorage.getItem('accounts');
        const accounts = existingAccount ? JSON.parse(existingAccount) : [];
        const accountIndex = accounts.findIndex((item)=>{
            item.appName === accountName
        })

        if(accountIndex !== -1){
            accounts[accountIndex].accountKey = accountKey
            await AsyncStorage.setItem('accounts', JSON.stringify(accounts))
            Alert.alert('Accounnt updated');
            navigation.navigate('Home')
        }else{
            Alert.alert('Account not found')
        }
        
    } catch (err) {
        console.log(err);
        Alert.alert("Error adding account", err.message)
    }
    
}
