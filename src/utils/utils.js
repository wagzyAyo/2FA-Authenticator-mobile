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