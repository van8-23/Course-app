
import { useState } from 'react';
import { Link, useInRouterContext } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants/uiText';
import '../../styles/auth.css';

type Errors = { email?: string; password?: string }; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const isInRouter = useInRouterContext();

  const validate = (): Errors => {
    return {
      ...(email.trim() ? {} : { email: 'Email is required.' }),
      ...(password.trim() ? {} : { password: 'Password is required.' }),
    };
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    console.log('LOGIN', { email, password });
  };

  return (
    <main className="auth" aria-label="Login page">
      <section className="auth__card">
        <h1 className="auth__title">Login</h1>

        <form noValidate onSubmit={onSubmit}>
          <div className="auth__field">
            <label htmlFor="login-email" className="auth__label">Email</label>
            <input
              id="login-email"
              type="email"
              className="auth__input"
              value={email}
                  onChange={e => {
                setEmail(e.target.value);
                setErrors(prev => {
                  if (!prev.email) return prev;
                  const next = { ...prev };
                  delete next.email;
                  return next;
                });
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-err' : undefined}
              placeholder="Input text"
            />
            {errors.email && (
              <div id="login-email-err" role="alert" className="auth__error">
                {errors.email}
              </div>
            )}
          </div>

          <div className="auth__field">
            <label htmlFor="login-pass" className="auth__label">Password</label>
            <input
              id="login-pass"
              type="password"
              className="auth__input"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setErrors(prev => {
                  if (!prev.password) return prev;
                  const next = { ...prev };
                  delete next.password;
                  return next;
                });
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-pass-err' : undefined}
              placeholder="Input text"
            />
            {errors.password && (
              <div id="login-pass-err" role="alert" className="auth__error">
                {errors.password}
              </div>
            )}
          </div>

          <div className="auth__actions">
            <Button buttonText={BUTTON_TEXT.LOGIN} onClick={() => {}} type="submit" />
          </div>
        </form>

        <p className="auth__hint">
            If you don’t have an account you may{' '}
          {isInRouter ? (
            <Link to="/registration">registration</Link>
          ) : (
            <a href="/registration">registration</a>
          )}
        </p>
      </section>
    </main>
  );
}
