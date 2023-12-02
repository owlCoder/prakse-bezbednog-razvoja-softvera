const admin = require('../firebaseConfig');

const createOrder = async (buyerUid, buyQuantity, product) => {
    try {
        await admin.firestore().collection("orders").add({
            buyerUid: buyerUid,
            buyQuantity: buyQuantity,
            product: product
        }
        );
        return { code: 201, payload: "Order has been created" };
    } catch (error) {
        return { code: 400, payload: "Order can't be created" };
    }
};

const readOrderPerUser = async (buyerUid) => {
    try {
        const orderRef = admin.firestore().collection('orders').where("buyerUid", "==", buyerUid);
        const ordersSnapshot = await orderRef.get();
        const ordersData = [];

        ordersSnapshot.forEach((doc) => {
            ordersData.push(doc.data());
        });

        return { code: 200, payload: ordersData };
    } catch (error) {
        return { code: 500, payload: "Internal Server Error" };
    }
};

const readAllOrders = async () => {
    try {
        const orderRef = admin.firestore().collection('orders');
        const ordersSnapshot = await orderRef.get();
        const ordersData = [];

        ordersSnapshot.forEach((doc) => {
            ordersData.push(doc.data());
        });

        return { code: 200, payload: ordersData };
    } catch (error) {
        return { code: 500, payload: "Internal Server Error" };
    }
};

module.exports = { createOrder, readOrderPerUser, readAllOrders };