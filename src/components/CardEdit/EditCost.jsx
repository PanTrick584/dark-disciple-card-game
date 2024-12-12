import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';

export const EditCost = ({ card, setNewData, error, setError }) => {
    const { language } = useContext(AppContext);

    return (
        <div className="card-edit-column card-edit-cost">
            <label htmlFor="card-cost" className="label-title">card cost</label>
            <input
                type="text"
                name="card-cost"
                defaultValue={card?.level || ""}
                onChange={(e) => {
                    const level = Number(e.target.value);
                    if (isNaN(level) || level === 0) {
                        setError("Please provide value as Number and different than '0'")
                        return;
                    }
                    setError("")
                    setNewData(prev => ({ ...prev, updates: { ...prev.updates, level } }));
                }}
            />
            <label htmlFor="card-strength">{error}</label>
        </div>
    )
}