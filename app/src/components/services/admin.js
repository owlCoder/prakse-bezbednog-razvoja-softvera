import axios from 'axios';

export async function getAuditsAdmin(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/audit/get`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getAdminAudits:', error);
        throw error;
    }
}

export async function getUserByIdAdmin(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/getById`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getUserByIdAdmin:', error);
        throw error;
    }
}

export async function getOrdersAdmin(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/order/get`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getOrdersAdmin:', error);
        throw error;
    }
}

export async function getProductsAdmin(token) {
    try {
        const response = await axios.get(`${global.APIEndpoint}/api/product/get`, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });

        return response;
    } catch (error) {
        console.error('Error in getProductsAdmin:', error);
        throw error;
    }
}

export async function getGenresAdmin(currentUser, token) {
    try {
        const response = await axios.get(`${global.APIEndpoint}/api/genre/get`, {
            uid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getGenresAdmin:', error);
        throw error;
    }
}

export async function deleteProductAdmin(uidToDelete, sellerUidToDelete, currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/product/delete`, {
            uid: uidToDelete,
            sellerUid: sellerUidToDelete,
            currentUserUid: currentUser.uid
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in deleteProductAdmin:', error);
        throw error;
    }
}

export async function updateProductAdmin(currentUser, editData, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/product/update`, {
            currentUserUid: currentUser.uid,
            payload: editData,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in updateProductAdmin:', error);
        throw error;
    }
}

export async function getUsersAdmin(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/get`, {
            currentUserUid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getUsersAdmin:', error);
        throw error;
    }
}

export async function getRolesAdmin(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/role/get`, {
            currentUserUid: currentUser.uid,
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in getRolesAdmin:', error);
        throw error;
    }
}

export async function deleteUserByGuidAdmin(uidToDelete, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/delete/guid`, {
            uid: uidToDelete
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in deleteUserByGuidAdmin:', error);
        throw error;
    }
}

export async function createNewUserAdmin(currentUser, userProperties, userData, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/newAccount`, {
            uid: currentUser.uid,
            userProperties: userProperties,
            userData: userData
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in createNewUserAdmin:', error);
        throw error;
    }
}

export async function updateUserAdmin(currentUser, editData, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/update/admin`, {
            uid: currentUser.uid,
            data: editData
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in updateUserAdmin:', error);
        throw error;
    }
}

