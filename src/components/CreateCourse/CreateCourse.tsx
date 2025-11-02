

import React, { useMemo, useState } from 'react';
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
  authors: Author[];
  onCreate: (course: Course) => void;
};

const CreateCourse: React.FC<Props> = ({ authors, onCreate }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<string>(''); 
  const [newAuthor, setNewAuthor] = useState('');

  const [available, setAvailable] = useState<Author[]>(authors);
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const durationNum = useMemo(() => Number(duration || 0), [duration]);
  const durationLabel = useMemo(() => toHHMM(durationNum), [durationNum]);

  const errors = {
    title: title.trim().length < 2 ? 'Title is required.' : '',
    description: description.trim().length < 2 ? 'Description is required.' : '',
    duration:
      duration.trim().length === 0
        ? 'Duration is required.'
        : durationNum <= 0
        ? 'Duration should be more than 0.'
        : '',
    newAuthor: newAuthor.trim().length > 0 && newAuthor.trim().length < 2 ? 'Name must be at least 2 characters.' : '',
  };

  const showError = (name: keyof typeof errors) => touched[name] && errors[name];

  const handleCreateAuthor = () => {
    setTouched((t) => ({ ...t, newAuthor: true }));
    const name = newAuthor.trim();
    if (name.length < 2) return;
    const a: Author = { id: uid(), name };
    setAvailable((list) => [...list, a]);
    setNewAuthor('');
  };

  const addAuthorToCourse = (a: Author) => {
    setAvailable((list) => list.filter((x) => x.id !== a.id));
    setCourseAuthors((list) => [...list, a]);
  };

  const removeCourseAuthor = (a: Author) => {
    setCourseAuthors((list) => list.filter((x) => x.id !== a.id));
    setAvailable((list) => [...list, a]);
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
      authors: courseAuthors.map((a) => a.id),
    };
    onCreate(course);
    setTitle(''); setDescription(''); setDuration(''); setCourseAuthors([]);
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
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              aria-invalid={!!showError('title')}
            />
            {showError('title') && <div className="cc-error">Title is required.</div>}
          </label>

          <label className="cc-label">
            <span className="cc-label__text">Description</span>
            <textarea
              className={`cc-textarea ${showError('description') ? 'is-invalid' : ''}`}
              placeholder="Input text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, description: true }))}
              aria-invalid={!!showError('description')}
              rows={6}
            />
            {showError('description') && <div className="cc-error">Description is required.</div>}
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
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, '');
                  setDuration(onlyDigits);
                }}
                onBlur={() => setTouched((t) => ({ ...t, duration: true }))}
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
                  onChange={(e) => setNewAuthor(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, newAuthor: true }))}
                />
                {showError('newAuthor') && <div className="cc-error">Name must be at least 2 characters.</div>}
              </label>
              <Button buttonText="CREATE AUTHOR" onClick={handleCreateAuthor} />
            </div>

            <h3 className="cc-mini">Authors List</h3>
            {available.length === 0 ? (
              <p className="cc-muted">No authors available</p>
            ) : (
              available.map((a) => (
                <AuthorItem
                  key={a.id}
                  name={a.name}
                  variant="add"
                  onAdd={() => addAuthorToCourse(a)}
                />
              ))
            )}
          </div>

          <div className="cc-authors__right">
            <h2 className="cc-subtitle">Course Authors</h2>
            {courseAuthors.length === 0 ? (
              <p className="cc-muted">Author list is empty</p>
            ) : (
              courseAuthors.map((a) => (
                <AuthorItem
                  key={a.id}
                  name={a.name}
                  variant="remove"
                  onRemove={() => removeCourseAuthor(a)}
                />
              ))
            )}
          </div>
        </div>


        <div className="cc-actions">
          <Button buttonText="CANCEL" onClick={() => globalThis.history.back()} />
          <Button buttonText="CREATE COURSE" onClick={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;
