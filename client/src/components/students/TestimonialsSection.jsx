import React from 'react';
import { dummyTestimonial } from '../../assets/assets';

const Testimonials = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800 text-center">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3 text-center">
        Hear from our learners as they share their journeys of transformations, success, and how our
        platform has made a difference in their lives.
      </p>
      <div className=" cursor-pointer mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dummyTestimonial.concat(dummyTestimonial.slice(0, 1)).map((testimonial, index) => (
          <div
            key={index}
            className="relative group flex flex-col items-center text-center p-4 border rounded-lg shadow-md"
          >
            {/* Square Feedback Div */}
            <div className="absolute hidden group-hover:flex bg-gray-100 border border-gray-300 w-40 h-40 p-4 rounded-md shadow-lg -top-44 left-1/2 -translate-x-1/2 text-sm text-gray-700 items-center justify-center">
              <span>{testimonial.feedback}</span>
            </div>

            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <div>
              <h1 className="text-xl font-semibold">{testimonial.name}</h1>
              <p className="text-gray-500">{testimonial.role}</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
