import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { defaultSkills } from '../../consts/skills';

export const EditSkills = ({ card, newData, setNewData }) => {
    const { language } = useContext(AppContext);

    const handleChange = (e, skillId) => {
        const newDescription = e.target.value;

        setNewData((prev) => {
            const prevUpdates = prev.updates || {};
            const prevDescriptions = prevUpdates.description || [];
            const existingIndex = prevDescriptions.findIndex(
                (desc) => desc.id === skillId
            );

            let updatedDescriptions;

            if (existingIndex > -1) {
                updatedDescriptions = prevDescriptions.map((desc, index) =>
                    desc.id === skillId
                        ? { ...desc, [language]: newDescription }
                        : desc
                );
            }
            else {
                console.log("new lang!");
                updatedDescriptions = [
                    ...prevDescriptions,
                    { id: skillId, [language]: newDescription },
                ];
            }

            return {
                ...prev,
                updates: {
                    ...prev.updates,
                    description: updatedDescriptions,
                },
            };
        });
    }

    return (
        <div className="card-edit-column card-edit-description">
            {card?.skills?.map((skill, skillId) => {
                const defaultValue = newData?.updates?.description?.find(desc => desc.id === skillId)?.[language]
                    ?? skill?.description?.[language]
                    ?? "";

                if (!skill) return;
                return (
                    <div className="card-edit-description-box">
                        <div className="card-edit-column card-edit-skill">
                            {skill.type.length && skill?.type?.map((el) => {
                                return (
                                    <>
                                        <label htmlFor="card-skill" className="label-title">card skill</label>
                                        <select
                                            name="select-skill"
                                            id="">
                                            {defaultSkills.map(skill => <option className="">{skill?.[language]}</option>)}
                                        </select>
                                        <input
                                            type="text"
                                            name="card-skill"
                                            value={el?.[language] || ""}
                                            onChange={() => { }} />
                                    </>
                                )
                            })}

                        </div>
                        <div className="card-edit-column card-edit-description">
                            <label
                                htmlFor="card-description"
                                className="label-title">
                                card description
                            </label>
                            <textarea
                                type="text"
                                name="card-description"
                                value={defaultValue}
                                onChange={(e) => handleChange(e, skillId)}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}