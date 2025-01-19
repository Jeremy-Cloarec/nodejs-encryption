import crypto from 'crypto';
import config from './config.js';

const { secret_key, secret_iv, encryption_method } = config;

if (!secret_key || !secret_iv || !encryption_method) {
    throw new Error('secretKey, secretIV, and encryptionMetho are required');
}

//Generate secret hash whith crypto to use for encryption
const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32);
const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16);

//Encrypt data
export function encryptData(data) {
    const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64'); // Encrypt dataa and convert to hex and based 64
};

//Decrypt data
export function decryptData(encryptedData) {
    if (!encryptedData) {
        throw new Error('Encrypted data is required');
    }

    try {
        // Convert base64 string to buffer
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV);

        // Perform decryption and return the result as a UTF-8 string
        const decrypted = decipher.update(buff, null, 'utf8') + decipher.final('utf8');
        return decrypted;
    } catch (error) {
        throw new Error('Failed to decrypt data: ' + error.message);
    }
}


