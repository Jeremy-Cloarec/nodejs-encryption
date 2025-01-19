import { showCryptedData, showDecryptedData } from "./showCrypted.js";

const form = document.querySelector("#form-encrypt");
const containerCrypted = document.querySelector("#crypted");
const containerDecrypted = document.querySelector("#decrypted");

async function sendData() {
    const formData = new FormData(form);
    let valuePost = "";

    for (const [ _, value] of formData){
        valuePost = value;
    }

    const data = {data: valuePost};

    console.log(data);

    try {
        const response = await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let result = await response.json();
        console.log(result);   
        
        showCryptedData(containerCrypted, "Cryptage :", result.encryptedData);
        
    } catch (e) {
        console.error(e);
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendData();
});

