import { patchDB } from "./fetchDB";

export const updateData = async (data) => {
    console.log(data);
    try {
        const result = await patchDB(`http://localhost:3333/api/v1/cards/${data?._id}`, data);
        console.log('Updated data:', result);
        return result.data;
    } catch (error) {
        console.error('Error updating data:', error);
    }
};