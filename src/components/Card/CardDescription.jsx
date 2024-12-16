import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const CardDescription = ({ skills }) => {
    const { language } = useContext(AppContext);

    return (
        <div className="card-description">
            {skills && skills?.map((skill) => {
                if (!skill) return;

                return (
                    <div className="card-description-box">
                        <div className="skill">{skill?.type?.length && skill?.type?.map(el => <p className='skill-item'>{el?.[language]}</p>)}</div>
                        <div className="description">{skill?.description?.[language]}</div>
                    </div>
                )
            })}
        </div>
    )
}