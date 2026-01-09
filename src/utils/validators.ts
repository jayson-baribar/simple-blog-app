// validate empty, null, or only spaces
const isBlank = (value: string | null | undefined): boolean => {
  if (!value) return true;
  return value.trim().length === 0;
};

// min character checker ( num )
const isTooShort = (value: string, minLength: number): boolean => {
  return value.trim().length < minLength;
};

// max character checker ( num )
const isTooLong = (value: string, maxLength: number): boolean => {
    return value.trim().length < maxLength;
}

// password validation
const isPasswordValid = ( password: string ): boolean => {
    if (isBlank(password), isTooShort(password, 8) || isTooLong(password, 16)){
        return false;
    }

    return true;    
}


export default {
    isBlank,
    isTooShort,
    isTooLong,
    isPasswordValid
};