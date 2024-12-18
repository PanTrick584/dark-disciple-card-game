import { useContext } from "react";
import { all } from "../../consts/translations"
import { AppContext } from "../../context/AppContext";

export const FilterCategories = ({ 
    categoriesList,
    setCategories,
    handleFilter,
    activeCategories,
    setActiveCategories,
    handleCategory
}) => {
    const { language } = useContext(AppContext);

    return(
            <ul>
                {categoriesList.map((category, id) => {
                    return (
                        <li
                            className={`button small ${activeCategories.includes(id + 1) ? "active" : ""}`}
                            key={`card-category-${id}`}
                            onClick={() => {
                                setCategories(prev => handleFilter(prev, category, String))
                                setActiveCategories(prev => handleFilter(prev, id + 1, Number))
                                handleCategory();
                            }}
                        >
                            <a>
                                {category}
                            </a>
                        </li>
                    )
                })}
                <li className={`button small`} onClick={() => {
                    setActiveCategories([]);
                    handleCategory();
                    setCategories([]);
                }}><span>{all?.[language]}</span></li>
            </ul>
    )
}