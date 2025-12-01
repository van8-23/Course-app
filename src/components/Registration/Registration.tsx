/*
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants/uiText';
import '../../styles/auth.css';

type Errors = { name?: string; email?: string; password?: string };

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    if (!password.trim()) e.password = 'Password is required.';
    return e;
    
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    console.log('REGISTER', { name, email, password });
  };

  return (
    <main className="auth" aria-label="Registration page">
      <section className="auth__card">
        <h1 className="auth__title">Registration</h1>

        <form noValidate onSubmit={onSubmit}>
          <div className="auth__field">
            <label htmlFor="reg-name" className="auth__label">Name</label>
            <input
              id="reg-name"
              className="auth__input"
              value={name}
              onChange={e => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'reg-name-err' : undefined}
              placeholder="Input text"
            />
            {errors.name && (
              <div id="reg-name-err" role="alert" className="auth__error">
                {errors.name}
              </div>
            )}
          </div>

          <div className="auth__field">
            <label htmlFor="reg-email" className="auth__label">Email</label>
            <input
              id="reg-email"
              type="email"
              className="auth__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'reg-email-err' : undefined}
              placeholder="Input text"
            />
            {errors.email && (
              <div id="reg-email-err" role="alert" className="auth__error">
                {errors.email}
              </div>
            )}
          </div>

          <div className="auth__field">
            <label htmlFor="reg-pass" className="auth__label">Password</label>
            <input
              id="reg-pass"
              type="password"
              className="auth__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'reg-pass-err' : undefined}
              placeholder="Input text"
            />
            {errors.password && (
              <div id="reg-pass-err" role="alert" className="auth__error">
                {errors.password}
              </div>
            )}
          </div>

          <div className="auth__actions">
            <Button buttonText={BUTTON_TEXT.LOGIN} onClick={() => {}} type="submit" />
          </div>
        </form>

        <p className="auth__hint">
          If you have an account you may <Link to="/login">login</Link>
        </p>
      </section>
    </main>
  );
}*/

import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants/uiText';
import '../../styles/auth.css';

type Errors = { name?: string; email?: string; password?: string };

type Props = {
  onSuccess?: () => void;
};

const Registration: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  // Validate fields
  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    if (!password.trim()) e.password = 'Password is required.';
    return e;
  };

  // Handle form submission
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    console.log('REGISTER', { name, email, password });
    onSuccess?.();
  };

  return (
    <main className="auth" aria-label="Registration page">
      <section className="auth__card">
        <h1 className="auth__title">Registration</h1>

        <form noValidate onSubmit={onSubmit} className="auth__form">
          {/* Name */}
          <div className="auth__field">
            <label htmlFor="reg-name" className="auth__label">
              Name
            </label>
            <input
              id="reg-name"
              className={`auth__input ${errors.name ? 'auth__input--error' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'reg-name-err' : undefined}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div id="reg-name-err" role="alert" className="auth__error">
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="auth__field">
            <label htmlFor="reg-email" className="auth__label">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              className={`auth__input ${errors.email ? 'auth__input--error' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'reg-email-err' : undefined}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div id="reg-email-err" role="alert" className="auth__error">
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="auth__field">
            <label htmlFor="reg-pass" className="auth__label">
              Password
            </label>
            <input
              id="reg-pass"
              type="password"
              className={`auth__input ${errors.password ? 'auth__input--error' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'reg-pass-err' : undefined}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div id="reg-pass-err" role="alert" className="auth__error">
                {errors.password}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="auth__actions">
            <Button buttonText={BUTTON_TEXT.REGISTER} type="submit" />
          </div>
        </form>

        {/* Hint text (styled as in Figma) */}
        <p className="auth__hint">
          If you have an account, you may{' '}
          <button
            type="button"
            className="auth__link-btn"
            onClick={() => onSuccess?.()}
          >
            login
          </button>
        </p>
      </section>
    </main>
  );
};

export default Registration;


