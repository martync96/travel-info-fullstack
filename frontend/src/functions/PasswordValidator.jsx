const PasswordValidator = (password) => {

    password = password.trim();
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.{8,}).*$/.test(password);
    //regular expressions for capitals letters, lowercase letters, numbers, and special characters
    // /[A-Z]/ - at least one capital letter
    // /[a-z]/ - at least one lowercase letter
    // /[0-9]/ - at least one number
    // /[$&+,:;=?@#|'<>.^*()%!-]/ - at least one special character
    // (?=.{8,}) - at least 8 characters long, look ahead assertion
};

export default PasswordValidator;