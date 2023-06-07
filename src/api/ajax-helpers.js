import { BASE_URL } from "./api-keys";

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/posts`)
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
}
