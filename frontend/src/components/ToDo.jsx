import React from 'react'

const ToDo = ({todos}) => {
    return (
        <>
            {
                todos.map(function (todo,index) {
                    return (
                        <div key={index}>
                            <h1>{todo.title}</h1>
                            <h1>{todo.description}</h1>
                            <button>{todo.completion?"Completed":"Mark as Complete"}</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ToDo