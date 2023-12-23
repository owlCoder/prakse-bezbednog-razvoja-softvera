import axios from 'axios';

export async function getGenres() {
    try {
        const response = await axios.get(`${global.APIEndpoint}/api/genre/get`, {
            headers: {                
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getGenres:', error);
        throw error;
    }
}

export async function createProduct(form, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/product/create`, {
            form
        }, {
            headers: { 
                Authorization: `${token}`,               
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in createProduct:', error);
        throw error;
    }
}

export async function getProducts() {
    try {
        const response = await axios.get(`${global.APIEndpoint}/api/product/get`, {
            headers: {               
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getProducts:', error);
        throw error;
    }
}