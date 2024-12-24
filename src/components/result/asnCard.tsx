import React from 'react'

export default function AnsCard({ question }: any) {
    const listAns = ['A', 'B', 'C', 'D']
    return (
        <div className={`bg-white my-4 px-6 py-12 rounded-xl ${question.isAnsCorrect ? 'border border-green-500' : 'border border-red-500'}`}>
            <h2 className="text-xl font-mono">{question.questionText}</h2>
            <ul className="flex gap-4 flex-wrap mt-4">
                {listAns.map((option: any, optionIndex: number) => {
                    const optionValue = `options_${option}`;
                    return (
                        <li key={optionIndex} className="w-[48%]">
                            <div className="w-full relative">
                                <span className={`customRadioLbl ${question.isCorrect === option.toLowerCase() ? '!bg-green-500' : ''} ${question.isSelected === option.toLowerCase() ? '!opacity-30 !border-4 border-green-900' : ''}`}>
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
