import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  const discountedPrice = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2);

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => window.scrollTo(0, 0)}
      className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="course-card">
        <img
          className="w-full aspect-[16/9] object-cover"
          src={course.courseThumbnail}
          alt={course.courseTitle}
        />
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{course.courseTitle}</h3>
          <p className="text-gray-600 text-sm">Thirumalai</p>

          <div className="rating mt-2 flex items-center gap-2">
            <p className="text-yellow-500">{calculateRating(course)}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                  alt={`star-${i}`}
                  className="w-5 h-5"
                />
              ))}
            </div>
            <p className="text-gray-500 text-xs">{course.courseRatings.length}</p>
          </div>

          <p className="text-lg font-bold text-gray-900 mt-3">
            {currency} {discountedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
