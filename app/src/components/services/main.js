import axios from 'axios';

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

export async function createOrder(counter, currentUser, data, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/order/create`, {
            buyQuantity: counter,
            buyerUid: currentUser.uid,
            product: data,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in createOrder:', error);
        throw error;
    }
}

export async function getRoleByUid(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/getRoleByUid`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getRoleByUid:', error);
        throw error;
    }
}