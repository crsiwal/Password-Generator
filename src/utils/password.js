export const generatePassword = (length, options) => {
  const { includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;

  // Define character sets, excluding specific characters
  const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Excluded L, O
  const lowercaseChars = "abcdefghjkmnpqrstuvwxyz"; // Excluded i, l, o
  const numberChars = "23456789"; // Excluded 0, 1
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charSet = "";
  if (includeUppercase) charSet += uppercaseChars;
  if (includeLowercase) charSet += lowercaseChars;
  if (includeNumbers) charSet += numberChars;
  if (includeSymbols) charSet += symbolChars;

  const shortLength = charSet.length < length;

  const usedChars = new Set(); // To track used characters
  const sequential = ["abc", "bcd", "cde", "def", "efg", "fgh", "ghj", "hij", "ijk", "jkl", "klm", "lmn", "mno", "nop", "opq", "pqr", "qrs", "rst", "stu", "tuv", "uvw", "vwx", "wxy", "xyz", "789", "678", "567", "456", "345", "234", "123"];

  let password = "";

  // Function to check for sequential characters
  const hasSequentialCharacters = str => {
    return sequential.some(seq => str.includes(seq));
  };

  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    const char = charSet[randomIndex];
    if (!shortLength) {
      // Check for duplicates and sequential characters
      if (!usedChars.has(char) && !hasSequentialCharacters(password + char)) {
        password += char;
        usedChars.add(char);
      }
    } else {
      password += char;
    }
  }

  return password;
};
