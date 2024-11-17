import React, { useEffect, useState } from 'react'
import "./styles/card.scss"

const Card = ({ cardsLevel }) => {

    console.log(cardsLevel)
    return (
        <>
            {cardsLevel.map((card) => {
                return (
                    <div className="card">
                        <div className="card-title">
                            <div className="card-title-name">
                                <p>{card?.name?.default}</p>
                                <div className="card-title-categories">
                                    <p>{card?.category?.primary?.default}</p>
                                    <p>{card?.category?.secondary?.default}</p>
                                </div>
                            </div>
                            <div className="card-title-nums">
                                <p className='card-level'>{card?.level}</p>
                                <p className='card-strength'>{card?.strength}</p>
                            </div>
                        </div>
                        <div className="card-description">
                            {card?.skills.map((skill, id) => {
                                return (
                                    <div className="card-description-box">
                                        <div className="skill">{skill?.type?.default}:</div>
                                        <div className="description">{skill?.description?.default}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Card
