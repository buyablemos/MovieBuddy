import axios from 'axios';

const fetchTrailerId = async (movieTitle: string) => {
    const API_KEY =import.meta.env.VITE_YT_CLIENT_ID;

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: `${movieTitle} trailer`, // Wyszukiwanie trailera
                key: API_KEY,
                type: 'video',
                maxResults: 1 // Zwróć tylko jeden wynik
            }
        });

        if (response.data.items.length > 0) {
            return response.data.items[0].id.videoId; // Zwróć ID trailera
        } else {
            return null; // Nie znaleziono trailera
        }
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null; // W przypadku błędu, zwróć null
    }
};

export default fetchTrailerId;
