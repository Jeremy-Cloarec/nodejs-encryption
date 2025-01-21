import crypto from 'crypto';
import config from './config.js';

/*
Metaphore : 
Cipher: boite avec cadenas
Message : contenu dans la boite
IV: change la façon dont le contenu est rangé dans la boite
*/

const { secret_key, encryption_method } = config;

if (!secret_key || !encryption_method) {
    throw new Error('secretKey, secretIV, and encryptionMethod are required');
}

//Generate secret hash whith crypto to use for encryption
const key = crypto
    // Crée une instance de hashage avec l'algorithme sha512
    .createHash('sha512')

    // Met à jour l'instance de hashage avec la clé secrète
    .update(secret_key)
    // Récupère la valeur de hashage en hexadécimal et prend les 32 premiers caractères
    .digest('hex')
    .substring(0, 32);

//Encrypt data
export function encryptData(data) {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(encryption_method, key, iv);
        const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;

    } catch (error) {
        console.error(error);
        throw new Error("Une erreur est survenue lors du chiffrement");
    }
};

//Decrypt data
export function decryptData(encryptedData) {
    try {
        const [ivHex, encrypted] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(encryption_method, key, iv);
        return (
            decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
        );
        // Decrypts data and converts to utf8

    } catch (error) {
        console.error(error);
        throw new Error("Une erreur est survenue lors du déchiffrement");
    }
}



