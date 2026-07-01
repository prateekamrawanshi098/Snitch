import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "product",
    initialState: {
        sellerproduct: []
    },

    reducers: {
        setSellerProduct: (state, action) => {
            state.sellerproduct = action.payload
        }
    }
})

export const { setSellerProduct } = productsSlice.actions

export default productsSlice.reducer