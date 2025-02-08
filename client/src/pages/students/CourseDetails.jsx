import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import Loading from '../../components/students/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/students/Footer';
import YouTube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses, calculateChapterTime, currency } = useContext(AppContext);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

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

  const calculateCourseDuration = (courseData) => {
    if (!courseData?.courseContent) return '0 min';
    const totalDuration = courseData.courseContent.reduce(
      (sum, chapter) =>
        sum + chapter.chapterContent.reduce((acc, lecture) => acc + lecture.lectureDuration, 0),
      0
    );
    return humanizeDuration(totalDuration * 60 * 1000, { units: ['h', 'm'] });
  };

  const calculateNoOfLectures = (courseData) => {
    if (!courseData?.courseContent) return 0;
    return courseData.courseContent.reduce(
      (sum, chapter) => sum + chapter.chapterContent.length,
      0
    );
  };

  if (!courseData) {
    return <Loading />;
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row gap-8 justify-between px-8 md:px-32 pt-16">
        <div className="absolute top-0 left-0 w-full h-80 bg-teal-100/70 -z-10"></div>

        {/* Left Column */}
        <div className="max-w-xl z-10">
          <h1 className="text-3xl font-bold text-gray-800">{courseData.courseTitle}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
            className="mt-4 text-gray-700 leading-relaxed"
          ></p>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-yellow-500 text-lg">{calculateRating(courseData)}</span>
            <div className="flex gap-1">
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

          <div className="mt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="mt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border rounded mb-2">
                  <div onClick={() => toggleSection(index)} className="flex justify-between px-4 py-3 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium">{chapter.chapterTitle}</p>
                    </div>
                    <p>
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div className={`overflow-hidden transition-all ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="list-disc pl-6 pr-4 py-2 text-gray-600 border-t">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img className="w-4 h-4 mt-1" src={assets.play_icon} alt="play-icon" />
                          <div className="flex justify-between w-full text-gray-800">
                            <p>{lecture.lectureTitle}</p>
                            <div className="text-sm flex gap-2">
                              {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                                videoId: lecture.lectureUrl.split('/').pop()
                              })} className="text-blue-500 cursor-pointer">Preview</p>}
                              <p>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ['h', 'm'],
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-12">
            <h3 className="text-xl font-semibold">Course Description</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.replace(/\n/g, '<br/>'),
              }}
              className="mt-3 leading-relaxed text-gray-700"
            ></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-fit bg-white shadow-lg rounded overflow-hidden">
          {playerData ? (
            <YouTube 
              videoId={playerData.videoId} 
              opts={{ 
                playerVars: { autoplay: 1 },
                width: '100%',
                height: '100%'
              }} 
              className="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="Course thumbnail" className="w-full" />
          )}
          
          <div className="bg-gray-100 p-5">
            <div className="flex items-center gap-2">
              <img className="w-5" src={assets.time_left_clock_icon} alt="time-left clock icon" />
              <p className="text-red-500">
                <span className="font-medium">5 Days</span> left at this price!
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">{currency}{courseData.coursePrice}</p>
              <p className="md:text-lg text-gray-500">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star_icon" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="clock_icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>

            <div className="mt-6">
              <p className="text-gray-800 font-medium">What's in the course?</p>
              <ul className="mt-2 list-disc pl-4">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Detailed problem-solving practice.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;