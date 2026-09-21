import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <Helmet>
        <title>Page not found</title>
      </Helmet>

      <main className="page__main" style={{textAlign: 'center', paddingTop: '200px'}}>
        <h1>404. Page not found</h1>
        <Link to={AppRoute.Main} style={{color: '#4481c3', fontSize: '24px'}}>Main Page</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
