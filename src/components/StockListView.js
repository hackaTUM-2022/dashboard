// @bekbrace
// FARMSTACK Tutorial - Sunday 13.06.2021

import StockItem from './Stock'

export default function StockView(props) {
    return (
        props.stockList.map(stock => <StockItem stock={stock} />)
    )
}