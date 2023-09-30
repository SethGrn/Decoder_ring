// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope

  // function to check if the inputted alphabet has any duplicate characters in it
  function containsUniqueCharacters(alphabet) {
    // declare object to store our characters
    let charactersInAlphabet = {}; 

    // for each character in the alphabet
    for (const char of alphabet) {
      // if it is already stored in our object, it is a duplicate, the alphabet is unusable
      if (charactersInAlphabet[char] === 1) return false;
      // otherwise add it to our object
      charactersInAlphabet[char] = 1;
    }
    return true
  }

  // main function
  function substitution(input, alphabet, encode = true) {
    // check for improper input
    if (!alphabet || alphabet.length != 26) return false;

    // check to see if the provided alphabet contains unique characters using our function
    if (!containsUniqueCharacters(alphabet)) return false;
    // change to unput to lowercase
    input = input.toLowerCase();
    
    // declare a variable to store the decoded message
    let encodedMessage = [];

    for (let i = 0; i < input.length; i++) {
      // declare variable to equal the current character
      let currentChar = input[i];

      // if the current character is NOT a letter of the alphabet
      if (currentChar < 97 || currentChar > 122) {
        // no encoding needed, add it to the array
        encodedMessage.push(currentChar);
      } else {
        // if the current character is a letter of the alphabet and we are encoding
        if (encode) {
          // index our current characters unicode value to zero, (a = 0, b = 1 etc.) then add to our array the corosponding letter from the provided alphabet
          encodedMessage.push(alphabet[(input.charCodeAt(i) - 97)])
        } else {
          // if encode is false, we are decoding, so we use a nested for loop to decode
          for (let j = 0; j < alphabet.length; j++) {
            // when we find what place the current character is in the provided alphabet
            if (alphabet[j] === currentChar) {
              // add to our array the corrosponding letter from the normal alphabet (a-z)
              encodedMessage.push(String.fromCharCode(j + 97))
            }
          }
        }
      }
    }
    
    // return the decoded/encoded message
    return encodedMessage.join("");
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
