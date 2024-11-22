import React, { useEffect, useState } from 'react'
import "./styles/card.scss"
import { Link, useLocation } from 'react-router-dom';

const Card = ({ cardsLevel, cardsCategories, categoryName }) => {


    return (
        <>
            {cardsLevel?.data?.map((card, id) => {
                const currentCategories = card?.category?.map((category) => category?.en);
                const cardName = card?.name?.en.split(" ").join("-");
                if (!cardsCategories.length || cardsCategories.some(category => currentCategories.includes(category))) {
                    return (
                        <Link to={`/cards/${categoryName}/${cardName}`} state={card}>
                            <div className="card">
                                <div className="card-title">
                                    <div className="card-title-box">
                                        <p className="card-title-name">{card?.name?.en}</p>
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
                        </Link>
                    )
                }
            })}
        </>
    )
}

export default Card
