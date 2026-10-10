import {Helmet} from 'react-helmet-async';
import {useRef, FormEvent, SyntheticEvent} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {setCity} from '../../store/offers-process/offers-process';
import {fetchFavoritesOffers, loginAction} from '../../store/api-actions';
import Logo from '../../components/logo/logo';
import {AuthorizationStatus, AppRoute, CITIES} from '../../const';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)].name;

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const result = await dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));

      if (loginAction.fulfilled.match(result)) {
        dispatch(fetchFavoritesOffers());
      }
    }
  };

  const handleRandomCityClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCity(randomCity));
    navigate(AppRoute.Main);
  };

  return authorizationStatus !== AuthorizationStatus.Auth ? (
    <div className="page page--gray page--login" data-testid="loginPage">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                handleSubmit(evt);
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="emailElement"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  pattern="(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d).{2,}"
                  placeholder="Password"
                  required
                  data-testid="passwordElement"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <Navigate to={AppRoute.Main} />;
}

export default LoginPage;
