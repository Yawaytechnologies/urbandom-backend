export const emailValidate = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export const phoneValidate = (phone) => {
    // Regular expression for validating phone number format
    // Adjust the regex according to your phone number format requirements

    const phoneRegex =  /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

export const passwordValidate = (password) => {
    // Regular expression for validating password format
    // At least 8 characters long, at least one uppercase letter, one lowercase letter, one number, and one special character

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};


export const pincodeValidator = (pincode) => {
    // Regular expression for validating pincode format
    // Assuming pincode is a 6-digit number
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  export const userNameValidator = (username) => {
    // Regular expression for validating username format
    // Assuming username can contain letters, numbers, and underscores, and must be 3-15 characters long
    const userNameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    return userNameRegex.test(username);
  };


  export const nullValidator = (data) => {
    // Check for null, undefined, empty string, or only whitespace
    return data !== null && data !== undefined && String(data).trim() !== "";
  };
  