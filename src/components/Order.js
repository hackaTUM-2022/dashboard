// @bekbrace
// FARMSTACK Tutorial - Sunday 13.06.2021
import React from 'react'

function StockItem(props) {
   /* const deleteTodoHandler = (title) => {
    axios.delete(`http://localhost:8000/api/todo/${title}`)
        .then(res => console.log(res.data)) }
  */
    return (
        /**<div>
            <p>
                <span style={{ fontWeight: 'bold, underline' }}>{props.todo.title} : </span> {props.todo.description} 
                <button onClick={() => deleteTodoHandler(props.todo.title)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X</button>
                <hr></hr>

            </p>
        </div>**/
        <tr>
            <td>{props.stock.name}</td>
            <td>{props.stock.price}</td>
            <td>{props.stock.qty}</td>
            <td>{props.stock.side}</td>
        </tr>
    )
}

export default StockItem;