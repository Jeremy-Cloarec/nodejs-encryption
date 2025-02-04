import { showCryptedData, showDecryptedData, sendDataToDecrypt } from "./encryptedFunctions.js";

const form1 = document.querySelector("#form-encrypt");
const containerCrypted = document.querySelector("#crypted");

async function sendData(form, url) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`/${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur : ', errorData.error);

            containerCrypted.textContent = "";
            const p = document.createElement('p');
            p.classList.add('error');
            p.textContent = errorData.error;
            containerCrypted.appendChild(p);

            return;
        }

        let result = await response.json();
        console.log(result);

        showCryptedData(containerCrypted, "Cryptage :", result.encryptedData);

        showDecryptedData(containerCrypted, result.encryptedData);

        const form2 = document.querySelector("#form-decrypt");

        form2.addEventListener('submit', (e) => {
            e.preventDefault();
            sendDataToDecrypt(form2, "decrypt", containerCrypted);
        });

    } catch (e) {
        console.error(e);
    }
}

form1.addEventListener('submit', (e) => {
    e.preventDefault();
    sendData(form1, "encrypt");
});



