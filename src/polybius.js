// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // this function encodes a alphabetical character using the polybius graph
  function encodePolybiusGraph (unicodeChar) {
    // if the characters unicode value is equal to or greater than 'j'
    if (unicodeChar >= 106) {
      // since i and j are mapped to the same number, j and the rest of the alphabet are "shifted" backwards one
      unicodeChar -= 1;
    }
    // this variable stores the unicode letter minus 97 to index it from zero (a = 0, b = 1 etc.)
    let positionInAlphabet = unicodeChar - 97;
    // column is 1-5, the zero indexed alphabet mod 5 means that a(0) = 1, b(1) = 2, f(5) = 1, 
    let column = (positionInAlphabet % 5) + 1;
    // row is also 1-5, Mathfloor ignores the decimal so a-e maps to 1, f-k maps to 2 etc.
    let row = Math.floor(positionInAlphabet / 5) + 1;
    // if unicodeChar is less than 97(a) it is not a letter so return a space, else return column + return the column and row
    return unicodeChar < 97 ? " " : column + "" + row;
  }

  // function to decode a message
  function decodePolybiusGraph (message) {
    // if, after removing spaces from the message, it does not have even pairs of numbers, return false
    if (message.replace(" ", "").length % 2) {return false}

    // declare a variable to store the decoded message
    let decodedText = [];

    // while i is less than the message length, move forward one pair of numbers at a time
    for (let i = 0; i < message.length; i += 2) {
      // if the current letter is a space, there's nothing to decode
      if (message[i] === " ") {
        // push a space and then move past it
        decodedText.push(" ");
        i++
      } 
      // declare an array to store the pairs of numbers for decoding, must use parseInt function because the message is a string
      let currentChar = [parseInt(message[i]), parseInt(message[i + 1])];
      // declare a variable to mathematically store the unicode value of the current letter. Example -> to decode the letter c (31) -> 3 + (1 - 1) * 5 = 3 + 0 * 5 = 3, plus 97 = 100 or 'c'
      let letter = currentChar[0] + (currentChar[1] - 1) * 5;
      
      // if the letter is i or j, decode as (i/j)
      // else if the letter is greater than i or j, add 97 (because the rest of the alphabet after i/j is moved back by one, so z = 25, instead of 26)
      // else add 96, translate the unicode to a letter, and push to our array
      if (letter === 9) {
        decodedText.push("(i/j)")
      } else if (letter > 9) {
        letter += 97;
        decodedText.push(String.fromCharCode(letter))
      } else {
        letter += 96;
        decodedText.push(String.fromCharCode(letter))
      }
    }
    // return our decoded array as one string
    return decodedText.join("");
  }

  // main function
  function polybius(input, encode = true) {
    // your solution code here
    
    // declare variables to store the input, the unicode values of the input, and the encoded text
    let rawText = input;
    let inputUnicode = [];
    let encodedText = [];

    // if encode is true
    if (encode) {
      // translate the input to unicode
      for (let i = 0; i < input.length; i++) {
        inputUnicode.push(input.toLowerCase().charCodeAt(i));
      }
    
      // push the encoded character to our array
      for (let i = 0; i < inputUnicode.length; i++) {
        let currentChar = inputUnicode[i];
        encodedText.push(encodePolybiusGraph(currentChar))
      }
    } else {
      // encode is false, call our function to decode the message
      return decodePolybiusGraph(input);
    }

    // return the encoded or decoded text
    return encodedText.join("");
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };