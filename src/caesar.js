// Please refrain from tampering with the setup code provided here,
// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope

  // function returns true if the inputted unicode is a lowercase letter of the alphabet
  let isChar = (unicodeChar) => (unicodeChar >= 97 && unicodeChar <= 122) ? true : false;

  // function to mathematically 'shift' a letter and wrap it if neccessary 
  /* FUNCTION EXPLAINED
  (unicodeChar + shift - 71) -> takes the unicodeValue of the letter, shifts it, and then subtracts 71 (71 so that if the shift is negative, 
    we dont end up with a backslash or something wierd in place of a letter)
   % 26 + 97 -> this takes care of wrapping and jumps the character back to it's unicode value
  */
  let encodeAndWrap = (unicodeChar, shift) => (unicodeChar + shift - 71) % 26 + 97;

  // main function
  function caesar(input, shift = 0, encode = true) {

    // check if the function was called with the right inputs
    if (!input || !shift || Math.abs(shift) > 25) return false;

    // shift the input to lower case
    input = input.toLowerCase();

    // the caesar is simple enough that to decode, you may just encode it again in the opposite direction
    if (!encode) shift *= -1;
    
    // Declare an array to store the encoded message in unicode form
    let inputUnicode = [];

      // copy the input's unicode values so I can work with it
      for (let i = 0; i < input.length; i++) {
        // for every letter in the inputted message, at the unicode equivalent to our array
        inputUnicode.push(input.charCodeAt(i));
      }
      // encode the message
      for (let i = 0; i < inputUnicode.length; i++) {
        // if the current unicode character is in the alphabet
        if (isChar(inputUnicode[i])) {
            // encode the character
            inputUnicode[i] = encodeAndWrap(inputUnicode[i], shift);
        }
      }
      
      // return the encoded message in alphabetical form
      return String.fromCodePoint(...inputUnicode);
    }
    
  

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };