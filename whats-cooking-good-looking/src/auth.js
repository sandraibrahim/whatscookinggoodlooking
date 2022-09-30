import { useState } from "react";

// Allows and modifications to local storage.
export const useLocalStorage = (keyName, defaultValue) => {
    // Gets value from local storage if exists, else adds to local storage and returns.
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Sets value to item in local storage if it exists, else value = null.
            const value = window.localStorage.getItem(keyName);

            // If exists, return. Else add to storage and return.
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
            // Catch any errors.
        } catch (err) {
            return defaultValue;
        }
    });

    // Modifies.
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) { }
        // Sets the stored value to the new value.
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};