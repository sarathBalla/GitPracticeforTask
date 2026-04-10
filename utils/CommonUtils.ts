import cryptoJs from 'crypto-js';

export default class CommonUtils {

    private SecretKey: string;

    constructor() {

        //this.SecretKey = process.env.SECRET_KEY?process.env.SECRET_KEY:SecretKey;

        if (process.env.UI_SECRET_KEY) {
            this.SecretKey = process.env.UI_SECRET_KEY;
        }
        else {
            throw new Error('Secret key is not provided. Please set the SECRET_KEY environment variable or pass it as a parameter to the constructor.');
        }
    }

    /**
     * Provide Encrypted Data from string
     * @param data 
     * @returns 
     */
    public encryptData(data: string) {

        const encryptedData = cryptoJs.AES.encrypt(data, this.SecretKey).toString();
        console.log('Encrypted data: ', encryptedData);
        return encryptedData;

    }

    /**
     * Provide Decrypted Data from encrypted string
     * @param encryptedData 
     * @returns 
     */

    public decryptData(encryptedData: string) {

        const decryptedData = cryptoJs.AES.decrypt(encryptedData, this.SecretKey).toString(cryptoJs.enc.Utf8);
        console.log('Decrypted data: ', decryptedData);
        return decryptedData;
    } 
}
