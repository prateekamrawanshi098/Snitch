import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "product",
    initialState: {
        sellerproduct: [],
        allproducts: []
    },

    reducers: {
        setSellerProduct: (state, action) => {
            state.sellerproduct = action.payload
        },
        setAllproducts: (state, action) => {
            state.allproducts = action.payload
        }
    }
})

export const { setSellerProduct, setAllproducts } = productsSlice.actions

export default productsSlice.reducer