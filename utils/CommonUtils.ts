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
     * @throws Error if encryption fails
     */

    public encryptData(data: string): string {

        try
        {
            if (!data) {
                throw new Error('Data is not provided. Please provide a valid string to encrypt.');
            }
        const encryptedData = cryptoJs.AES.encrypt(data, this.SecretKey).toString();
        //console.log('Encrypted data: ', encryptedData);
        return encryptedData;
        }
        catch(error){
            throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

    }

        /**
         * Provide Decrypted Data from encrypted string
         * @param encryptedData 
         * @returns 
         * @throws Error if decryption fails
         */

    public decryptData(encryptedData: string): string {

        try {
            if (!encryptedData) {
                throw new Error('Encrypted data is not provided. Please provide a valid encrypted string.');
            }
            
        const decryptedData = cryptoJs.AES.decrypt(encryptedData, this.SecretKey).toString(cryptoJs.enc.Utf8);
        if (!decryptedData) {
            throw new Error('Decryption failed. Please check the encrypted data and secret key.');
        }
        //console.log('Decrypted data: ', decryptedData);
        return decryptedData;
        }
        catch (error) {
            throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    } 
}
