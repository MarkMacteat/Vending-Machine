import React from "react";

function App() {

    let count = 0;

    const increment = () => {
        count += 1;
    }

    const decrement = () => {
        count -= 1;
    }

    return(
        <div>
            <h1>welcome to my counter App</h1>
            <P>The count is: {count}</P>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default App;