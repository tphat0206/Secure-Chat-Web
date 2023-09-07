import CryptoJS from 'crypto-js'

const hashFunction = (source:string) => {
    return CryptoJS.SHA3(source, { outputLength: 224 }).toString();
}

export default hashFunction