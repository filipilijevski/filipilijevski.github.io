import { useState, useEffect, type FormEvent } from 'react';
import type { Coach, Client } from '../data/sampleEntities';

interface Props {
  show: boolean;
  mode: 'coach' | 'client';
  entity: Coach | Client | null;
  onClose: () => void;
}

export default function ContactModal({ show, mode, entity, onClose }: Props) {
  /* render nothing when closed */
  if (!show || !entity) return null;

  /* success toggle */
  const [sent, setSent] = useState(false);

  /* close on ESC if we want */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(onClose, 1500); // auto-close after 1 and half seconds
  }

  /* stop click through */
  function stop(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="modal-card" onClick={stop}>
        <button
          className="btn-close ms-auto"
          style={{ fontSize: '1.1rem' }}
          aria-label="Close"
          onClick={onClose}
        />
        <h4 className="mb-3">
          {mode === 'coach' ? 'Book / Contact' : 'Contact Student'} -{' '}
          {entity.name}
        </h4>

        {sent ? (
          <p className="fw-bold text-success mb-0">
            Your message has been sent!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col">
                <label className="form-label">First name</label>
                <input className="form-control" required />
              </div>
              <div className="col">
                <label className="form-label">Last name</label>
                <input className="form-control" required />
              </div>
            </div>

            <div className="row g-2 mt-2">
              <div className="col">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="col">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" />
              </div>
            </div>

            {mode === 'coach' && (
              /* fields for when client requests booking */
              <>
                <div className="row g-2 mt-2">
                  <div className="col">
                    <label className="form-label">Preferred date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col">
                    <label className="form-label">Preferred time</label>
                    <input type="time" className="form-control" />
                  </div>
                </div>

                {/* smol legend placeholder */}
                <div className="d-flex gap-2 align-items-center small mt-1">
                  <span className="legend-square bg-success" /> Available
                  <span className="legend-square bg-danger ms-3" /> Booked
                </div>
              </>
            )}

            <label className="form-label mt-3">Message</label>
            <textarea className="form-control" rows={3} required />

            <div className="d-flex gap-2 justify-content-end mt-4">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
