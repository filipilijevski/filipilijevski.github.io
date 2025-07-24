import { NavLink } from "react-router-dom";

/* Centralised list for easy edits */
const navLinks = [
  { label: "Home",             to: "/" },
  { label: "Service Site",     to: "/service-site" },
  { label: "Small Game",       to: "/small-game" },
  { label: "Market Dashboard", to: "/analytics-site" },
  { label: "E-Commerce",       to: "/ecommerce" }
];

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark shadow-dark fixed-top px-3">
      {/* Left-hand brand / logo placeholder (keeps buttons from crowding) */}
      <span className="navbar-brand fw-bold">Filip Ilijevski's Portfolio</span>

      {/* Right-hand controls */}
      <div className="d-flex align-items-center gap-2 ms-auto">

        {/* Nav menu */}
        <div className="dropdown">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="dropdown"
            aria-label="Open navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink className="dropdown-item" to={to}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
