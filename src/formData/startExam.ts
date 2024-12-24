export const startExamInitialValues = (allQuestion: any) => {
  return {
    answer: allQuestion.map((q: any) => ({ questionId: q._id, correctAns: '' }))
  }
};

export interface startExamType {
  answer: {
    questionId: string;
    correctAns: string;
  }[];
}


