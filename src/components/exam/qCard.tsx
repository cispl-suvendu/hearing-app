import React, { useMemo } from 'react'

export default function QCard({ question, formik, index, shuffleArray }: any) {
  const listAns = useMemo(() => shuffleArray(['A', 'B', 'C', 'D']), [question._id]); 
  
  return (
        <div className="bg-white my-2 px-6 py-12 rounded-xl">
            <h2 className="text-xl font-mono">{question.questionText}</h2>
            <ul className="flex gap-4 flex-wrap mt-4">
              {listAns.map((option:any, optionIndex:number) => {
                const optionValue = `options_${option}`;
                return (
                  <li key={optionIndex} className="w-[48%]">
                    <div className="w-full relative">
                      <input
                        type="radio"
                        name={`answer[${index}].correctAns`}
                        value={option.toLowerCase()}
                        onChange={formik.handleChange}
                        checked={
                          formik.values.answer[index]?.correctAns === option.toLowerCase()
                        }
                        className="customRadio"
                      />
                      <span className="customRadioLbl">
                        {optionIndex + 1}. {question[optionValue]}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
    )
}
