import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SmallGame() {
  return (
    <>
      <Navbar />

      <header
        className="hero-section d-flex align-items-center"
        style={{
          background:
            'linear-gradient(180deg,rgba(15,15,43,0.7) 10%,rgba(137,169,238,0.1) 90%),url("./assets/betterns4.jpeg") center/cover no-repeat',
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Under Construction</h1>
          <p className="lead fw-bold">
            Check back soon for the Small Game case study.
          </p>
        </div>
      </header>

      <Footer />
    </>
  );
}
