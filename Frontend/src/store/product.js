// Create products store
import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image)
            return { success: false, message: 'Please fill in all fields' };
        try {
            const response = await fetch('/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            const data = await response.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: 'Product created successfully' };
        } catch (error) { return { success: false, message: error.message } }
    },
    fetchProducts: async () => {
        try {
            const response = await fetch('/product');
            const data = await response.json();
            set(() => ({ products: [...data.data] }));
            return data.data;
        } catch (error) { return { success: false, message: error.message } }
    },
    updateProduct: async (productId, newProduct) => {
        try {
            const response = await fetch(`/product/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            const data = await response.json();
            set((state) => ({
                products: [...state.products.map(product => product._id === productId ? { ...product, ...data.data } : product
                )]
            }));
            return { success: true, message: 'Updated product details' };
        } catch (error) { return { success: false, message: error.message } }
    },
    deleteProduct: async (productId) => {
        try {
            const response = await fetch(`/product/${productId}`, {
                method: 'DELETE'
            })
            const data = await response.json();
            if (data.success) {
                set((state) => ({ products: [...state.products.filter(product => product._id !== productId)] }))
                return { success: true, message: 'Successfully deleted product' };
            } else return { success: false, message: 'Error when deleting product' }
        } catch (error) { return { success: false, message: error.message } }
    },
}));