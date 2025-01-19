export function showCryptedData(container, h2, encryptedData) {
    const h2New = document.createElement('h2'); h2New.textContent = h2;
    const pNew = document.createElement('p');
    pNew.textContent = encryptedData;
    container.appendChild(h2New);
    container.appendChild(pNew);


}

export function showDecryptedData (){
    console.log("Decrypted");
    
}