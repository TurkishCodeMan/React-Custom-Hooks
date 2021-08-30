import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
const useLocalStorage = (
    key,
    initialValue = 0,
    { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) => {


    const [state, setState] = useState(get());

    const prevKeyRef = useRef(key);

    function get() {

        const storageValue = localStorage.getItem(key);

        if (storageValue) {
            try {
                return deserialize(storageValue);
            } catch (error) {
                localStorage.removeItem(key);
            }
        }
        return typeof initialValue === 'function' ? initialValue() : initialValue

    }

    useEffect(() => {
        const prevKey = prevKeyRef.current;
        console.log(prevKey);
        console.log(key)
        if (prevKey !== key) {
            localStorage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
        localStorage.setItem(key, serialize(state));

    }, [key, state, serialize]);

    return [state, setState];
}






const Counter = ({ defaultValue = 0 }) => {

    const [state, setState] = useLocalStorage('count', defaultValue);
    console.log(state)
    return (
        <div className="w-full bg-gray-100 min-h-screen">
            <div className="bg-white p-10">
                <form>
                    <label htmlFor="counter" >
                        <input
                            id="counter"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder="Count"
                            className="rounded-md border px-2 py-1 border-gray-700" />
                    </label>

                </form>
                <button className="bg-blue-300 rounded-md px-8 mt-6 py-1">
                    Set
                </button>
                <button className="bg-red-300 rounded-md px-8 mt-6 py-1">
                    Increment
                </button>
                <button className="bg-yellow-300 rounded-md px-8 mt-6 py-1">
                    Decrement
                </button>
            </div>
        </div>
    )
}

export default Counter;