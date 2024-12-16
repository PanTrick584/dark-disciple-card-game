import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const CardTitle = ({ card }) => {
    const { language } = useContext(AppContext);

    return (
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
    )
}