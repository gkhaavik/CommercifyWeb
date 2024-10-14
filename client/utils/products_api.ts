const apiUri = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

export const getAllProducts = async () => {
    const response = await fetch(apiUri + '/api/v1/products', { mode: 'cors' })
        .then((res) => {
            const products = res.json();
            console.log("products:", products);

            return products;
        })
        .catch((err) => console.error("api:", err));
    return response;
};

export const getProducts = async () => {
    const response = await fetch(apiUri + '/api/v1/products/active', { mode: 'cors' })
        .then((res) => {
            const products = res.json();
            console.log("products:", products);

            return products;
        })
        .catch((err) => console.error("api:", err));
    return response;
};
