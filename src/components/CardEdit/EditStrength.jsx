import React from 'react'

export const EditStrength = ({ card, newData, setNewData, error, setError }) => {
    return (
        <div className="card-edit-column card-edit-strength">
            <label htmlFor="card-strength" className="label-title">card strength</label>
            <input
                type="text"
                name="card-strength"
                defaultValue={newData?.strength || card?.strength || ""}
                onChange={(e) => {
                    const strength = Number(e.target.value);
                    if (isNaN(strength) || strength === 0) {
                        setError("Please provide value as Number and different than '0'")
                        return;
                    }
                    setError("")
                    setNewData(prev => ({ ...prev, updates: { ...prev.updates, strength } }));
                }}
            />
            <label htmlFor="card-strength">{error}</label>
        </div>
    )
}