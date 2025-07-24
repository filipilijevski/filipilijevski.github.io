import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* hero */}
      <header className="hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">
            Designing clarity, one pixel at a time.
          </h1>
          <p className="lead fw-bold mb-0">
            Computer-Science Student&nbsp;| Aspiring UX Designer
          </p>
        </div>
      </header>

      {/* about */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="fw-bold mb-4">About Me</h2>
          <img
            src="./assets/novascotia1.jpeg"
            className="img-fluid rounded-circle shadow mb-4"
            alt="Portrait of Filip Ilijevski"
            width={350}
            height={200}
          />
          <p>
            Hi! I'm <strong>Filip Ilijevski</strong>, a computer-science
            student who loves turning complex workflows into responsive,
            intuitive experiences.
          </p>
          <h3 className="fw-bold mt-4 mb-3">How I Work</h3>
          <p>
            I primarily use <strong>React.js, Spring, PostgreSQL</strong> and{" "}
            <strong>Express.js</strong> for rapid, full-stack app development.
            Most prototypes are done in Figma and validated with{" "}
            <a
              href="https://www.nngroup.com/articles/usability-testing-101/"
              target="_blank"
              rel="noopener"
            >
              usability tests
            </a>
            .
          </p>
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="projects-section">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">My Work</h2>

          <div className="project-cols">
            <Link to="/service-site" className="project-card">
              <span className="project-title">Service Site</span>
              <div className="project-images">
                <img src="./assets/betterns2.jpeg" alt="" />
              </div>
              <span className="project-status">Now Available!</span>
            </Link>

            <Link to="/small-game" className="project-card">
              <span className="project-title">Small Game</span>
              <div className="project-images">
                <img src="./assets/betterns4.jpeg" alt="" />
              </div>
              <span className="project-status">Now Available!</span>
            </Link>

            <Link to="/ecommerce" className="project-card">
              <span className="project-title">E-commerce</span>
              <div className="project-images">
                <img src="./assets/novascotia6.jpeg" alt="" />
              </div>
              <span className="project-status">Now Available!</span>
            </Link>

            <Link to="/analytics-site" className="project-card">
              <span className="project-title">Analytics Site</span>
              <div className="project-images">
                <img src="./assets/novascotia5.jpeg" alt="" />
              </div>
              <span className="project-status">Now Available!</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
