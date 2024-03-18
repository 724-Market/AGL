import {jwtDecode} from 'jwt-decode';
export default () => {
    

    interface DecodedToken {
        exp: number;
        [key: string]: any;
    }
    /**
 * Calculates the times expiry token milliseconds 
 *
 * @param {string} token The token from session get token api.
 * @returns {number} the result times milliseconds
 */
    const getExpireSecondTime = (token:string):number => {
        let result = 0
        try {
            const  decode =  jwtDecode<DecodedToken>(token);
            if(decode.exp)
            {
                const expDate = new Date(decode.exp * 1000)
                result =expDate.getTime() - (new Date()).getTime() 
            }
            console.log(decode,result)
            return result
          } catch (error) {
            console.error('Error decoding token:', error);
            return 0;
          }

        
    }
    return {
        getExpireSecondTime,
    }
}