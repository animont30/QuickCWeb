import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import c from '../../images/cpeople_logo.png'

function BottomButtons(props:any) {
    return (
        <div>
            <div className="btns">
                <button className="btn btn-c"><img src={c} /></button>
                &nbsp;&nbsp;
                <button className="btn btn-back"><FaArrowLeft /></button>
            </div>
        </div>
    )
}

export default BottomButtons;
