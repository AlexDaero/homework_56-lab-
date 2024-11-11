import React, { useRef, useState } from "react";
import Button from "../../UI/Button";
import './PayEqual.css'


function PayEqual() {
    const [result, setResult] = useState({ totalSum: 0, people: 0, individPay: 0 })
    const [showResult, setShowResult] = useState(false)
    const peopleInputRef = useRef(null)
    const orderSumRef = useRef(null)
    const tipsRef = useRef(null)
    const deliveryRef = useRef(null)
    const sumCount = () => {
        if (Number(orderSumRef.current.value) > 0 && Number(peopleInputRef.current.value) > 0) {
            const copyState = { ...result }
            let deliverySum = 0
            let tipsSum = 0

            if (Number(deliveryRef.current.value) > 0) {
                deliverySum = Number(deliveryRef.current.value)
            } else if(deliveryRef.current.value.length > 0) {
                alert('Некорректный ввод!')
                return
            }

            if (Number(tipsRef.current.value) > 0) {
                tipsSum = Number(tipsRef.current.value)
            } else if(tipsRef.current.value.length > 0) {
                alert('Некорректный ввод!')
                return
            }

            const orderSum = Number(orderSumRef.current.value) + (orderSumRef.current.value * (tipsSum / 100))
            copyState.people = peopleInputRef.current.value
            copyState.totalSum = orderSum + deliverySum
            copyState.individPay = Math.ceil((Number(orderSum) + deliverySum) / Number(peopleInputRef.current.value))

            setResult(copyState)
            setShowResult(true)

            return
        }
        alert('Некорректный ввод!')
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
            {
                showResult
                    ? <div>
                        <p>Общая сумма {result.totalSum}</p>
                        <p>Число людей: {result.people}</p>
                        <p>Каждый платит: {result.individPay}</p>
                    </div>
                    : null
            }
        </>
    )
}

export default PayEqual