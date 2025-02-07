import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import Loading from '../../components/students/Loading';
import { assets } from '../../assets/assets';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime } = useContext(AppContext);

  useEffect(() => {
    const fetchCourseData = () => {
      const findCourse = allCourses.find(course => course._id === id);
      setCourseData(findCourse || null);
    };
    fetchCourseData();
  }, [allCourses, id]);

  const calculateRating = (courseData) => {
    if (!courseData || !courseData.courseRatings?.length) return 0;
    const total = courseData.courseRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    return Number((total / courseData.courseRatings.length).toFixed(1));
  };

  if (!courseData) {
    return <Loading />;
  }

  return (
    <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 pt-16">
      <div className="absolute top-0 left-0 w-full h-80 bg-cyan-100/70 -z-10"></div>

      <div className="max-w-xl z-10">
        <h1 className="text-3xl font-semibold text-gray-800">{courseData.courseTitle}</h1>
        <p 
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription.slice(0, 200),
          }}
          className="mt-4 text-gray-700 leading-relaxed pt-4 md:text-base text-sm"
        ></p>

        <div className="rating mt-4 flex items-center gap-4">
          <span className="text-yellow-500">{calculateRating(courseData)}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.round(calculateRating(courseData)) ? assets.star : assets.star_blank}
                alt={`star-${i}`}
                className="w-5 h-5"
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            ({courseData?.courseRatings?.length || 0} Rating{courseData?.courseRatings?.length > 1 ? 's' : ''})
          </span>
          <span className="text-gray-700 text-sm">
            {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'Students' : 'Student'}
          </span>
        </div>

        <p className="mt-1 text-sm">
          Course by <span className="text-blue-600 underline">GreatStack</span>
        </p>

        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>          
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
