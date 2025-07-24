import { forwardRef } from 'react';

/* here we make sure to delegate DOM updates to parent via ref for no lag */
const Crosshair = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    style={{
      position: 'absolute',
      width: 32,
      height: 32,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
    }}
  >
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <circle cx="50" cy="50" r="10" stroke="red" strokeWidth="4" fill="none" />
      <line x1="0" y1="50" x2="35" y2="50" stroke="#fff" strokeWidth="4" />
      <line x1="65" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="4" />
      <line x1="50" y1="0" x2="50" y2="35" stroke="#fff" strokeWidth="4" />
      <line x1="50" y1="65" x2="50" y2="100" stroke="#fff" strokeWidth="4" />
    </svg>
  </div>
));

export default Crosshair;
