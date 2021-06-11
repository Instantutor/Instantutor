import axios from 'axios'

export const obtainResults = async (searchData) => {
    try {
        console.log('Success');

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('/api/profile/search', { params: searchData }, config);
        
        console.log(res.data.map((result) => result.user));
    } catch (err) {
        console.log(err);
    }
};