import axios from 'axios';

export async function getUserById(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/getById`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getUserById:', error);
        throw error;
    }
}

export async function getOrdersPerBuyer(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/order/getOrdersPerBuyer`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getOrdersPerBuyer:', error);
        throw error;
    }
}

export async function getProductsPerSellerUid(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/product/getProductsPerSellerUid`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getProductsPerSellerUid:', error);
        throw error;
    }
}

export async function getGenres(currentUser, token) {
    try {
        const response = await axios.get(`${global.APIEndpoint}/api/genre/get`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getGenres:', error);
        throw error;
    }
}

export async function deleteProduct(uidToDelete, sellerUidToDelete, currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/product/delete`, {
            uid: uidToDelete,
            sellerUid: sellerUidToDelete,
            currentUserUid: currentUser.uid
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        throw error;
    }
}

export async function updateProduct(currentUser, editData, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/product/update`, {
            currentUserUid: currentUser.uid,
            payload: editData,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Error in updateProduct:', error);
        throw error;
    }
}
