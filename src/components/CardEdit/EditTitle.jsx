import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';

export const EditTitle = ({ card, newData, setNewData }) => {
    const { language } = useContext(AppContext);
    const titleValue = newData?.updates?.name?.[language] ?? (card?.name?.[language] || "");

    return (
        <div className="card-edit-column card-edit-title">
            <label htmlFor="card-title" className="label-title">card name</label>
            <input
                type="text"
                name="card-title"
                onChange={(e) => {
                    const newName = e.target.value;
                    setNewData((prev) => {
                        return {
                            ...prev,
                            updates: {
                                ...prev.updates,
                                name: { ...prev.updates.name, [language]: newName }
                            }
                        }
                    })
                }}
                value={titleValue}
            />
        </div>
    )
}