import express from 'express';
import { encryptData, decryptData } from './encryption.js';

const router = express.Router();

router.post('/encrypt', (req, res) => {
    const re = /^[a-zA-Z0-9À-ÿ' ]+$/;
    try {
        // Prend la valeur de data dans le body de la requête
        const { data } = req.body;

        if (!data) {
            throw new Error("Le champ est requis");
        }

        if (!re.test(data)) {
            throw new Error("Le champ n'accepte pas les caractères spéciaux");
        }

        // Appelle la fonction encryptData avec la valeur de data en paramètre
        const encryptedData = encryptData(data);

        // Retourne la valeur encryptée
        res.json({ encryptedData })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/decrypt', (req, res) => {
    const re = /^[a-zA-Z0-9À-ÿ': ]+$/;
    try {
        const { encryptedData } = req.body;

        if (!re.test(encryptedData)) {
            throw new Error("Le champ n'accepte pas les caractères spéciaux");
        }

        const data = decryptData(encryptedData);
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;