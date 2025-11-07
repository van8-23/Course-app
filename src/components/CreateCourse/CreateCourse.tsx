
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import type { Author, Course } from '../../constants';
import './createCourse.css';

const uid = () => crypto.randomUUID?.() ?? `id_${Math.random().toString(36).slice(2)}`;
const today = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();

  return `${dd}.${mm}.${yyyy}`;
};

const toHHMM = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
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
  const baseAuthors = useMemo<Author[]>(() => authors ?? [], [authors]);
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

  const durationNum = useMemo(() => Number(duration || 0), [duration]);
  const durationLabel = useMemo(() => toHHMM(durationNum), [durationNum]);

  const errors = {

     title:
      title.trim().length < 2 ? 'Title is required and should be at least 2 characters' : '',
    description:
      description.trim().length < 2
        ? 'Description is required and should be at least 2 characters'
        : '',
    duration:
      duration.trim().length === 0
        ? 'Duration is required.'
        : durationNum <= 0
        ? 'Duration should be more than 0.'
        : '',
    newAuthor:
      newAuthor.trim().length > 0 && newAuthor.trim().length < 2
        ? 'Author name should be at least 2 characters'
        : '',
  } as const;
  const showError = (name: keyof typeof errors) => touched[name] && errors[name];

  const handleCreateAuthor = () => {
    setTouched((prev) => ({ ...prev, newAuthor: true }));
    const name = newAuthor.trim();
    if (name.length < 2) return;
    const author: Author = { id: uid(), name };
    setAvailable((list) => [...list, author]);
    setNewAuthor('');
    setTouched((prev) => ({ ...prev, newAuthor: false }));
  };

    const addAuthorToCourse = (author: Author) => {
    setAvailable((list) => list.filter((item) => item.id !== author.id));
    setCourseAuthors((list) => [...list, author]);
  };


    const removeCourseAuthor = (author: Author) => {
    setCourseAuthors((list) => list.filter((item) => item.id !== author.id));
    setAvailable((list) => [...list, author]);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDuration('');
    setNewAuthor('');
    setCourseAuthors([]);
    setAvailable((prev) => mergeAuthors(baseAuthors, prev, courseAuthors));
    setTouched({});
  };

  const onSubmit = () => {
    setTouched({ title: true, description: true, duration: true, newAuthor: !!newAuthor.trim() });
    if (errors.title || errors.description || errors.duration) return;

    const course: Course = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      creationDate: today(),
      duration: durationNum,
      authors: courseAuthors.map((author) => author.id),
    };

    onCreate(course);
    resetForm();
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
              onChange={(event) => setTitle(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
              aria-invalid={!!showError('title')}
            />
            {showError('title') && <div className="cc-error">{errors.title}</div>}
          </label>

          <label className="cc-label">
            <span className="cc-label__text">Description</span>
            <textarea
              className={`cc-textarea ${showError('description') ? 'is-invalid' : ''}`}
              placeholder="Input text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
              aria-invalid={!!showError('description')}
              rows={6}
            />
            {showError('description') && (
              <div className="cc-error">
                Description is required and should be at least 2 characters
              </div>
            )}
          </label>
        </div>

        <div className="cc-section">
          <h2 className="cc-subtitle">Duration</h2>
          <div className="cc-row">
            <label className="cc-label" style={{ flex: 1 }}>
              <span className="cc-label__text">Duration</span>
              <input
                className={`cc-input ${showError('duration') ? 'is-invalid' : ''}`}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Input text"
                value={duration}

                  onChange={(event) => {
                  const digitsOnly = event.target.value.replace(/\D/g, '');
                  setDuration(digitsOnly);
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, duration: true }))}
                aria-invalid={!!showError('duration')}
              />
              {showError('duration') && <div className="cc-error">{errors.duration}</div>}
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
                  className={`cc-input ${showError('newAuthor') ? 'is-invalid' : ''}`}
                  type="text"
                  placeholder="Input text"
                  value={newAuthor}
                  onChange={(event) => {
                    setNewAuthor(event.target.value);
                    setTouched((prev) => ({ ...prev, newAuthor: false }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, newAuthor: true }))}
                />
                {showError('newAuthor') && (
                  <div className="cc-error">Author name should be at least 2 characters</div>
                )}
              </label>
              <Button buttonText="CREATE AUTHOR" onClick={handleCreateAuthor} type="button" />
            </div>

            <h3 className="cc-mini">Authors List</h3>
            {available.length === 0 ? (
              <p className="cc-muted">No authors available</p>
            ) : (
              available.map((author) => (

                 <AuthorItem
                  key={author.id}
                  name={author.name}
                  variant="add"
                  onAdd={() => addAuthorToCourse(author)}
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
                  name={author.name}
                  variant="remove"
                  onRemove={() => removeCourseAuthor(author)}
                />
                ))
            )}
          </div>
        </div>


        <div className="cc-actions">
          <Button
            buttonText="CANCEL"
            onClick={() => {
              resetForm();
              if (onCancel) {
                onCancel();
              } else {
                globalThis.history?.back?.();
              }
            }}
            type="button"
          />
          <Button buttonText="CREATE COURSE" onClick={onSubmit} type="button" />
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;

