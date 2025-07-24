/* eslint-disable react-refresh/only-export-components */
import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from 'react-router-dom';
import { createContext, useContext, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ──────────────────────────────────────────────────────────
   DESIGN TOKENS - tweak once, whole store updates
   ────────────────────────────────────────────────────────── */
const PAGE_BG   = 'var(--shop-page-bg)';
const CARD_BG   = 'var(--shop-card-bg)';
const CARD_TEXT = 'var(--shop-card-fg)';
const LOGO_SRC  = '/assets/shop/logo.svg';    // drop any SVG/PNG here

/* ---------- Domain models ---------- */
type Product = {
  id: number;
  name: string;
  price: number;
  category: 'Clothing' | 'Accessories' | 'Shoes';
  brand: string;
  color: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  image: string;
  description: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'AeroFlex Running Tee',
    price: 34.99,
    category: 'Clothing',
    brand: 'Strides',
    color: 'Blue',
    size: 'M',
    image: '/assets/shop/tee_blue.jpg',
    description: 'Ultralight moisture-wicking fabric—perfect for summer runs.',
  },
  {
    id: 2,
    name: 'StrideMax 2.0 Shoes',
    price: 119.5,
    category: 'Shoes',
    brand: 'Strides',
    color: 'Black',
    size: 'L',
    image: '/assets/shop/shoes_black.jpg',
    description: 'Responsive foam mid-sole with carbon-plate propulsion.',
  },
  // ‼️ Add more seed items if desired
];

/* ---------- Cart context ---------- */
type CartLine = { product: Product; qty: number };

type CartState = {
  lines: CartLine[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<CartState | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value: CartState = useMemo(
    () => ({
      lines,
      add: (p) =>
        setLines((prev) => {
          const idx = prev.findIndex((l) => l.product.id === p.id);
          return idx > -1
            ? prev.map((l, i) => (i === idx ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { product: p, qty: 1 }];
        }),
      remove: (id) =>
        setLines((prev) => prev.filter((l) => l.product.id !== id)),
      updateQty: (id, qty) =>
        setLines((prev) =>
          prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
    }),
    [lines],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

const useCart = () => useContext(CartCtx)!;

/* ---------- Faceted search ---------- */
type FacetFilter = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  priceMin?: number;
  priceMax?: number;
};

function useFilteredProducts(filters: FacetFilter) {
  return useMemo(
    () =>
      PRODUCTS.filter((p) => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.brand && p.brand !== filters.brand) return false;
        if (filters.color && p.color !== filters.color) return false;
        if (filters.size && p.size !== filters.size) return false;
        if (filters.priceMin && p.price < filters.priceMin) return false;
        if (filters.priceMax && p.price > filters.priceMax) return false;
        return true;
      }),
    [filters],
  );
}

/* ---------- UI atoms ---------- */
function Filters({
  filters,
  setFilters,
  mobileClose,
}: {
  filters: FacetFilter;
  setFilters: (f: FacetFilter) => void;
  mobileClose?: () => void;
}) {
  const update =
    (k: keyof FacetFilter) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      setFilters({ ...filters, [k]: e.target.value });

  return (
    <div>
      <h5 className="fw-bold mb-3">Filters</h5>

      {/* Category */}
      <label className="form-label small">Category</label>
      <select
        className="form-select mb-2"
        value={filters.category ?? ''}
        onChange={update('category')}
      >
        <option value="">All</option>
        <option>Clothing</option>
        <option>Shoes</option>
        <option>Accessories</option>
      </select>

      {/* Brand */}
      <label className="form-label small">Brand</label>
      <select
        className="form-select mb-2"
        value={filters.brand ?? ''}
        onChange={update('brand')}
      >
        <option value="">All</option>
        <option>Strides</option>
        <option>TrailBlazer</option>
      </select>

      {/* Colour */}
      <label className="form-label small">Colour</label>
      <select
        className="form-select mb-2"
        value={filters.color ?? ''}
        onChange={update('color')}
      >
        <option value="">All</option>
        <option>Blue</option>
        <option>Black</option>
        <option>Red</option>
      </select>

      {/* Size */}
      <label className="form-label small">Size</label>
      <select
        className="form-select mb-2"
        value={filters.size ?? ''}
        onChange={update('size')}
      >
        <option value="">All</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      {/* Price */}
      <div className="d-flex gap-1">
        <input
          type="number"
          className="form-control"
          placeholder="Min $"
          value={filters.priceMin ?? ''}
          onChange={(e) =>
            setFilters({ ...filters, priceMin: +e.target.value })
          }
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max $"
          value={filters.priceMax ?? ''}
          onChange={(e) =>
            setFilters({ ...filters, priceMax: +e.target.value })
          }
        />
      </div>

      <button
        className="btn btn-secondary w-100 mt-3"
        onClick={() => {
          setFilters({});
          mobileClose?.();
        }}
      >
        Reset
      </button>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div
      className="card h-100 shadow-sm"
      style={{ background: CARD_BG, color: CARD_TEXT }}
    >
      <img
        src={p.image}
        className="card-img-top"
        alt={p.name}
        style={{ objectFit: 'cover', height: 180 }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="fw-bold">{p.name}</h6>
        <p className="small text-muted mb-2">{p.description}</p>
        <span className="fw-bold mb-3">${p.price.toFixed(2)}</span>
        <button
          className="btn btn-primary mt-auto"
          aria-label={`Add ${p.name} to cart`}
          onClick={() => add(p)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ---------- Main storefront ---------- */
function StoreFront() {
  const [filters, setFilters] = useState<FacetFilter>({});
  const products = useFilteredProducts(filters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { lines } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid my-4"
      style={{
        background: PAGE_BG,
        color: CARD_TEXT,
        borderRadius: 8,
        padding: '1.5rem 1rem',
      }}
    >
      {/* Store mast-head */}
      <div className="shop-header d-flex align-items-center gap-2 mb-4">
        <img src={LOGO_SRC} alt="Strides logo" width={42} height={42} />
        <h2 className="fw-bold mb-0">Strides Store</h2>
      </div>

      <div className="row">
        {/* Filters - desktop */}
        <aside className="col-lg-3 d-none d-lg-block">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        {/* Filters - mobile off-canvas */}
        <div
          className={`offcanvas offcanvas-start ${
            showMobileFilters ? 'show' : ''
          }`}
          tabIndex={-1}
          style={{
            visibility: showMobileFilters ? 'visible' : 'hidden',
          }}
          onClick={() => setShowMobileFilters(false)}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Filters</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowMobileFilters(false)}
            />
          </div>
          <div className="offcanvas-body">
            <Filters
              filters={filters}
              setFilters={setFilters}
              mobileClose={() => setShowMobileFilters(false)}
            />
          </div>
        </div>

        {/* Product grid */}
        <main className="col-lg-9">
          {/* Promo banner */}
          <div className="alert alert-info d-flex justify-content-between align-items-center small">
            <span>
              🎉 Get <strong>30 % off</strong> all summer gear—today only!
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/ecommerce/cart')}
            >
              View Cart ({lines.reduce((s, l) => s + l.qty, 0)})
            </button>
          </div>

          {/* Mobile filter toggle */}
          <button
            className="btn btn-outline-secondary d-lg-none mb-3"
            onClick={() => setShowMobileFilters(true)}
          >
            Filter & Sort
          </button>

          {products.length === 0 && <p>No products match your filters.</p>}

          <div
            className="d-grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Cart ---------- */
function CartPage() {
  const { lines, updateQty, remove } = useCart();
  const navigate = useNavigate();
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0);

  if (!lines.length)
    return (
      <div className="container text-center my-5">
        <h4>Your cart is empty.</h4>
        <Link to="/ecommerce" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-4">Your Cart</h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Item</th>
            <th style={{ width: 120 }}>Qty</th>
            <th style={{ width: 120 }}>Price</th>
            <th style={{ width: 40 }} />
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.product.id}>
              <td>{l.product.name}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  value={l.qty}
                  onChange={(e) =>
                    updateQty(l.product.id, +e.target.value)
                  }
                />
              </td>
              <td>${(l.product.price * l.qty).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  aria-label="Remove"
                  onClick={() => remove(l.product.id)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="fw-bold">Total</td>
            <td />
            <td className="fw-bold">${total.toFixed(2)}</td>
            <td />
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-end gap-2">
        <Link to="/ecommerce" className="btn btn-secondary">
          Continue Shopping
        </Link>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/ecommerce/checkout')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

/* ---------- Checkout ---------- */
function CheckoutPage() {
  const navigate = useNavigate();
  const { clear } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [info, setInfo] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleNext = () =>
    setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : 3));

  const handlePlaceOrder = () => {
    clear();
    navigate('/ecommerce/thankyou');
  };

  return (
    <div className="container my-4" style={{ maxWidth: 620 }}>
      {/* Stepper */}
      <nav
        aria-label="Checkout steps"
        className="d-flex justify-content-center gap-3 mb-4 fw-bold"
      >
        {['Cart', 'Info', 'Payment', 'Done'].map((label, i) => (
          <span
            key={label}
            className={`badge rounded-pill ${
              i === step
                ? 'bg-primary'
                : i < step
                ? 'bg-success'
                : 'bg-secondary'
            }`}
          >
            {label}
          </span>
        ))}
      </nav>

      {step === 1 && (
        <>
          <h4 className="fw-bold mb-3">Contact Information</h4>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input
              className="form-control"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Shipping address</label>
            <textarea
              className="form-control"
              rows={2}
              value={info.address}
              onChange={(e) =>
                setInfo({ ...info, address: e.target.value })
              }
              required
            />
          </div>

          <button className="btn btn-primary" onClick={handleNext}>
            Continue to Payment
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h4 className="fw-bold mb-3">Payment Details</h4>
          <div className="mb-3">
            <label className="form-label">Card number</label>
            <input
              type="text"
              className="form-control"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="row g-2 mb-3">
            <div className="col">
              <label className="form-label">Expiry</label>
              <input
                type="text"
                className="form-control"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="col">
              <label className="form-label">CVC</label>
              <input
                type="text"
                className="form-control"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Review Order
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h4 className="fw-bold mb-3">Review & Place Order</h4>
          <p className="mb-3">
            All set! Click the button below to place your order.
          </p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => setStep(2)}
            >
              Back
            </button>
            <button
              className="btn btn-success"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Thank-you ---------- */
function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div className="container text-center my-5">
      <h2 className="fw-bold mb-3">Thank you for your purchase!</h2>
      <p>
        Your order number is{' '}
        <strong>
          {Math.floor(Math.random() * 9_000_000) + 1_000_000}
        </strong>
        .
      </p>
      <button
        className="btn btn-primary me-2"
        onClick={() => navigate('/ecommerce')}
      >
        Back to Store
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate('/ecommerce/survey')}
      >
        Quick Survey
      </button>
    </div>
  );
}

/* ---------- Post-purchase survey ---------- */
function SurveyPage() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => navigate('/ecommerce'), 1500);
  };

  return (
    <div className="container my-4" style={{ maxWidth: 520 }}>
      <h3 className="fw-bold mb-3 text-center">
        We value your feedback
      </h3>

      {sent ? (
        <p className="text-success fw-bold text-center">
          Thanks for helping us improve!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="form-label fw-semibold">
            How satisfied are you with the experience?
          </label>
          <select className="form-select mb-3" required>
            <option value="">Select</option>
            <option>5 - Excellent</option>
            <option>4 - Good</option>
            <option>3 - Average</option>
            <option>2 - Poor</option>
            <option>1 - Terrible</option>
          </select>

          <label className="form-label fw-semibold">Any comments?</label>
          <textarea className="form-control mb-3" rows={3} />

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/ecommerce')}
            >
              Skip
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ---------- Page shell ---------- */
export default function Ecommerce() {
  return (
    <>
      {/*  Fixed-top navbar (ensure Navbar component has `fixed-top`) */}
      <Navbar />

      {/*  nav-spacer prevents overlap */}
      <div className="nav-spacer">
        <CartProvider>
          <Routes>
            <Route index element={<Navigate to="shop" replace />} />
            <Route path="shop" element={<StoreFront />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="thankyou" element={<ThankYouPage />} />
            <Route path="survey" element={<SurveyPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="shop" replace />} />
          </Routes>
        </CartProvider>
      </div>

      <Footer />
    </>
  );
}
