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
            copyState[index].price = value
        }
        setListPayer(copyState)
    }

    const sumCount = () => {
        if (isNaN(listPayer[0].name) && Number(listPayer[0].price) > 0) {
            const copyState = structuredClone(listPayer)
            const copyTotal = { ...totalOrder }
            let sum = 0

            listPayer.reduce((accum, current) => {
                sum += Number(current.price)
            }, 0)

            const deliverySum = Number(deliveryRef.current.value) / (Number(copyState.length))
            const totalSum = sum + (sum * (Number(tipsRef.current.value) / 100)) + Number(deliveryRef.current.value)
            copyTotal.value = totalSum

            for (let i = 0; i < copyState.length; i++) {
                copyState[i].price =
                    Math.ceil(Number(copyState[i].price)
                        + (Number(copyState[i].price) * (Number(tipsRef.current.value) / 100))
                        + deliverySum)
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
                        <p>Общая сумма: {totalOrder.value}</p>
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