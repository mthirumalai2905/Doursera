import { createContext, useEffect } from "react";
import React, { useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

// Create a context
export const AppContext = createContext();

// Context provider component
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration)
      )
    );

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

// Function to calculate the number of lectures in the course
const calculateNoOfLectures = (course) => {
  let totalLectures = 0;
  course.courseContent.forEach((chapter) => {
    if (Array.isArray(chapter.chapterContent)) {
      totalLectures += chapter.chapterContent.length;
    }
  });
  return totalLectures;
};

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
