import {message} from './Chat';
export const Encrypt = (props) => {
    function caesarCipher(input, key) {
        key = key % 26; // ให้ key เป็นค่าระหว่าง 0 ถึง 25
        let result = ''
    
        for (let i = 0; i < input.length; i++) {
          let char = input[i];
      
          if (char.match(/[a-z]/i)) {
            // ตรวจสอบว่าเป็นตัวอักษร a-z หรือ A-Z
            let code = input.charCodeAt(i);
      
            if (char.match(/[a-z]/)) {
              // กรณีตัวอักษรเป็นตัวพิมพ์เล็ก
              code = ((code - 97 + key) % 26) + 97;
            } else {
              // กรณีตัวอักษรเป็นตัวพิมพ์ใหญ่
              code = ((code - 65 + key) % 26) + 65;
            }
      
            char = String.fromCharCode(code);
          }
      
          result += char;
        }
      
        return result;
      }
      
}