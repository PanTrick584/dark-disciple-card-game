import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { patchDB } from "../../hooks/fetchDB";
import "./styles/card-edit.scss"

const CardEdit = () => {
    const [newData, setNewData] = useState({});
    const [strengthError, setStrengthError] = useState("")

    const location = useLocation();
    const card = location.state || {};

    useEffect(() => {
        setNewData(prev => ({ ...prev, _id: card?._id }));
    }, [])

    const updateData = async () => {
        console.log(newData);
        try {
            const result = await patchDB(`http://localhost:3333/api/v1/cards/${card?._id}`, newData);
            console.log('Updated data:', result);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <>
            <form className="card-edit" action="" method="" onSubmit={(e) => {
                e.preventDefault()
                updateData()

            }}>
                <div className="card-edit-row">
                    <div className="card-edit-column card-edit-title">
                        <label htmlFor="card-title" className="label-title">card name</label>
                        <input
                            type="text"
                            name="card-title"
                            onChange={(e) => setNewData(prev => ({ ...prev, name: { en: e.target.value } }))}
                            defaultValue={card?.name?.en}
                        />
                    </div>
                    <div className="card-edit-column card-edit-cost">
                        <label htmlFor="card-cost" className="label-title">card cost</label>
                        <input
                            type="text"
                            name="card-cost"
                            defaultValue={card?.level}
                            onChange={(e) => {
                                const level = Number(e.target.value);
                                if (isNaN(level) || level === 0) {
                                    setStrengthError("Please provide value as Number and different than '0'")
                                    return;
                                }
                                setStrengthError("")
                                setNewData(prev => ({ ...prev, level }));
                            }}
                        />
                    </div>
                    <div className="card-edit-column card-edit-strength">
                        <label htmlFor="card-strength" className="label-title">card strength</label>
                        <input
                            type="text"
                            name="card-strength"
                            defaultValue={card?.strength}
                            onChange={(e) => {
                                const strength = Number(e.target.value);
                                if (isNaN(strength) || strength === 0) {
                                    setStrengthError("Please provide value as Number and different than '0'")
                                    return;
                                }
                                setStrengthError("")
                                setNewData(prev => ({ ...prev, strength }));
                            }}
                        />
                        <label htmlFor="card-strength">{strengthError}</label>
                    </div>
                </div>
                <div className="card-edit-row card-edit-categories">
                    {/* <p className="categories-title">categories:</p> */}
                    {card?.category?.map(cat => {
                        return (
                            <div className="card-edit-column card-edit-categories">
                                <label htmlFor="card-category" className="label-title">card category</label>
                                <input type="text" name="card-category" defaultValue={cat.en} />
                            </div>
                        )
                    })}
                </div>
                <div className="card-edit-column card-edit-description">
                    {/* <p>card skills:</p> */}
                    {card?.skills?.map(skill => {
                        if (!skill) return;
                        return (
                            <div className="card-edit-description-box">
                                {skill?.map(item => {
                                    return (
                                        <>
                                            <div className="card-edit-column card-edit-skill">
                                                {item.type.length && item?.type?.map(el => {
                                                    return (
                                                        <>
                                                            <label htmlFor="card-skill" className="label-title">card skill</label>
                                                            <input type="text" name="card-skill" defaultValue={el?.en} />
                                                        </>
                                                    )
                                                })}

                                            </div>
                                            <div className="card-edit-column card-edit-description">
                                                <label htmlFor="card-description" className="label-title">card description</label>
                                                <textarea type="text" name="card-description" defaultValue={item?.description?.en} />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <button type="submit" >accept changes</button>
            </form>
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
        </>

    )
}

export default CardEdit;