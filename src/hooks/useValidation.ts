// *** NPM ***
import { Alert } from 'react-native';

// *** CONSTANTS ***
const API_URL = 'https://ipcama.ru/api/Login';

// *** TYPES ***
interface ValidationOptions {
  checkConfirmPassword?: boolean;
}

const useValidation = (
  username: string,
  login: string,
  password: string,
  confirmPassword: string,
  options: ValidationOptions,
  setIsLoading: (loading: boolean) => void
) => {
  
  const validateFields = (): boolean => {
    if (!username || !login || !password || (options?.checkConfirmPassword && !confirmPassword)) {
      Alert.alert('Ошибка', 'Поля не могут быть пустыми');
      return false;
    }

    if (/\s/.test(username) || /\s/.test(login) || /\s/.test(password) || (options?.checkConfirmPassword && /\s/.test(confirmPassword.trim()))) {
      Alert.alert('Ошибка', 'Поля не должны содержать пробелы');
      return false;
    }

    if (!/^[a-zA-Z0-9]*$/.test(login) || !/^[a-zA-Z0-9]*$/.test(password) || (options?.checkConfirmPassword && !/^[a-zA-Z0-9]*$/.test(confirmPassword.trim()))) {
      Alert.alert('Ошибка', 'Логин и пароль должны содержать только английские буквы');
      return false;
    }

    if (options?.checkConfirmPassword && password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return false;
    }

    return true;
  };

  const validateWithServer = async (): Promise<boolean> => {
    setIsLoading(true); 
    try {
      const params = new URLSearchParams();
      params.append('Login', login);
      params.append('Password', password);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        handleServerError(data);
        return false;
      }

      if (data.SessionID && data.UserID) return true;

      Alert.alert('Ошибка', 'Проверка сервера не удалась');
      return false;
    } catch (error) {
      Alert.alert('Ошибка', 'Ошибка подключения к серверу');
      return false;
    } finally {
      setIsLoading(false); 
    }
  };

  const handleServerError = (data: any) => {
    if (data.Error) {
      Alert.alert('Ошибка', data.Error);
    } else {
      Alert.alert('Ошибка', 'Неверный логин или пароль.');
    }
  };

  return { validateFields, validateWithServer };
};

export default useValidation;
