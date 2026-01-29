Product Catalog — Pages Router + Redux Toolkit
Overview

This project is a small Product Catalog application built with Next.js Pages Router, TypeScript, and Redux Toolkit.
It demonstrates clean architecture, predictable state management, pagination, and reusable UI components.

--The app fetches data from the DummyJSON API and includes:

1-Products list with pagination

2-Product details page

3-Loading, error, and empty states

4-Responsive UI

--Tech Stack

1-Next.js (Pages Router)

2-TypeScript

3-Redux Toolkit

4-React Redux

5-Plain CSS (no UI libraries)

--Project Structure
pages/
  ├── index.tsx              # Redirects to /products
  ├── products/
  │   ├── index.tsx          # Products list page
  │   └── [id].tsx           # Product details page

store/
  ├── index.ts               # Redux store setup
  ├── hooks.ts               # Typed Redux hooks
  └── slices/
      └── productsSlice.ts   # Products state & async logic

components/
  ├── ProductCard.tsx
  ├── ProductGrid.tsx
  ├── Pagination.tsx
  ├── Loader.tsx
  └── ErrorState.tsx

styles/
  └── globals.css

--State Management (Redux Toolkit)

The Redux store manages:

1-Products list

2-Pagination state

3-Loading and error states

4-Selected product details

5-Async API calls are handled using createAsyncThunk, providing:

6-Predictable loading states

7-Centralized error handling

8-Clean separation between UI and data logic

--Pages
/products

1-Displays a paginated grid of products

2-Handles loading, error, and empty states

3-Responsive layout (3 columns desktop, 2 tablet, 1 mobile)

/products/[id]

1-Displays product details

2-Handles invalid product IDs gracefully

3-Includes navigation back to the products list

--API

Data is fetched from:

https://dummyjson.com


Endpoints used:

1-GET /products?limit=12&skip=0

2-GET /products/{id}

▶️ How to Run the Project
npm install
npm run dev


Then open:

http://localhost:3000

--Architecture Decisions

1-Pages Router was used to demonstrate classic Next.js routing.

2-Redux Toolkit was chosen for predictable global state and pagination handling.

3-UI components are kept dumb and reusable, while pages handle data fetching.

4-Pagination state lives in Redux to avoid duplicated local state.

5-Plain CSS was used to keep the project simple and easy to reason about.