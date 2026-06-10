/* function AdminDashboard() {
    return (
        <div>
            Temporal Admin Dashboard
        </div>
    )
}

export default AdminDashboard */

import { useReducer } from "react";

const initialState = {
    counter: 0
}

function reducer(state, action) {

    switch (action.type) {

        case "INCREAMENT":
            return { counter: state.counter + 1 }

        case "DECREAMENT":
            return { counter: state.counter - 1 }

        default: state
    }
}

function AdminDashboard() {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <h1>{state.counter}</h1>
            <button onClick={() => dispatch({ type: "INCREAMENT" })}>
                Increament
            </button>

            <br></br>

            <button onClick={() => dispatch({ type: "DECREAMENT" })}>
                Decreament
            </button>
        </div>
    )
}

export default AdminDashboard