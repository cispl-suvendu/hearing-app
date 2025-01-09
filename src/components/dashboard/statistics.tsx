import React, { Suspense, memo } from 'react';
import Skeleton from '../skeleton';
import { TbBrandCodecov, TbMessageCircleQuestion } from 'react-icons/tb';
import { RiGraduationCapLine } from 'react-icons/ri';
import { MdOutlineAssignment } from 'react-icons/md';

const AnimatedCount = React.lazy(() => import('../card/count'));

interface StatisticsProps {
  allCat: number,
  allQuestions: number,
  allExam: number,
  allSubCat: number,
  allAssignedExam: number
}

const Statistics = memo(({ allCat, allQuestions, allExam, allSubCat, allAssignedExam }: StatisticsProps) => {
  return (
    <div className="flex gap-6 flex-wrap flex-col md:flex-row">
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="category" Icon={<TbBrandCodecov />} total={allCat} link="/categories" />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="questionnaires" Icon={<TbMessageCircleQuestion />} total={allQuestions} link="/questionnaires" />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="Exams" Icon={<RiGraduationCapLine />} total={allExam} link="/exams" />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="Assignments" Icon={<MdOutlineAssignment />} total={allAssignedExam} link="/exams" />
      </Suspense>
    </div>
  );
});

export default Statistics;