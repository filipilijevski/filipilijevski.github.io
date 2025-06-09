import { NavLink } from 'react-router-dom';

/* we can always add or remove menu items here in the future*/
const navLinks = [
  { label: 'Home',          to: '/' },
  { label: 'Service Site',  to: '/service-site' },
  { label: 'Small Game',    to: '/small-game' },
  { label: 'Analytics Site',to: '/analytics-site' },
  { label: 'E-Commerce',    to: '/ecommerce' },
];

export default function Navbar() {
  return (
    <div className="dropdown">
      <button
        className="menu-toggle navbar-toggler"
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
  );
}
