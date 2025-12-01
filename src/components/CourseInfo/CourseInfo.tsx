import React from 'react';

import type { Course, Author } from '../../constants';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants/uiText';

import getCourseDuration from '../../helpers/getCourseDuration';
import formatCreationDate from '../../helpers/formatCreationDate';
import resolveAuthorNames from '../../helpers/resolveAuthorNames';

import './courseInfo.css';

const DEFAULT_AUTHORS: Author[] = [
  { id: '2', name: 'name2' },
  { id: '3', name: 'name3' },
];

const DEFAULT_COURSE: Course = {
  id: 'id-1',
  title: 'Course 1',
  description: 'Course 1 description',
  creationDate: '01/01/2025',
  duration: 60,
  authors: ['2', '3'],
};

type Props = {
  course?: Course;
  authors?: Author[];
  onBack?: () => void;
};

const noop = () => {};

const CourseInfo: React.FC<Props> = ({ course, authors, onBack }) => {
  const c = course ?? DEFAULT_COURSE;
  const list = authors ?? DEFAULT_AUTHORS;

  const names = resolveAuthorNames(c.authors, list);

  return (
    <section className="course-info" aria-label="Course info">
      <Button buttonText={BUTTON_TEXT.BACK_TO_COURSES} onClick={onBack ?? noop} />

      <h2 className="course-info__title">{c.title}</h2>
      <p className="course-info__desc">{c.description}</p>

      <ul className="course-info__list">
        <li><strong>ID:</strong> {c.id}</li>
        <li><strong>Duration:</strong> {getCourseDuration(c.duration)}</li>
        <li><strong>Creation date:</strong> {formatCreationDate(c.creationDate)}</li>
        <li><strong>Authors:</strong> {names}</li>
      </ul>
    </section>
  );
};

export default CourseInfo;
