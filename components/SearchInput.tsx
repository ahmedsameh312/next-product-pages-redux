import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch } from '@/store/slices/productsSlice';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(
    (state) => state.products.list.search
  );

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      className="search-input"
    />
  );
}