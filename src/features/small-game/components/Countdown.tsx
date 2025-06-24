// kind of useless for now but will implement it later

interface Props {
  secondsLeft: number;
}

export default function Countdown({ secondsLeft }: Props) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1055 }}
    >
      <span style={{ fontSize: '15vw', color: '#fff', fontWeight: 700 }}>
        {secondsLeft > 0 ? secondsLeft : 'GO!'}
      </span>
    </div>
  );
}
