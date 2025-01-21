export function showCryptedData(container, h2, encryptedData) {
    container.textContent = "";
    const h2New = document.createElement('h2'); h2New.textContent = h2;
    const pNew = document.createElement('p');
    pNew.textContent = encryptedData;
    container.appendChild(h2New);
    container.appendChild(pNew);
}

export function showDecryptedData(container, encryptedData) {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');
    form.setAttribute('id', 'form-decrypt');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'encryptedData');
    input.setAttribute('value', encryptedData);
    input.setAttribute('placeholder', 'Encrypted data');
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.textContent = 'Decrypter';
    form.appendChild(input);
    form.appendChild(button);
    container.appendChild(form);

    const containerDecrypted = document.createElement('div');
    containerDecrypted.setAttribute('id', 'decrypted');
    container.appendChild(containerDecrypted);
}

export async function sendDataToDecrypt(form, url) {
    const formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());
    const containerDecrypted = document.querySelector("#decrypted");

    try {
        const response = await fetch(`/${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        if(!response.ok) {
            const errorData = await response.json();
            console.error('Erreur : ', errorData.error);

            containerDecrypted.textContent = "";
            const p = document.createElement('p');
            p.classList.add('error');
            p.textContent = errorData.error;
            containerDecrypted.appendChild(p);

            return;
        }

        let result = await response.json();
        console.log(result);
        containerDecrypted.textContent = "";
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        h2.textContent = `Décryptage: `;
        p.textContent = result.data;
        containerDecrypted.appendChild(h2);
        containerDecrypted.appendChild(p);

    } catch (e) {
        console.error(e);
    }
}