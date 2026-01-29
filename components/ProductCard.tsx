import Link from "next/link";
import { Product } from '@/store/slices/productsSlice';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="card">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="image"
            />
            <h3 className="title" title={product.title}>
                {product.title}
            </h3>
            <p className="price">${product.price}</p>
            <p className="rating">⭐{product.rating}</p>

            <Link href={`/products/${product.id}`} className="button">
                View Details
            </Link>
        </div>
    )
}