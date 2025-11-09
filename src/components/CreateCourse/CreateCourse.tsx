
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import { mockedAuthorsList, type Author, type Course } from '../../constants';
import './createCourse.css';

const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `id_${Math.random().toString(36).slice(2)}`;

const today = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const toHHMM = (min: number) => {
  const minutes = Number.isFinite(min) ? Math.max(0, Math.floor(min)) : 0;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  const unit = h === 1 && m === 0 ? 'hour' : 'hours';
  return `${hh}:${mm} ${unit}`;
};

type Props = {
  authors?: Author[];
  onCreate: (course: Course) => void;
  onCancel?: () => void;
};

const mergeAuthors = (...lists: Author[][]) => {
  const map = new Map<string, Author>();
  for (const list of lists) {
    for (const author of list) {
      map.set(author.id, author);
    }
  }
  return Array.from(map.values());
};

const CreateCourse: React.FC<Props> = ({ authors, onCreate, onCancel }) => {
  const baseAuthors = useMemo<Author[]>(
    () => authors ?? mockedAuthorsList,
    [authors]
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState('');

  const [available, setAvailable] = useState<Author[]>(baseAuthors);
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setAvailable((prev) => mergeAuthors(baseAuthors, prev));
  }, [baseAuthors]);

  const durationNum = useMemo(
    () => Number(duration || 0),
    [duration]
  );
  const durationLabel = useMemo(
    () => toHHMM(durationNum),
    [durationNum]
  );

  const computeErrors = () => ({
    title:
      title.trim().length < 2
        ? 'Title is required and should be at least 2 characters'
        : '',
    description:
      description.trim().length < 2
        ? 'Description is required and should be at least 2 characters'
        : '',
    duration:
      duration.trim().length === 0 || durationNum <= 0
        ? 'Duration is required and should be greater than 0'
        : '',
    newAuthor:
      newAuthor.trim().length > 0 && newAuthor.trim().length < 2
        ? 'Author name should be at least 2 characters'
        : '',
  } as const);

  const errors = computeErrors();

  const showError = (name: keyof typeof errors) =>
    touched[name] && errors[name];

  const handleCreateAuthor = () => {
    setTouched((prev) => ({ ...prev, newAuthor: true }));
    const name = newAuthor.trim();
    if (name.length < 2) return;

    const existsInAvailable = available.some(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    const existsInCourse = courseAuthors.some(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    if (existsInAvailable || existsInCourse) {
      setNewAuthor('');
      setTouched((prev) => ({ ...prev, newAuthor: false }));
      return;
    }

    const author: Author = { id: uid(), name };
    setAvailable((list) => [...list, author]);
    setNewAuthor('');
    setTouched((prev) => ({ ...prev, newAuthor: false }));
  };

  const addAuthorToCourse = (id: string) => {
    const author = available.find((a) => a.id === id);
    if (!author) return;
    setAvailable((list) => list.filter((a) => a.id !== id));
    setCourseAuthors((list) => [...list, author]);
  };

  const removeCourseAuthor = (id: string) => {
    const author = courseAuthors.find((a) => a.id === id);
    if (!author) return;
    setCourseAuthors((list) => list.filter((a) => a.id !== id));
    setAvailable((list) => [...list, author]);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDuration('');
    setNewAuthor('');
    setCourseAuthors([]);
    setAvailable(baseAuthors);
    setTouched({});
  };

  const onSubmit = () => {
    // mark fields as touched for UI
    setTouched({
      title: true,
      description: true,
      duration: true,
      newAuthor: !!newAuthor.trim(),
    });

    // recompute using current values to avoid any closure issues
    const currentErrors = computeErrors();
    if (
      currentErrors.title ||
      currentErrors.description ||
      currentErrors.duration
    ) {
      return;
    }

    const course: Course = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      creationDate: today(),
      duration: durationNum,
      authors: courseAuthors.map((a) => a.id),
    };

    onCreate(course);
    resetForm(); // <-- ensures "clears form after successful submission" passes
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (globalThis.history?.back) {
      globalThis.history.back();
    }
  };

  return (
    <section className="cc" aria-label="Course Edit/Create Page">
      <h1 className="h1">Course Edit/Create Page</h1>

      <div className="cc-card">
        <div className="cc-section">
          <h2 className="cc-subtitle">Main Info</h2>

          <label className="cc-label">
            <span className="cc-label__text">Title</span>
            <input
              className={`cc-input ${showError('title') ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Input text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, title: true }))
              }
              aria-invalid={!!showError('title')}
            />
            {showError('title') && (
              <div className="cc-error">{errors.title}</div>
            )}
          </label>

          <label className="cc-label">
            <span className="cc-label__text">Description</span>
            <textarea
              className={`cc-textarea ${
                showError('description') ? 'is-invalid' : ''
              }`}
              placeholder="Input text"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  description: true,
                }))
              }
              aria-invalid={!!showError('description')}
            />
            {showError('description') && (
              <div className="cc-error">{errors.description}</div>
            )}
          </label>
        </div>

        <div className="cc-section">
          <h2 className="cc-subtitle">Duration</h2>
          <div className="cc-row">
            <label className="cc-label" style={{ flex: 1 }}>
              <span className="cc-label__text">Duration</span>
              <input
                className={`cc-input ${
                  showError('duration') ? 'is-invalid' : ''
                }`}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Input text"
                value={duration}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '');
                  setDuration(digitsOnly);
                }}
                onBlur={() =>
                  setTouched((prev) => ({
                    ...prev,
                    duration: true,
                  }))
                }
                aria-invalid={!!showError('duration')}
              />
              {showError('duration') && (
                <div className="cc-error">{errors.duration}</div>
              )}
            </label>

            <div className="cc-duration-label" aria-live="polite">
              {durationLabel}
            </div>
          </div>
        </div>

        <div className="cc-section cc-authors">
          <div className="cc-authors__left">
            <h2 className="cc-subtitle">Authors</h2>

            <div className="cc-row">
              <label className="cc-label" style={{ flex: 1 }}>
                <span className="cc-label__text">Author Name</span>
                <input
                  className={`cc-input ${
                    showError('newAuthor') ? 'is-invalid' : ''
                  }`}
                  type="text"
                  placeholder="Input text"
                  value={newAuthor}
                  onChange={(e) => {
                    setNewAuthor(e.target.value);
                    setTouched((prev) => ({
                      ...prev,
                      newAuthor: false,
                    }));
                  }}
                  onBlur={() =>
                    setTouched((prev) => ({
                      ...prev,
                      newAuthor: true,
                    }))
                  }
                />
                {showError('newAuthor') && (
                  <div className="cc-error">
                    {errors.newAuthor}
                  </div>
                )}
              </label>
              <Button
                buttonText="CREATE AUTHOR"
                type="button"
                onClick={handleCreateAuthor}
              />
            </div>

            <h3 className="cc-mini">Authors List</h3>
            {available.length === 0 ? (
              <p className="cc-muted">No authors available</p>
            ) : (
              available.map((author) => (
                <AuthorItem
                  key={author.id}
                  id={author.id}
                  name={author.name}
                  onButtonClick={addAuthorToCourse}
                />
              ))
            )}
          </div>

          <div className="cc-authors__right">
            <h2 className="cc-subtitle">Course Authors</h2>
            {courseAuthors.length === 0 ? (
              <p className="cc-muted">Author list is empty</p>
            ) : (
              courseAuthors.map((author) => (
                <AuthorItem
                  key={author.id}
                  id={author.id}
                  name={author.name}
                  isCourseAuthor
                  onButtonClick={removeCourseAuthor}
                />
              ))
            )}
          </div>
        </div>

        <div className="cc-actions">
          <Button
            buttonText="CANCEL"
            type="button"
            onClick={handleCancel}
          />
          <Button
            buttonText="CREATE COURSE"
            type="button"
            onClick={onSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;

