'use client'
import React, { useEffect } from 'react'
import AnimatedCount from '../card/count'
import { TbBrandCodecov } from "react-icons/tb";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { RiGraduationCapLine } from "react-icons/ri";
import { ICategory, IExam, IQuestion, ISubcategory } from '@/type';
export const dynamic = "force-dynamic";

interface StatisticsProps {
  allCat: ICategory[],
  allQuestions: IQuestion[],
  allExam: IExam[],
  allSubCat: ISubcategory[]
}

export default function Statistics({ allCat, allQuestions, allExam, allSubCat }: StatisticsProps) {
  return (
    <div className="flex gap-6 flex-wrap">
      <AnimatedCount title="category" Icon={<TbBrandCodecov />} total={allCat.length} link="/categories" />
      <AnimatedCount title="questionnaires" Icon={<TbMessageCircleQuestion />} total={allQuestions.length} link="/questionnaires" />
      <AnimatedCount title="Exams" Icon={<RiGraduationCapLine />} total={allExam.length} link="/exams" />
    </div>
  )
}
