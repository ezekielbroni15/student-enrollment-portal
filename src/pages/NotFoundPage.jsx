import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="page-panel centered-panel">
      <p className="error-code">404</p>
      <h1>Page not found</h1>
      <p>Sorry, the page you requested does not exist.</p>
      <Link to="/" className="text-link">
        Return Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
