import AssignmentsStatistics from "@/components/dashboard/AssignmentsStatistics";
import Statistics from "@/components/dashboard/statistics";
import { getAllData } from "@/lib/getAll";
import Filter from "@/components/dashboard/Filter";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton";

export default async function Dashboard() {
  const dashboardData = await getAllData({pathName:'dashboard'})
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/2">
        <Suspense fallback={<Skeleton />}><AssignmentsStatistics lastCompletedExam={dashboardData?.data.recentCompletedAssinment} /></Suspense>
      </div>
      <div className="md:w-1/2">
        <div className="mb-4">
          <Suspense fallback={<Skeleton />}><Filter allAssignedExam={dashboardData?.data} /></Suspense>
        </div>
        <Suspense fallback={<Skeleton />}><Statistics allCat={dashboardData?.data.totalCategory} allQuestions={dashboardData?.data.totalQuestion} allExam={dashboardData?.data.totalExam} allSubCat={dashboardData?.data.totalSubCategory} allAssignedExam={dashboardData?.data.totalAssigment} /></Suspense>
      </div>
    </div>
  );
}
