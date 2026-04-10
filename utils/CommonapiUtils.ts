import { APIRequestContext } from '@playwright/test'
import apiPathData from '../data/api-data/api-path-data.json'
import cryptoJs from 'crypto-js';

export default class CommonapiUtils {

    private request: APIRequestContext;
    private SecretKey: string;

    constructor(request: APIRequestContext) {

        this.request = request;



        if (process.env.SECRET_KEY) {
            this.SecretKey = process.env.SECRET_KEY;
        }
        else {
            throw new Error('Secret key is not provided. Please set the SECRET_KEY environment variable or pass it as a parameter to the constructor.');
        }
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

    public async createToken() {
        const apiusername = this.decryptData(process.env.ENCRYPTED_APIUSERNAME!)
        const apipassword = this.decryptData(process.env.ENCRYPTED_APIPASSWORD!)

        const createTokenresp = await this.request.post(apiPathData.auth_path, {
            data: {
                "username": apiusername,
                "password": apipassword
            }
        })
        const createTokenrespjson = await createTokenresp.json();
        return createTokenrespjson.token;
    }

}