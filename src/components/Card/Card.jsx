import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import "./styles/card.scss"


const Card = ({ cardsLevel, cardsCategories, categoryName }) => {

    const { language } = useContext(AppContext);

    return (
        <>
            {cardsLevel?.data?.map((card, id) => {
                const currentCategories = card?.category?.map((category) => category?.[language]);
                const cardName = card?.name?.[language] && card?.name?.[language].split(" ").join("-");
                const newCategoryName = categoryName.split(" ").join("-");
                if (!cardsCategories.length || cardsCategories.some(category => currentCategories.includes(category))) {
                    return (
                        <Link to={`/cards/${newCategoryName}/${cardName}`} state={card}>
                            <div className="card">
                                <div className="card-title">
                                    <div className="card-title-box">
                                        <p className="card-title-name">{card?.name?.[language]}</p>
                                        <div className="card-title-categories">
                                            {card?.category?.map(cat => <p className='card-title-categories-item'>{cat?.[language]}</p>)}
                                        </div>
                                    </div>
                                    <div className="card-title-nums">
                                        <p className='card-level'>{card?.level}</p>
                                        <p className='card-strength'>{card?.strength}</p>
                                    </div>
                                </div>
                                <div className="card-description">
                                    {card?.skills && card?.skills?.map((skill, id) => {
                                        if (!skill) return;
                                        return (
                                            <div className="card-description-box">
                                                <div className="skill">{skill?.type?.length && skill?.type?.map(el => <p className='skill-item'>{el?.[language]}</p>)}</div>
                                                <div className="description">{skill?.description?.[language]}</div>
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
