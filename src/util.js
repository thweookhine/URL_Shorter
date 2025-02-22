
const generateRandomWord = (targetLength = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789"
    let length = 6 /2;
    let result = ""
    for(let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    for(let i = 0; i< targetLength - length; i++){
        result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return result;
}

const isValidURL = (urlString) => {
    var regex =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(urlString);
  }

module.exports = {generateRandomWord, isValidURL}