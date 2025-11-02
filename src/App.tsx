
import { useMemo, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import { mockedCoursesList, mockedAuthorsList, type Course, type Author } from './constants';
import './App.css';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [authors] = useState<Author[]>(mockedAuthorsList);
  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuth(true);
    navigate('/courses');
  };

  const handleLogout = () => {
    setIsAuth(false);
    navigate('/login');
  };

  const handleCreateCourse = (newCourse: Course) => {
    setCourses(prev => [...prev, newCourse]);
    navigate('/courses');
  };

  
  const CourseInfoPage: React.FC = () => {
    const { id } = useParams();
    const course = useMemo(() => courses.find(c => c.id === id) ?? null, [courses, id]);
    if (!course) return <Navigate to="/courses" replace />;
    return (
      <CourseInfo
        course={course}
        authors={authors}
        onBack={() => navigate('/courses')}
      />
    );
  };

  return (
    <>
      
      <Header isAuth={isAuth} onLogout={handleLogout} />

      <main className="container" style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/courses" />} />

          
          <Route
            path="/courses"
            element={
              <Courses
                courses={courses}
                authors={authors}
                onShow={(id) => navigate(`/courses/${id}`)}
              />
            }
          />

          
          <Route path="/courses/:id" element={<CourseInfoPage />} />

          
          <Route
            path="/create-course"
            element={<CreateCourse authors={authors} onCreate={handleCreateCourse} />}
          />

      
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        
          <Route path="*" element={<Navigate to="/courses" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
