import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* feature imports */
import { GameConfigProvider } from '../features/small-game/context/GameConfigContext';
import ConfigPanel from '../features/small-game/components/ConfigPanel';
import GameFeature from '../features/small-game';

export default function SmallGame() {
  return (
    <>
      <Navbar />

      {/* hero boi */}
      <header
        className="d-flex align-items-center"
        style={{
          background:
            'linear-gradient(270deg,rgba(141, 65, 90, 0.99) 10%,rgba(54, 7, 92, 0.45) 90%),url("./assets/smallgameheropic.jpg") center/cover no-repeat',
          minHeight: '40vh',
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-0">Urban Sniper</h1>
          <p className="lead fw-bold">Aim · React · Score</p>
        </div>
      </header>

      {/* same gradient as settings screen to avoid bleed */}
      <main
        style={{
          background:
            'linear-gradient(270deg,rgba(141, 65, 90, 1) 10%,rgba(54, 7, 92, 1) 90%)',
        }}
      >
        <GameConfigProvider>
          <section className="py-4">
            <ConfigPanel />
          </section>

          <section className="pb-5">
            <GameFeature />
          </section>
        </GameConfigProvider>
      </main>

      <Footer />
    </>
  );
}
