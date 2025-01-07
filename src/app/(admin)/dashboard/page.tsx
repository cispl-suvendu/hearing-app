import AssignmentsStatistics from "@/components/dashboard/AssignmentsStatistics";
import Statistics from "@/components/dashboard/statistics";
import { getAllData } from "@/lib/getAll";
import Filter from "@/components/dashboard/Filter";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton";

export default async function Dashboard() {
  const [allCat, allSubCat, allQuestions, allExam, allAssignedExam] = await Promise.all([
    getAllData({ pathName: 'category', tag: 'allCat', limit: 1000 }),
    getAllData({ pathName: 'subCategory', tag: 'allSubCat', limit: 1000 }),
    getAllData({ pathName: 'question', tag: 'allQuestion', limit: 1000 }),
    getAllData({ pathName: 'exam', tag: 'allExam', limit: 1000 }),
    getAllData({ pathName: 'examAssignment', tag: 'examAssignment', limit: 1000 })
  ]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/2">
        <Suspense fallback={<Skeleton />}><AssignmentsStatistics allAssignedExam={allAssignedExam?.data} /></Suspense>
      </div>
      <div className="md:w-1/2">
        <div className="mb-4">
          <Suspense fallback={<Skeleton />}><Filter allAssignedExam={allAssignedExam?.data} /></Suspense>
        </div>
        <Suspense fallback={<Skeleton />}><Statistics allCat={allCat?.data} allQuestions={allQuestions?.data} allExam={allExam?.data} allSubCat={allSubCat?.data} allAssignedExam={allAssignedExam?.data} /></Suspense>
      </div>
    </div>
  );
}
