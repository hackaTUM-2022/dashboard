// @bekbrace
// FARMSTACK Tutorial - Sunday 13.06.2021

import OrderItem from "./Order"

export default function OrderView(props) {
    return (
        props.stockList.map(stock => <OrderItem stock={stock} />)
    )
}