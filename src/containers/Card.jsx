import React, { useEffect, useState } from 'react'
import "./styles/card.scss"

const Card = ({ cardsLevel, cardsCategories }) => {
    console.log(cardsCategories);
    return (
        <>
            {cardsLevel?.data?.map((card, id) => {
                const currentCategories = card?.category?.map((category) => category?.en);
                console.log(currentCategories);
                if (!cardsCategories.length || cardsCategories.some(category => currentCategories.includes(category))) {
                    return (
                        <div className="card">
                            <div className="card-title">
                                <div className="card-title-name">
                                    <p>{card?.name?.en}</p>
                                    <div className="card-title-categories">
                                        {card?.category?.map(cat => <p className='card-title-categories-item'>{cat.en}</p>)}
                                    </div>
                                </div>
                                <div className="card-title-nums">
                                    <p className='card-level'>{card?.level}</p>
                                    <p className='card-strength'>{card?.strength}</p>
                                </div>
                            </div>
                            <div className="card-description">
                                {card?.skills?.map((skill, id) => {
                                    if (!skill) return;
                                    return (
                                        <div className="card-description-box">
                                            {skill?.map(item => {
                                                return (
                                                    <>
                                                        <div className="skill">{item.type.length && item?.type?.map(el => <p className='skill-item'>{el?.en}</p>)}</div>
                                                        <div className="description">{item?.description?.en}</div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default Card
