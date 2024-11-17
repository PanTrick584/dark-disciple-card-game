export const fetchJsonData = async (paths) => {
    console.log(paths);
    try {
        const fetchPromises = paths.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${path}: ${response.status}`);
            }
            return response.json();
        });

        const allData = await Promise.all(fetchPromises);
        return allData;
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        throw error;
    }
};