import { useContext } from "react";
import { usePaths } from "../../context/pathsContext";
import { AppContext } from "../../context/AppContext";

export const MainHeader = () => {
    const { mainPath, setMainPath } = usePaths();
    const {
        language,
        setSettingsOn,
    } = useContext(AppContext);

    return (
        <div
            className="main-header"
            onClick={() => {
                if (mainPath !== "") {
                    setSettingsOn(prev => !prev)
                    setMainPath("")
                }
            }}
        >
            <h1 className='main-header-text'>Dark Disciple: Card Game</h1>
        </div>
    )
}