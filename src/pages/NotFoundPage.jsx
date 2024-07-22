import { Link } from 'react-router-dom';
import { ErrorPage } from '../app/Styles';

const NotFoundPage = () => {
    return (
        <ErrorPage>
            <h1>404</h1>
            <p>Oops! Page not found.</p>
            <Link to="/">Go back to Home</Link>
        </ErrorPage>
    );
};

export default NotFoundPage;