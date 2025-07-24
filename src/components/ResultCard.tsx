import { type Coach, type Client } from '../data/sampleEntities';

interface Props {
  mode: 'coach' | 'client'; // current search mode
  entity: Coach | Client;
  onContact: (e: Coach | Client) => void;
}

export default function ResultCard({ mode, entity, onContact }: Props) {
  const isCoach = mode === 'coach';

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm h-100">
        <img
          src={`${import.meta.env.BASE_URL}${entity.avatar}`}
          className="result-card-image"
          alt={`${entity.name} avatar`}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{entity.name}</h5>

          {isCoach ? (
            <>
              <p className="card-text mb-1">
                <strong>Rate:</strong> ${(entity as Coach).pricePerHour}/hr
              </p>
              <p className="card-text mb-1">
                <strong>Level:</strong> {(entity as Coach).level}
              </p>
              <p className="card-text mb-1">
                <strong>Region:</strong> {(entity as Coach).region}
              </p>
              <p className="card-text mb-2">
                <strong>Languages:</strong>{' '}
                {(entity as Coach).languages.join(', ')}
              </p>
            </>
          ) : (
            <>
              <p className="card-text mb-1">
                <strong>Level:</strong> {(entity as Client).lookingFor}
              </p>
              <p className="card-text mb-1">
                <strong>Budget:</strong> {(entity as Client).budget}
              </p>
              <p className="card-text mb-1">
                <strong>Region:</strong> {(entity as Client).region}
              </p>
              <p className="card-text mb-2">
                <strong>Languages:</strong>{' '}
                {(entity as Client).languages.join(', ')}
              </p>
            </>
          )}

          <button className="mt-auto btn btn-primary w-100"
            onClick={() => onContact(entity)}>
            {isCoach ? 'Book / Contact' : 'Contact Student'}
          </button>
        </div>
      </div>
    </div>
  );
}
