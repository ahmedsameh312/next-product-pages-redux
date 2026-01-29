import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductById } from "@/store/slices/productsSlice";

import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import Link from "next/link";

export default function ProductDetailsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { id } = router.query;

    const { item, loading, error } = useAppSelector(
        (state) => state.products.details
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [id, dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    if (!item) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="page">
            <Link href="/products" className="back-link">
                ← Back to Products
            </Link>

            <div className="product-details">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                />
                <div className="product-info">
                    <h1>{item.title}</h1>
                    <p className="price">${item.price}</p>
                    <p><strong>Rating:</strong> ⭐ {item.rating}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
    );
}

