import React from 'react';
import "./styles/card-popup.scss";
import { updateData } from '../../tools/updateCard';

export const CardEditPopup = ({ newData, setShowSubmitPopup, setNewData, setUpdatedCardData }) => {
    console.log(newData);

    const renderValue = (val) => {
        if (Array.isArray(val)) {
            return (
                <ul>
                    {val.map((item, index) => (
                        <li key={index}>{renderValue(item)}</li>
                    ))}
                </ul>
            );
        } else if (typeof val === "object" && val !== null) {
            return (
                <div>
                    {Object.entries(val).map(([subKey, subValue]) => (
                        <p key={subKey}>
                            <strong>{subKey}:</strong> {renderValue(subValue)}
                        </p>
                    ))}
                </div>
            );
        } else {
            return val.toString(); // For numbers, strings, and other primitive types
        }
    };

    const acceptChanges = async () => {
        try {
            const result = await updateData(newData);
            setUpdatedCardData(result)
            setShowSubmitPopup(false);
        } catch (error) {
            console.log(error);
        }
    }

    const denyChanges = () => {
        setShowSubmitPopup(false);
        setNewData({})
    }

    return (
        <div className="card-edit-popup">
            <div className="card-edit-popup-container">
                <div className="card-edit-popup-header">Your changes:</div>
                {newData &&
                    Object.entries(newData.updates).map(([key, value]) => {
                        if (key === "_id" || key === "id") return;
                        return (
                            <div className="card-edit-popup-box">
                                <div className="card-edit-popup-key">{key}:</div>
                                <div className="card-edit-popup-value">{renderValue(value)}</div>
                            </div>
                        )
                    })}
                <button className="card-edit-popup-button" onClick={acceptChanges}>Accept changes</button>
                <button className="card-edit-popup-button" onClick={denyChanges}>Deny changes</button>
            </div>
        </div>
    )
}