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

export const patchDB = async (path, updatedData) => {
    console.log(`PATCH to: ${path}`, updatedData);
    try {
        const response = await fetch(path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Failed to PATCH ${path}: ${response.status}`);
        }

        const result = await response.json();
        console.log('PATCH response:', result);
        return result;
    } catch (error) {
        console.error("Error with PATCH request:", error);
        throw error;
    }
};

export const addDeckDB = async (path, deck) => {
    try {
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deck),
        });

        if (!response.ok) {
            throw new Error(`Failed to PATCH ${path}: ${response.status}`);
        }

        const result = await response.json();
        console.log('PATCH response:', result);
        return result;
    } catch (error) {
        console.error("Error with PATCH request:", error);
        throw error;
    }
}