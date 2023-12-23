import axios from 'axios';

export async function deleteAccount(currentUser, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/delete`, {
            uid: currentUser.uid,           
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in deleteAccount:', error);
        throw error;
    }
}

export async function updateUserPicture(currentUser, selectedImage, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/updatePicture`, {
            uid: currentUser.uid,
            photoBase64: `${selectedImage}`,       
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in updateUserPicture:', error);
        throw error;
    }
}

export async function updateUser(currentUser, user, token) {
    try {
        const response = await axios.post(`${global.APIEndpoint}/api/user/update`, {
            uid: currentUser.uid,
            firstName: `${user.firstName}`,
            lastName: `${user.lastName}`,
            date: `${user.date}`,       
        }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw error;
    }
}

export async function getUserById(currentUser, token) {
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
        console.error('Error in getUserById:', error);
        throw error;
    }
}

