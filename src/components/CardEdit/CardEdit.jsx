import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { patchDB } from "../../tools/fetchDB";
import { AppContext } from "../../context/AppContext";
import "./styles/card-edit.scss"
import CardEditPopup from "./CardEditPopup";
import { defaultSkills } from "../../consts/skills";
import { defaultCategories } from "../../consts/categories";

const CardEdit = () => {
    const [newData, setNewData] = useState({});
    const [updatedCardData, setUpdatedCardData] = useState();
    const [strengthError, setStrengthError] = useState("");
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);

    const location = useLocation();
    const card = updatedCardData ?? (location.state || {});

    const { language } = useContext(AppContext);

    useEffect(() => {
        setNewData(prev => ({
            ...prev,
            _id: card?._id,
            category: card?.category, // stays because i cant identify single category by id, need to add, also for skills
            skills: card?.skills
        }));
    }, [updatedCardData])

    console.log(updatedCardData);
    console.log(newData);

    return (
        <>
            {showSubmitPopup &&
                <CardEditPopup
                    data={newData}
                    setShowSubmitPopup={setShowSubmitPopup}
                    setNewData={setNewData}
                    setUpdatedCardData={setUpdatedCardData} />
            }
            <form
                className="card-edit"
                action=""
                method=""
                onSubmit={(e) => {
                    e.preventDefault()
                    setShowSubmitPopup(true)
                }}
            >
                <div className="card-edit-row">
                    <div className="card-edit-column card-edit-title">
                        <label htmlFor="card-title" className="label-title">card name</label>
                        <input
                            type="text"
                            name="card-title"
                            onChange={(e) => setNewData((prev) => ({
                                ...prev,
                                name: {
                                    ...prev.name, // Preserve existing language entries
                                    [language]: e.target.value, // Update the current language entry
                                },
                            }))}
                            // defaultValue={card?.name?.[language] || ""}
                            value={newData?.name?.[language] ?? (card?.name?.[language] || "")}
                        />
                    </div>
                    <div className="card-edit-column card-edit-cost">
                        <label htmlFor="card-cost" className="label-title">card cost</label>
                        <input
                            type="text"
                            name="card-cost"
                            defaultValue={card?.level || ""}
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
                            defaultValue={newData?.strength || card?.strength || ""}
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
                    {card?.category?.map((cat, id, catArray) => {
                        return (
                            <div className="card-edit-column card-edit-categories">
                                <label htmlFor="card-category" className="label-title">card category</label>
                                <div className="select-box">
                                    <select
                                        className="button"
                                        name="select-skill"
                                        id=""
                                        value={newData?.category?.[id]?.[language] ?? (cat?.[language] || "")}
                                        onChange={(e) => {
                                            const newCategory = e.target.value;
                                            setNewData((prev) => {
                                                // Clone the existing categories or initialize as an empty array
                                                const updatedCategories = [...(prev.category || [])];

                                                // Ensure the category at the specified index exists
                                                updatedCategories[id] = {
                                                    ...(updatedCategories[id] || {}), // Clone the existing category object or initialize
                                                    [language]: newCategory, // Update the specific language key
                                                };

                                                // Return the updated state with the modified categories array
                                                return { ...prev, category: updatedCategories };
                                            });
                                        }}
                                    >
                                        {defaultCategories.map((skill, id) => {
                                            return (
                                                <option
                                                    className=""

                                                >{skill?.[language]}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <input
                                    type="text"
                                    name="card-category"
                                    value={newData?.category?.[id]?.[language] ?? (cat?.[language] || "")}
                                    readOnly
                                />
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
                                                            <select name="select-skill" id="">
                                                                {defaultSkills.map((skill, id) => {
                                                                    return (
                                                                        <option className="">{skill?.[language]}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <input type="text" name="card-skill" value={el?.[language] || ""} onChange={() => { }} />
                                                        </>
                                                    )
                                                })}

                                            </div>
                                            <div className="card-edit-column card-edit-description">
                                                <label htmlFor="card-description" className="label-title">card description</label>
                                                <textarea type="text" name="card-description" value={item?.description?.[language] || ""} onChange={() => { }} />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {/* <button type="submit" >accept changes</button> */}
                <button type="submit" >accept changes</button>
            </form>
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
                    {card?.skills?.map((skill, id) => {
                        if (!skill) return;
                        return (
                            <div className="card-description-box">
                                {skill?.map(item => {
                                    return (
                                        <>
                                            <div className="skill">{item.type.length && item?.type?.map(el => <p className='skill-item'>{el?.[language]}</p>)}</div>
                                            <div className="description">{item?.description?.[language]}</div>
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