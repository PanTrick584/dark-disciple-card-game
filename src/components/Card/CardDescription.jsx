import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const CardDescription = ({ skills, colors }) => {
    const { language } = useContext(AppContext);
    const style = {
        borderTop: `1px solid ${colors?.themeMain}`,
    }

    return (
        <div className="card-description">
            {skills && skills?.map((skill) => {
                if (!skill) return;

                return (
                    <div className="card-description-box">
                        <div className="skill" style={style}>{skill?.type?.length && skill?.type?.map(el => <p className='skill-item'>{el?.[language]}</p>)}</div>
                        <div className="description">{skill?.description?.[language]}</div>
                    </div>
                )
            })}
        </div>
    )
}