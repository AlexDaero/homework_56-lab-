import React, { useRef, useState } from "react";
import Button from "../../UI/Button";
import './PayEqual.css'


function PayEqual() {
    const [result, setResult] = useState({ totalSum: 0, people: 0, individPay: 0 })
    const peopleInputRef = useRef(null)
    const orderSumRef = useRef(null)
    const tipsRef = useRef(null)
    const deliveryRef = useRef(null)
    const sumCount = () => {
        if (orderSumRef.current.value.length > 0 && peopleInputRef.current.value.length > 0) {
            const orderSum = Number(orderSumRef.current.value) + (orderSumRef.current.value * (tipsRef.current.value / 100))
            const copyState = { ...result }
            copyState.people = peopleInputRef.current.value
            if (deliveryRef.current.value > 0) {
                copyState.totalSum = orderSum + Number(deliveryRef.current.value)
                copyState.individPay = Math.ceil((Number(orderSum) + Number(deliveryRef.current.value)) / Number(peopleInputRef.current.value))
            } else {
                copyState.totalSum = orderSum
                copyState.individPay = Math.ceil(orderSum / Number(peopleInputRef.current.value))
            }
            setResult(copyState)
        } else{
            alert('Введите количество человек и сумму заказа')
        }
    }
    return (
        <>
            <div className="content_calcMenu_item">
                <p>Человек:</p>
                <div className="content_calcMenu_item_block">
                    <input
                        className="content_calcMenu_item_block_input"
                        ref={peopleInputRef}
                        type="text" />
                    <p className="content_calcMenu_item_block_text">
                        человек
                    </p>
                </div>
            </div>
            <div className="content_calcMenu_item">
                <p>Сумма заказа:</p>
                <div className="content_calcMenu_item_block">
                    <input
                        className="content_calcMenu_item_block_input"
                        ref={orderSumRef}
                        type="text"
                    />
                    <p className="content_calcMenu_item_block_text">
                        рублей
                    </p>
                </div>
            </div>
            <div className="content_calcMenu_item">
                <p>Процент чаевых:</p>
                <div className="content_calcMenu_item_block">
                    <input
                        className="content_calcMenu_item_block_input"
                        ref={tipsRef}
                        type="text"
                    />
                    <p className="content_calcMenu_item_block_text">
                        %
                    </p>
                </div>
            </div>
            <div className="content_calcMenu_item">
                <p>Доставка:</p>
                <div className="content_calcMenu_item_block">
                    <input
                        className="content_calcMenu_item_block_input"
                        ref={deliveryRef}
                        type="text"
                    />
                    <p className="content_calcMenu_item_block_text">
                        рублей
                    </p>
                </div>
            </div>
            <Button
                text='Рассчитать'
                width='120px'
                bgColor='orange'
                click={sumCount}
            />
            <div>
                <p>Общая сумма {result.totalSum}</p>
                <p>Число людей: {result.people}</p>
                <p>Каждый платит: {result.individPay}</p>
            </div>
        </>
    )
}

export default PayEqual