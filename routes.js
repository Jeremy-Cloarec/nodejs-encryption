import express from 'express';
import { encryptData, decryptData } from './encryption.js';

const router = express.Router();

router.post('/encrypt', (req, res) => {
    // Prend la valeur de data dans le body de la requête
    const  {data}  = req.body;
    
    // Appelle la fonction encryptData avec la valeur de data en paramètre
    const encryptedData = encryptData(data);    

    // Retourne la valeur encryptée
    res.json({ encryptedData })
});

router.post('/decrypt', (req, res) => {
    const { encryptedData } = req.body;
    const data = decryptData(encryptedData);
    res.json({ data });
});

export default router;