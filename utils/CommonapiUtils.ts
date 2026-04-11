import { APIRequestContext } from "@playwright/test";
import apiPathData from "../data/api-data/api-path-data.json";
import cryptoJs from "crypto-js";

export default class CommonapiUtils {
  private request: APIRequestContext;
  private SecretKey: string;

  constructor(request: APIRequestContext) {
    this.request = request;

    if (process.env.SECRET_KEY) {
      this.SecretKey = process.env.SECRET_KEY;
    } else {
      throw new Error(
        "Secret key is not provided. Please set the SECRET_KEY environment variable or pass it as a parameter to the constructor.",
      );
    }
  }

  /**
   * Provide Decrypted Data from encrypted string
   * @param encryptedData
   * @returns
   * @throws Error if decryption fails or result is empty
   */

  public decryptData(encryptedData: string): string {
    try {
      if (!encryptedData) {
        throw new Error(
          "Encrypted data is not provided. Please provide a valid encrypted string.",
        );
      }

      const decryptedData = cryptoJs.AES.decrypt(
        encryptedData,
        this.SecretKey,
      ).toString(cryptoJs.enc.Utf8);
      //console.log('Decrypted data: ', decryptedData);
      if (!decryptedData) {
        throw new Error(
          "Decryption failed. Please check the encrypted data and secret key.",
        );
      }
      return decryptedData;
    } catch (error) {
      throw new Error(
        `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Create authentication token for API requests
   * @returns {Promise<string>} Authentication token
   * @throws Error if token creation fails
   */

  public async createToken(): Promise<string> {
    try {
      if (
        !process.env.ENCRYPTED_APIUSERNAME ||
        !process.env.ENCRYPTED_APIPASSWORD
      ) {
        throw new Error("API credentials not found in environment variables");
      }
      const apiusername = this.decryptData(process.env.ENCRYPTED_APIUSERNAME!);
      const apipassword = this.decryptData(process.env.ENCRYPTED_APIPASSWORD!);

      const createTokenresp = await this.request.post(apiPathData.auth_path, {
        data: {
          username: apiusername,
          password: apipassword,
        },
      });

      if (!createTokenresp.ok()) {
        throw new Error(
          `Token creation failed with status: ${createTokenresp.status()}`,
        );
      }
      const createTokenrespjson = await createTokenresp.json();

      if (!createTokenrespjson.token) {
        throw new Error("Token not found in response");
      }

      return createTokenrespjson.token;
    } catch (error) {
      throw new Error(
        `Token creation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
