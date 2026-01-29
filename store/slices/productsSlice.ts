import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    thumbnail: string;
}

interface ProductsState {
    list: {
        items: Product[];
        loading: boolean;
        error: string | null;
        page: number;
        total: number;
        search: string;
    };
    details: {
        item: Product | null;
        loading: boolean;
        error: string | null;
    };
}

const initialState: ProductsState = {
    list: {
        items: [],
        loading: false,
        error: null,
        page: 1,
        total: 0,
        search: '',
    },
    details: {
        item: null,
        loading: false,
        error: null,
    },
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, search }: { page: number, search: string }, { rejectWithValue }) => {
        try {
            const limit = 12;
            const skip = (page - 1) * limit;

            const url = search
                ? `https://dummyjson.com/products/search?q=${encodeURIComponent(
                    search
                )}&limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data = await response.json();
            return {
                products: data.products,
                total: data.total,
                page,
            }
        } catch (error) {
            return rejectWithValue('Something went wrong while fetching products.');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Something went wrong while fetching product details.');
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.list.search = action.payload;
            state.list.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.list.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.list.loading = true;
            state.list.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.list.loading = false;
            state.list.items = action.payload.products;
            state.list.total = action.payload.total;
            state.list.page = action.payload.page;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.list.loading = false;
            state.list.error =
                (action.payload as string) || 'Failed to fetch products.';
        });
        builder.addCase(fetchProductById.pending, (state) => {
            state.details.loading = true;
            state.details.error = null;
            state.details.item = null;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.details.loading = false;
            state.details.item = action.payload;
        });
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.details.loading = false;
            state.details.error =
                (action.payload as string) || 'Failed to fetch product details.';
        });
    }
})

export const { setPage, setSearch } = productsSlice.actions;
export default productsSlice.reducer;