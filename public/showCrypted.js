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
    button.textContent = 'Decrypt';
    form.appendChild(input);
    form.appendChild(button);
    container.appendChild(form);
}

export async function sendDataToDecrypt(form, url, container) {
    console.log("sendDataToDecrypt");
    const formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`/${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let result = await response.json();
        console.log(result);

        const h2 = document.createElement('h2');
        h2.textContent = `Décryptage: ${result.data}`;
        container.appendChild(h2);

    } catch (e) {
        console.error(e);
    }
}