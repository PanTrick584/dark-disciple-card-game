export const fetchChosenCards = async (ids) => {
    try {
        const response = await fetch('http://localhost:3333/api/v1/cards/chosen', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cards: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchChosenCards:', error);
        throw error;
    }
};