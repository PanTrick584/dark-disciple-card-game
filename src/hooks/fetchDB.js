export const fetchDB = async (path) => {
    console.log(path);
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        throw error;
    }
};