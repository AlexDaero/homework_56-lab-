import React, { useEffect, useRef, useState } from "react";
import './Content.css'
import Button from "../UI/Button";
import PayEqual from './PayEqual/PayEqual'
import PayInd from "./PayInd/PayInd";

function Content() {
    const [calcOption, setCalcOption] = useState(false)

    const toggleCalc = (item) => {
        if (item === 'equal') return setCalcOption(true)
        setCalcOption(false)
    }

    const paymentIndividual = () => {
        return (
            <>
                kek
            </>
        )
    }

    return (
        <div className="content">
            <div className="content_changePanel">
                <p className="content_changePanel_title">Сумма заказа считается:</p>
                <div className="content_changePanel_btns">
                    <div className="content_changePanel_btns_item">
                        <Button
                            width='30px'
                            height='30px'
                            bgColor={calcOption ? 'orange' : 'white'}
                            borderRadius='50%'
                            click={() => toggleCalc('equal')}
                        />
                        <p>Поровну между всеми участниками</p>
                    </div>
                    <div className="content_changePanel_btns_item">
                        <Button
                            width='30px'
                            height='30px'
                            bgColor={calcOption ? 'white' : 'orange'}
                            borderRadius='50%'
                            click={() => toggleCalc('ind')}
                        />
                        <p>Каждому индивидуально</p>
                    </div>
                </div>
            </div>
            <div className="content_calcMenu">
                {calcOption ? <PayEqual /> : <PayInd />}
            </div>
        </div>
    )
}

export default Content