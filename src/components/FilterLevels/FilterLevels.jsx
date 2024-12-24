import { useContext } from 'react';
import { all } from '../../consts/translations';
import { AppContext } from '../../context/AppContext';

export const FilterLevels = ({ navigation, activeLevels, setActiveLevels, handleCategory, handleFilter }) => {
    const { language } = useContext(AppContext);

    return(
        <ul className='filter-levels'>
            {navigation?.map((_, id) => {
                return (
                    <li
                        className={`nav-ul-li button${activeLevels.includes(id + 1) ? " active" : ""}`}
                        onClick={() => {
                            setActiveLevels(prev => handleFilter(prev, id + 1, Number));
                            handleCategory();
                        }}>
                        <a>{
                            id + 1}
                        </a>
                    </li>
                )
            })}
            <li className={`nav-ul-li button `} onClick={() => {
                setActiveLevels([])
                handleCategory();
            }}><a>{all?.[language]}</a></li>
        </ul>
    )
}