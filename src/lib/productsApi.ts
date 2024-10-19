import { Product } from "@/types";
import axios from "axios";

const productsApiUri = process.env.NEXT_PUBLIC_COMMERCIFY_API_URL;

export async function fetchProducts(page: number): Promise<{ products: Product[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${productsApiUri}/products`, {
            params: { page },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const products = response.data._embedded?.productDTOes ?? [];
        const totalPages = products.length ? response.data.page.totalPages : 1;

        return { products, totalPages };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch products');
    }
}

export async function fetchActiveProducts(page: number): Promise<{ products: Product[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${productsApiUri}/products/active`, {
            params: { page }
        });

        const products = response.data._embedded?.productDTOes ?? [];
        const totalPages = products.length ? response.data.page.totalPages : 1;

        return { products, totalPages };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch products');
    }
}