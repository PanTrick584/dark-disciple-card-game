export const handleCategories = (factionData, name, activeLevels) => {
    let uniqueCategories = [];
    factionData?.forEach((faction, id) => {
        if (faction?.name !== name) return;
        faction?.data.map((level, lvlID) => {
            if (!activeLevels.length || activeLevels.includes(lvlID + 1)) {
                level?.data?.forEach(card => {
                    const category = card?.category?.length && card?.category?.map(category => category.en);

                    if (category) {
                        uniqueCategories = [...new Set([...uniqueCategories, ...category])]
                    }
                })
            }

        })
    })

    return uniqueCategories;
}