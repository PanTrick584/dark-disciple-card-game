import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { defaultCategories } from '../../consts/categories';

export const EditCategory = ({ card, newData, setNewData }) => {
    const { language } = useContext(AppContext);

    const changeCategory = (e, id) => {
        const newCategory = e.target.value;
        setNewData((prev) => {
            const prevCategories = [...(prev.updates.category || [])];
            const newCategories = {
                id,
                [language]: newCategory,
            };
            let filteredCategories;

            if (prevCategories.length) {
                filteredCategories = prevCategories.filter(category => category.id !== id && category?.[language] !== language)
            }

            const uniqueCategories = [...new Set([...filteredCategories || [], newCategories])]

            return { ...prev, updates: { ...prev.updates, category: uniqueCategories } };
        });
    }

    return (
        <div className="card-edit-row card-edit-categories">
            {card?.category?.map((categoryItem, id) => {
                const selectValue = newData?.updates?.category?.find(newCategory => newCategory.id === id && newCategory?.[language]) ?? (categoryItem?.[language] || "");

                return (
                    <div className="card-edit-column card-edit-categories" key={id}>
                        <label htmlFor="card-category" className="label-title">card category</label>
                        <div className="select-box">
                            <select
                                className="button"
                                name="select-skill"
                                id=""
                                value={selectValue}
                                onChange={(e) => changeCategory(e, id)}
                            >
                                {defaultCategories.map(skill => <option className="">{skill?.[language]}</option>)}
                            </select>
                        </div>

                        <input
                            type="text"
                            name="card-category"
                            value={newData?.updates?.category?.[id]?.[language] ?? (categoryItem?.[language] || "")}
                            readOnly
                        />
                    </div>
                )
            })}
        </div>
    )
}