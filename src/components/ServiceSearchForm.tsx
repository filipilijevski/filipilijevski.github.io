import { type FormEvent, useState } from 'react';

export interface Filters {
  priceMin?: number;
  priceMax?: number;
  level?: string;
  region?: string;
  language?: string;
  date?: string;
  time?: string;
}

interface Props {
  mode: 'coach' | 'client';
  onSearch: (filters: Filters) => void;
  onReset: () => void;
}

export default function ServiceSearchForm({ mode, onSearch, onReset }: Props) {
  /* local state for each filter field */
  const [filters, setFilters] = useState<Filters>({});

  /* change handler */
  const update = (k: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFilters({ ...filters, [k]: e.target.value });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(filters);
  }

  function handleReset() {
    setFilters({});
    onReset();
  }

  return (
    <form className="service-form border rounded p-3 mb-4" onSubmit={handleSubmit} onReset={handleReset}>
      <h5 className="mb-3">
        {mode === 'coach' ? 'Find a Coach' : 'Find Students'}
      </h5>

      {/* price is only something for coaches really */}
      {mode === 'coach' && (
        <div className="row g-2 mb-3">
          <div className="col">
            <label className="form-label">Price min ($)</label>
            <input type="number" className="form-control" value={filters.priceMin ?? ''} onChange={update('priceMin')} />
          </div>
          <div className="col">
            <label className="form-label">Price max ($)</label>
            <input type="number" className="form-control" value={filters.priceMax ?? ''} onChange={update('priceMax')} />
          </div>
        </div>
      )}

      {/* coach and client share level, region and language */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <label className="form-label">Level</label>
          <select className="form-select" value={filters.level ?? ''} onChange={update('level')}>
            <option value="">Any</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Region</label>
          <input type="text" className="form-control" placeholder="e.g. Toronto" value={filters.region ?? ''} onChange={update('region')} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Language</label>
          <input type="text" className="form-control" placeholder="e.g. English" value={filters.language ?? ''} onChange={update('language')} />
        </div>
      </div>

      {/* availability picker - this is for coaches only */}
      {mode === 'coach' && (
        <div className="row g-2 mb-3">
          <div className="col">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={filters.date ?? ''} onChange={update('date')} />
          </div>
          <div className="col">
            <label className="form-label">Time</label>
            <input type="time" className="form-control" value={filters.time ?? ''} onChange={update('time')} />
          </div>
        </div>
      )}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="reset"  className="btn btn-secondary">Reset</button>
      </div>
    </form>
  );
}
