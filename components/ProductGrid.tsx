import { Product } from '@/store/slices/productsSlice';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return <p>No products available.</p>;
    }

    return (
        <div className='grid'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}