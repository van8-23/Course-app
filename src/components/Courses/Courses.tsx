import { useMemo, useState } from 'react';
import type { Course, Author } from '../../constants';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

import EmptyCourseList from '../EmptyCourseList/EmptyCourseList'; 
import './courses.css';

type Props = {
  courses: Course[];
  authors: Author[];
  onShow: (id: string) => void;
};

const Courses: React.FC<Props> = ({ courses, authors, onShow }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (s === '') return courses;
    return courses.filter(
      (c) => c.title.toLowerCase().includes(s) || c.id.toLowerCase().includes(s)
    );
  }, [query, courses]);

  
  if (courses.length === 0) {
    return <EmptyCourseList />;
  }

  return (
    <section className="courses" aria-label="Courses">
      <h1 className="h1" style={{ marginBottom: 8 }}>Courses</h1>

      {/* Toolbar: search + add new (same row, small gap) */}
      <div className="courses__toolbar"  aria-label="Course actions">
        <SearchBar
          value={query}
          onChange={(v) => setQuery(v)}
          onSearch={() => {/* optional: trigger search analytics */}}
          onClear={() => setQuery('')}
        />

        <Button
          buttonText="ADD NEW COURSE"
          variant="primary"
          onClick={() => navigate('/create-course')}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p style={{ marginTop: 12 }}>No courses found</p>
      ) : (
        <div className="courses__grid" aria-live="polite">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              allAuthors={authors}
              onShow={onShow}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Courses;

