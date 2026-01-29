import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, setPage } from "@/store/slices/productsSlice";

import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import SearchInput from "@/components/SearchInput";

export default function ProductsPage() {
    const dispatch = useAppDispatch();

    const { items, loading, error, page, total, search } = useAppSelector((state) => state.products.list);

    useEffect(() => {
        dispatch(fetchProducts({page, search}));
    }, [dispatch, page, search]);

      return (
    <div className="page">
      <h1>Product Catalog</h1>
      <SearchInput />

      {loading && <Loader />}

      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          <ProductGrid products={items} />

          <Pagination
            currentPage={page}
            total={total}
            onPageChange={(newPage) =>
              dispatch(setPage(newPage))
            }
          />
        </>
      )}
    </div>
  );
}