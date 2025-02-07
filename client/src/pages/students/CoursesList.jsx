import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import SearchBar from '../../components/students/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/students/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/students/Footer';

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses?.length) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourses.filter(item =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col items-center justify-between w-full mb-6">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500">
              <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
                Home
              </span>{' '}
              / <span>Course List</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <SearchBar data={input} />
          </div>
        </div>

        {/* Search Input and Reset */}
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="clear search"
              className="cursor-pointer"
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        {/* Course Cards Section */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => <CourseCard key={index} course={course} />)
          ) : (
            <p className="text-gray-600 text-lg mt-4">No courses found matching "{input}"</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesList;
