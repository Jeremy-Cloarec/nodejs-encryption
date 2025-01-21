import crypto from 'crypto';
import config from './config.js';
import { error } from 'console';
import e from 'express';

/*
Metaphore : 
Cipher: boite avec cadenas
Message : contenu dans la boite
IV: change la façon dont le contenu est rangé dans la boite
*/

const { secret_key, secret_iv, encryption_method } = config;

if (!secret_key || !secret_iv || !encryption_method) {
    throw new Error('secretKey, secretIV, and encryptionMetho are required');
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

// Initialisation vector for encryption
// Permet d'avoir un chiffrement plus aléatoire
const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16);

//Encrypt data
export function encryptData(data) {
    try {
        const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64'); // Encrypt data and convert to hex and based 64

    } catch (error) {
        console.error( error);
        throw new Error("Une erreur est survenue lors du chiffrement");
    }
};

//Decrypt data
export function decryptData(encryptedData) {
    try {
        const buff = Buffer.from(encryptedData, 'base64')
        const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV)
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8'))
        // Decrypts data and converts to utf8

    } catch (error) {
        console.error(error);
        throw new Error("Une erreur est survenue lors du déchiffrement");
    }
}



