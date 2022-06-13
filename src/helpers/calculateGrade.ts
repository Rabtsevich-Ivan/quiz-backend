export const calculateGrade = (grade: number) => {
  if (grade === 1) {
    return 'perfect';
  } else if (grade >= 0.75) {
    return 'good';
  } else if (grade > 0.25) {
    return 'average';
  } else {
    return 'bad';
  }
};
