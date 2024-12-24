import React, { useState, memo, useEffect } from 'react';
import QCard from './qCard';

interface Question {
  _id: string;
  questionText: string;
  options_A: string;
  options_B: string;
  options_C: string;
  options_D: string;
  [key: string]: string; // Allow dynamic key access
}

interface ListQuestionProps {
  allQuestion: Question[];
  formik: any;
  shuffleArray: (array: any) => any;
}

function ListQuestion({ allQuestion, formik, shuffleArray }: ListQuestionProps) {


  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < allQuestion.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const navigationEntries = performance.getEntriesByType('navigation');
  //     if (navigationEntries.length > 0) {
  //       const navigationType = (navigationEntries[0] as PerformanceNavigationTiming).type;
  //       if (navigationType === 'reload') {
  //         console.info('Page reloaded, submitting form...');
  //         formik.handleSubmit();
  //       } else {
  //         console.info('Page was not reloaded');
  //       }
  //     }
  //   }
  // }, []); // Dependency array ensures this runs only once
  
  

  return (
    <div>
      <div className="bg-white text-grayText inline-block px-4 py-2 rounded-md">
        Showing <strong className="font-bold">{currentIndex + 1}</strong> of {allQuestion.length}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <QCard question={allQuestion[currentIndex]} index={currentIndex} formik={formik} shuffleArray={shuffleArray} />
        {currentIndex + 1 === allQuestion.length && (
          <div className="mt-6">
            <button type='submit' className="btnPrimary w-full">Submit</button>
          </div>
        )}
      </form>
      <div className="mt-4 p-4 flex justify-between">
        <div>
          {currentIndex !== 0 && (
            <button className="btnClose" onClick={handlePrevious}>
              Previous
            </button>
          )}
        </div>
        <div>
          {currentIndex + 1 !== allQuestion.length && (
            <button className="btnClose" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ListQuestion);
