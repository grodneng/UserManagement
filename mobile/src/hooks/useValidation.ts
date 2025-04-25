// *** NPM ***
import { Alert } from 'react-native';

// *** TYPES ***
interface ValidationOptions {
  checkConfirmPassword?: boolean;
}

const useValidation = (login: string, password: string, confirmPassword: string, options?: ValidationOptions) => {
  
  // *** FIELD VALIDATION ***
  const validateFields = (): boolean => {
    // Check for empty fields
    if (!login.trim() || !password.trim() || (options?.checkConfirmPassword && !confirmPassword.trim())) {
      Alert.alert('Error', 'Fields cannot be empty or contain only spaces.');
      return false;
    }

    // Check if passwords match
    if (options?.checkConfirmPassword && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  // *** SERVER VALIDATION ***
  const validateWithServer = async (): Promise<boolean> => {
    try {
      const params = new URLSearchParams();
      params.append('Login', login);
      params.append('Password', password);

      const response = await fetch('https://ipcama.ru/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();

      // Check response status
      if (!response.ok) {
        handleServerError(data);
        return false;
      }

      // Validate session ID and user ID
      if (data.SessionID && data.UserID) {
        console.log('Login successful:', data);
        return true;
      } else {
        Alert.alert('Error', 'Server validation failed.');
        return false;
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      return false;
    }
  };

  // *** ERROR HANDLING ***
  const handleServerError = (data: any) => {
    if (data.Error) {
      Alert.alert('Error', data.Error);
    } else {
      Alert.alert('Error', 'Invalid login or password.');
    }
  };

  return { validateFields, validateWithServer };
};

export default useValidation;