import React, { Suspense, memo } from 'react';
import { ICategory, IExam, IExamAssignment, IQuestion, ISubcategory } from '@/type';
import Skeleton from '../skeleton';
import { TbBrandCodecov, TbMessageCircleQuestion } from 'react-icons/tb';
import { RiGraduationCapLine } from 'react-icons/ri';
import { MdOutlineAssignment } from 'react-icons/md';

const AnimatedCount = React.lazy(() => import('../card/count'));

interface StatisticsProps {
  allCat: ICategory[],
  allQuestions: IQuestion[],
  allExam: IExam[],
  allSubCat: ISubcategory[],
  allAssignedExam: IExamAssignment[]
}

const Statistics = memo(({ allCat, allQuestions, allExam, allSubCat, allAssignedExam }: StatisticsProps) => {
  return (
    <div className="flex gap-6 flex-wrap">
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="category" Icon={<TbBrandCodecov />} total={allCat.length} link="/categories" />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="questionnaires" Icon={<TbMessageCircleQuestion />} total={allQuestions.length} link="/questionnaires" />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="Exams" Icon={<RiGraduationCapLine />} total={allExam.length} link="/exams" />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnimatedCount title="Assignments" Icon={<MdOutlineAssignment />} total={allAssignedExam?.length} link="/exams" />
      </Suspense>
    </div>
  );
});

export default Statistics;