import Statistics from "@/components/dashboard/statistics";
export const dynamic = "force-dynamic";
import { getAllData } from "@/lib/getAll";

export default async function Dashboard() {
  const { data: allCat } = await getAllData({ pathName: 'category', tag: 'allCat', limit: 1000 })
  const {data: allSubCat} = await getAllData({pathName:'subCategory', tag:'allSubCat', limit: 1000 })
  const { data: allQuestions } = await getAllData({ pathName: 'question', tag: 'allQuestion', limit: 1000 })
  const { data: allExam } = await getAllData({ pathName: 'exam', tag: 'allExam', limit: 1000 })
  return (
    <div>
      <Statistics allCat={allCat} allQuestions={allQuestions} allExam={allExam} allSubCat={allSubCat} />
    </div>
  );
}
