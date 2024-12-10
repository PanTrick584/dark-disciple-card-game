import React from 'react';
import "./styles/card-popup.scss";
import { updateData } from '../../tools/updateCard';

const CardEditPopup = ({ data, setShowSubmitPopup, setNewData, setUpdatedCardData }) => {
    console.log(data);

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

    return (
        <div className="card-edit-popup">
            <div className="card-edit-popup-header">Your changes:</div>
            {data && Object.entries(data).map(([key, value]) => {
                console.log(key);
                console.log(value);
                if (key === "_id") return;
                return (
                    <>
                        <div>{key}</div>

                        <div>{renderValue(value)}</div>
                    </>
                )
            })}

            <button onClick={async () => {
                try {

                    const result = await updateData(data);
                    setUpdatedCardData(result)
                    setShowSubmitPopup(false);
                } catch (error) {
                    console.log(error);
                }
            }}>Accept changes</button>
            <button onClick={() => {
                setShowSubmitPopup(false);
                setNewData({})
            }}>Deny changes</button>
        </div>
    )
}

export default CardEditPopup
