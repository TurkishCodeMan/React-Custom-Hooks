import { useReducer } from "react";
import { useEffect } from "react";

export function useLocalStorage(
    key,
    initialValue,
    reducer = () => { },
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
    function get() {
        const storagedValue = localStorage.getItem(key);
        if (storagedValue) {
            try {
                return deserialize(storagedValue);
            } catch (error) {
                localStorage.removeItem(key);
            }
        }
        return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    const [state, dispatch] = useReducer(reducer, get());

    useEffect(() => {
        localStorage.setItem(key, serialize(state));
    }, [serialize, key, state]);

    return [state, dispatch];
}

