import React, { cloneElement, useEffect, useRef, useState } from "react";
import Button from "../../UI/Button";
import './PayInd.css'


function PayInd() {
    const [listPayer, setListPayer] = useState([{ name: '', price: '' }])
    const [result, setResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [totalOrder, setTotalOrder] = useState({ value: 0 })

    const tipsRef = useRef(null)
    const deliveryRef = useRef(null)

    const addPayer = () => {
        const copyState = [...listPayer]

        copyState.push({ name: '', price: '' })

        setListPayer(copyState)
    }

    const removePayer = (index) => {
        const copyState = [...listPayer]
        copyState.splice(index, 1)
        setListPayer(copyState)
    }

    const updateMember = (index, value, type) => {
        const copyState = [...listPayer]
        if (type === 'name') {
            copyState[index].name = value
        } else if (type === 'price') {
            copyState[index].price = Number(value)
        }
        setListPayer(copyState)
    }

    const sumCount = () => {
        if (isNaN(listPayer[0].name) && Number(listPayer[0].price) > 0) {
            const copyState = structuredClone(listPayer)
            const copyTotal = { ...totalOrder }

            let deliverySum = 0
            let tipsSum = 0

            if (Number(deliveryRef.current.value) > 0) {
                deliverySum = Number(deliveryRef.current.value)
            } else if (deliveryRef.current.value.length > 0) {
                alert('Некорректный ввод!')
                return
            }

            if (Number(tipsRef.current.value) > 0) {
                tipsSum = Number(tipsRef.current.value)
            } else if (tipsRef.current.value.length > 0) {
                alert('Некорректный ввод!')
                return
            }

            const totalOrderSum = listPayer.reduce((acc, current) => acc + current.price, 0)

            const deliveryIndSum = deliverySum / (Number(copyState.length))
            const totalSum = totalOrderSum + (totalOrderSum * (tipsSum / 100)) + deliverySum
            copyTotal.value = totalSum

            for (let i = 0; i < copyState.length; i++) {
                copyState[i].price =
                    Math.ceil(Number(copyState[i].price)
                        + (Number(copyState[i].price) * (tipsSum / 100))
                        + deliveryIndSum)
            }

            setTotalOrder(copyTotal)
            setResult(copyState)
            setShowResult(true)

            return
        }
        alert('Некорректный ввод!')
    }

    return (
        <div className="payer_list">
            {listPayer.map((item, index) => {
                return (
                    <div className="payer_info" key={index}>
                        <input
                            value={listPayer[index].name}
                            onChange={(e) => updateMember(index, e.target.value, 'name')}
                            className="payer_info_name"
                            type="text"
                        />
                        <div className="payer_info_price">
                            <input
                                value={listPayer[index].price}
                                onChange={(e) => updateMember(index, e.target.value, 'price')}
                                className="payer_info_price_item"
                                type="text"
                            />
                            <p>RUB</p>
                        </div>
                        <Button
                            text='X'
                            width='25px'
                            height='25px'
                            borderRadius='50%'
                            bgColor='red'
                            click={() => removePayer(index)}
                        />
                    </div>
                )
            })}
            <Button
                text='+'
                width='30px'
                height='30px'
                borderRadius='50%'
                bgColor='green'
                click={addPayer}
            />

            <div className="payer_list_dop">
                <p>Чаевые</p>
                <div className="payer_list_dop_inputBlock">
                    <input ref={tipsRef} type="text" />
                    <p>%</p>
                </div>
            </div>

            <div className="payer_list_dop">
                <p>Доставка</p>
                <div className="payer_list_dop_inputBlock">
                    <input ref={deliveryRef} type="text" />
                    <p>RUB</p>
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
                        <p>Общая сумма: {totalOrder.value} RUB</p>
                        {result.map((item, index) => {
                            return (
                                <p key={index + item}>
                                    {item.name}: {item.price} RUB
                                </p>
                            )
                        })}
                    </div>
                    : null
            }
        </div>
    )
}

export default PayInd