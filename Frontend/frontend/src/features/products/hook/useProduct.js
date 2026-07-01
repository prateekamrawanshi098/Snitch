import { useDispatch } from "react-redux";
import { createSellerProducts, getSellerProducts } from "../services/products.api";
import { setSellerProduct } from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

    async function createProductHandler(formData) {

        const response = await createSellerProducts(formData)
        return response.products

    }

    async function getSellerProductHandller() {
        const response = await getSellerProducts()
        dispatch(setSellerProduct(response.products))
        return response.products
    }

    return {
        createProductHandler,
        getSellerProductHandller
    }
}