import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { CardEditPopup } from "./CardEditPopup";
import { EditCategory } from "./EditCategory";
import { EditSkills } from "./EditSkills";
import { EditTitle } from "./EditTitle";
import { EditCost } from "./EditCost";
import { EditStrength } from "./EditStrength";
import "./styles/card-edit.scss"

const CardEdit = () => {
    const [newData, setNewData] = useState({ updates: {} });
    const [updatedCardData, setUpdatedCardData] = useState();
    const [error, setError] = useState("");
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);

    const location = useLocation();
    const card = updatedCardData ?? (location.state || {});

    const { language } = useContext(AppContext);

    useEffect(() => {
        setNewData(prev => ({
            ...prev,
            _id: card?._id,
        }));
    }, [updatedCardData])

    console.log(updatedCardData);
    console.log(newData);

    return (
        <>
            {showSubmitPopup &&
                <CardEditPopup
                    newData={newData}
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
                    <EditTitle
                        card={card}
                        setNewData={setNewData}
                        newData={newData} />
                    <EditCost
                        card={card}
                        setNewData={setNewData}
                        setError={setError} />
                    <EditStrength
                        card={card}
                        newData={newData}
                        setNewData={setNewData}
                        error={error}
                        setError={setError} />
                </div>
                {/* EDIT CATEGORY */}
                <EditCategory
                    card={card}
                    setNewData={setNewData}
                    newData={newData} />
                {/* EDIT SKILLS */}
                <EditSkills
                    card={card}
                    setNewData={setNewData}
                    newData={newData} />
                <button type="submit" >accept changes</button>
            </form>
        </>
    )
}

export default CardEdit;