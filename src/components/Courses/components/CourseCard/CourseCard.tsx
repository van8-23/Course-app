

import React from 'react';

import Button from '../../../../common/Button/Button';
import IconButton from '../../../../common/IconButton/IconButton';

import type { Course, Author } from '../../../../constants';
import { BUTTON_TEXT } from '../../../../constants/uiText';

import getCourseDuration from '../../../../helpers/getCourseDuration';
import formatCreationDate from '../../../../helpers/formatCreationDate';
import resolveAuthorNames from '../../../../helpers/resolveAuthorNames';

import EditIcon from '../../../../assets/icons/Icon-Edit.svg';
import TrashIcon from '../../../../assets/icons/Icon-Trash.svg';

import './courseCard.css';


const DEFAULT_AUTHORS: Author[] = [
  { id: '2', name: 'name2' },
  { id: '3', name: 'name3' },
];

const DEFAULT_COURSE: Course = {
  id: 'id-1',
  title: 'Course Title',
  description: 'Course Description',
  creationDate: '01/01/2025',
  duration: 60,
  authors: ['2', '3'],
};

type Props = {
  course?: Course;
  allAuthors?: Author[];
  onShow?: (id: string) => void;
};

const noop = () => {};

const CourseCard: React.FC<Props> = ({ course, allAuthors, onShow }) => {
  const c = course ?? DEFAULT_COURSE;
  const list = allAuthors ?? DEFAULT_AUTHORS;

  const authorNames = resolveAuthorNames(c.authors, list);

  return (
    <article className="c-card" data-testid="course-card">
      <div className="c-card__left">
        <h3 className="c-card__title">{c.title}</h3>
        <p className="c-card__desc">{c.description}</p>
      </div>

      <div className="c-card__right">
        <dl className="c-card__meta">
          <div className="c-card__row">
            <dt>Authors:</dt>
            <dd className="c-card__authors" title={authorNames}>{authorNames}</dd>
          </div>
          <div className="c-card__row">
            <dt>Duration:</dt>
            <dd>{getCourseDuration(c.duration)}</dd>
          </div>
          <div className="c-card__row">
            <dt>Created:</dt>
            <dd>{formatCreationDate(c.creationDate)}</dd>
          </div>
        </dl>
      </div>

      <div className="c-card__actions">
        <div className="c-card__actions-right">
          <Button
            buttonText={BUTTON_TEXT.SHOW_COURSE}
            onClick={() => (onShow ?? noop)(c.id)}
            className="c-card__show"
          />
          <IconButton icon={TrashIcon} alt="Delete course" aria-label="Delete course" />
          <IconButton icon={EditIcon} alt="Edit course" aria-label="Edit course" />
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
