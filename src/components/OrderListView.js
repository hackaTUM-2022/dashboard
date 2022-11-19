// @bekbrace
// FARMSTACK Tutorial - Sunday 13.06.2021

import StockItem from './Stock'

export default function OrderView(props) {
    return (
        props.stockList.map(stock => <StockItem stock={stock} />)
    )
}