import { useCallback } from "react";
import { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";


export const Context = createContext();

const STEP_ADD = "STEP_ADD";
const STEP_SET = "STEP_SET";
const SET_PRESENT = "SET_PRESENT";
const SET_STATE = "SET_STATE";

const undoState = {
    present: Array(9).fill(null),
}

const undoReducer = (state = undoState, action) => {
    if (action.type === STEP_ADD) {
        var stepNumber = action.payload.stepNumber;
        var a = {};
        a[stepNumber] = action.payload.newValue

        return {
            ...state,
            ...a,
        }
    }

    if (action.type === STEP_SET) {
        return {
            ...state,
            present: state[action.payload.stepNumber]
        }
    }

    if (action.type === SET_PRESENT) {
        return {
            ...state,
            present: action.payload.present
        }
    }
    if (action.type === SET_STATE) {
        return undoState;
    }
    return state;
}


export function ContextProvider({ children }) {
    const [state, dispatch] = useLocalStorage('board-persist', undoState, undoReducer)

    const squares = state.present;


    const addStep = useCallback((stepNumber, newValue) => {

        dispatch({
            type: STEP_ADD,
            payload: {
                newValue,
                stepNumber: String(stepNumber)
            }
        });
    }, [dispatch]);

    const setStep = useCallback((stepNumber) => {
        dispatch({
            type: STEP_SET,
            payload: {
                stepNumber
            }
        });
    }, [dispatch]);

    const setPresent = useCallback((present) => {
        dispatch({
            type: SET_PRESENT,
            payload: {
                present
            }
        });
    }, [dispatch]);

    const setState = useCallback(() => {
        dispatch({
            type: SET_STATE,
        })
    }, [dispatch])

    return (
        <Context.Provider
            value={{ state, squares, addStep, setStep, setState, setPresent }}
        >
            {children}
        </Context.Provider>
    );
}
