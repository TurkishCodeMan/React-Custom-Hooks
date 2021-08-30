import { memo, useCallback, useReducer } from "react"

const Name = memo(({ name, setName }) => {
    console.log('%cName: render start', 'color: Gray')

    return (

        <label htmlFor="name">
            <input
                className="border border-gray-700 m-2 p-1"
                id="name"
                value={name}
                placeholder="Name"
                onChange={e => setName(e.target.value)} />
        </label>

    )
})

const Surname = memo(({ surname, setSurname }) => {
    console.log('%cSurname: render start', 'color: Yellow')

    return (

        <label htmlFor="name">
            <input
                className="border border-gray-700 m-2 p-1"
                id="name"
                value={surname}
                placeholder="Surname"
                onChange={e => setSurname(e.target.value)} />
        </label>

    )
})

const DisplayResult = ({ name, surname }) => {
    console.log('%cDisplayResult: render start', 'color: BlueViolet')

    return (
        <div className="flex flex-col">
            <strong>Your Name: {name}</strong>
            <strong>Your Surname: {surname}</strong>
        </div>
    )
}


const liftReducer = (state, action) => {
    if (action.type === 'SET_NAME') {
        return {
            ...state,
            name: action.payload.name
        }
    }
    if (action.type === 'SET_SURNAME') {
        return {
            ...state,
            surname: action.payload.surname
        }
    }
    return state;
}


const LiftingState = () => {
    const [state, dispatch] = useReducer(liftReducer, {
        name: '',
        surname: ''
    });
    console.log('%cLifting: render start', 'color: MediumSpringGreen')
    return (
        <div className="flex flex-col items-center justify-center">
            <form className="flex flex-col">
                <Name name={state.name} setName={
                    useCallback((name) => dispatch({ type: 'SET_NAME', payload: { name } }), [dispatch])
                } />
                <Surname surname={state.surname} setSurname={
                    useCallback((surname) => dispatch({ type: 'SET_SURNAME', payload: { surname } }), [dispatch])
                } />
            </form>
            <DisplayResult name={state.name} surname={state.surname} />
        </div>
    )
}

export default LiftingState;