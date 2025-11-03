

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
{/*
import { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';


type Author = Readonly<{
  id: string;
  name: string;
}>;


export type CreateCourseProps = Readonly<{
  initialTitle?: string;
  initialDescription?: string;
  initialDuration?: number; 
  initialAuthors?: ReadonlyArray<Author>;
  onSubmit?: (course: {
    title: string;
    description: string;
    duration: number;
    authors: ReadonlyArray<Author>;
  }) => void;
  onCancel?: () => void;
}>;

const formatDuration = (minutes: number): string => {
  const m = Math.max(0, Math.floor(Number.isFinite(minutes) ? minutes : 0));
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  if (hours <= 0) return `${mins}min`;
  return `${hours}h ${mins}min`;
};

const isNonEmpty = (s: string) => s.trim().length > 0;

const CreateCourse: React.FC<CreateCourseProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialDuration = 0,
  initialAuthors = [],
  onSubmit,
  onCancel,
}) => {
  
  const [title, setTitle] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialDescription);
  const [duration, setDuration] = useState<number>(initialDuration);

  const [availableAuthors, setAvailableAuthors] = useState<Author[]>(
    
    [...initialAuthors]
  );
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);

  const [newAuthorName, setNewAuthorName] = useState<string>('');

  const durationLabel = useMemo(() => formatDuration(duration), [duration]);

  const handleCreateAuthor = () => {
    const name = newAuthorName.trim();
    if (!isNonEmpty(name)) return;
    
    const exists = availableAuthors.some(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    ) || courseAuthors.some((a) => a.name.toLowerCase() === name.toLowerCase());

    if (!exists) {
      const created: Author = { id: uuid(), name };
      setAvailableAuthors((prev) => [...prev, created]);
    }
    setNewAuthorName('');
  };

  const handleAddAuthor = (author: Author) => {
    setAvailableAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setCourseAuthors((prev) => [...prev, author]);
  };

  const handleRemoveAuthor = (author: Author) => {
    setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setAvailableAuthors((prev) => [...prev, author]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      description: description.trim(),
      duration: Math.max(0, Number.isFinite(duration) ? Math.floor(duration) : 0),
      authors: [...courseAuthors],
    };

    
    if (!isNonEmpty(payload.title) || !isNonEmpty(payload.description) || payload.duration <= 0) {
      
      return;
    }

    onSubmit?.(payload);
  };

  const safeAvailable = availableAuthors ?? [];
  const safeSelected = courseAuthors ?? [];

  return (
    <form data-testid="create-course-form" onSubmit={handleSubmit} className="create-course">
      <h2>Create Course</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          data-testid="title-input"
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          data-testid="description-textarea"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </div>

      <div className="field">
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          id="duration"
          data-testid="duration-input"
          type="number"
          min={0}
          step={1}
          value={Number.isFinite(duration) ? duration : 0}
          onChange={(e) => setDuration(Number(e.target.value) || 0)}
        />
        <div data-testid="duration-output" aria-live="polite">
          Duration: <strong>{durationLabel}</strong>
        </div>
      </div>

      <div className="field">
        <label htmlFor="new-author">Add new author</label>
        <div className="row">
          <input
            id="new-author"
            data-testid="author-name-input"
            type="text"
            placeholder="Author name"
            value={newAuthorName}
            onChange={(e) => setNewAuthorName(e.target.value)}
          />
          <button
            type="button"
            data-testid="add-author-btn"
            onClick={handleCreateAuthor}
            disabled={!isNonEmpty(newAuthorName)}
          >
            Create author
          </button>
        </div>
      </div>

      <div className="authors">
        <div className="authors__column">
          <h3>Available authors</h3>
          <ul data-testid="available-authors">
            {safeAvailable.length === 0 && <li>No authors yet</li>}
            {safeAvailable.map((a) => (
              <li key={a.id}>
                <span>{a.name}</span>
                <button
                  type="button"
                  data-testid={`add-author-${a.id}`}
                  onClick={() => handleAddAuthor(a)}
                >
                  Add author
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="authors__column">
          <h3>Course authors</h3>
          <ul data-testid="course-authors">
            {safeSelected.length === 0 && <li>Author list is empty</li>}
            {safeSelected.map((a) => (
              <li key={a.id}>
                <span>{a.name}</span>
                <button
                  type="button"
                  data-testid={`remove-author-${a.id}`}
                  onClick={() => handleRemoveAuthor(a)}
                >
                  Delete author
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="actions">
        <button type="submit" data-testid="create-course-btn">
          Create course
        </button>
        <button
          type="button"
          data-testid="cancel-create-course-btn"
          onClick={() => onCancel?.()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCourse;*/}