export const handleCategories = (factionData, name, activeLevels, language) => {
    let uniqueCategories = [];

    factionData?.forEach((faction) => {
        if (faction?.name !== name) return;
        faction?.data.map((level, lvlID) => {
            if (!activeLevels.length || activeLevels.includes(lvlID + 1)) {
                level?.data?.forEach(card => {
                    const category = card?.category?.length && card?.category?.map(category => category?.[language]);

                    if (category) {
                        uniqueCategories = [...new Set([...uniqueCategories, ...category])]
                    }
                })
            }

        })
    })

    return uniqueCategories;
}