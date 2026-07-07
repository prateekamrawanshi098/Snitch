import axios from "axios";

const apiInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true
})

export async function createSellerProducts(formData) {
    const response = await apiInstance.post("/", formData)
    return response.data
}

export async function getSellerProducts() {
    const response = await apiInstance.get("/seller")
  

    return response.data
}   

export async function getAllproducts(){
    const response = await apiInstance.get("/")
    return response.data
}