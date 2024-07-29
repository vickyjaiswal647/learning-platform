import React from 'react'
import './Card.css'

function Card({id,src, title}) {

    const selectCard = () =>{
        localStorage.setItem('branchId',id);
    }
    return (
        <div onClick={selectCard} className = 'card'>
            <img src = {src} alt = "" />
            <div className = 'card__info'>
                <h2>{title}</h2>
            </div>
        </div>
    )
}

export default Card
