export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades'
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc'
}

interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const studentsCopy: Student[] = [...students];

  const averageOfGrade = (grades: number[]): number => {
    return grades
      .reduce((sum: number, value: number) => sum + value, 0) / grades.length;
  };

  switch (sortBy) {
    case SortType.Name:
    case SortType.Surname:
      studentsCopy.sort((a: Student, b: Student) => {
        return order === SortOrder.Ascending
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);
      });
      break;

    case SortType.Age:
      studentsCopy.sort((a: Student, b: Student) => {
        return order === SortOrder.Ascending
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      });
      break;

    case SortType.AverageGrade:
      studentsCopy.sort((a: Student, b: Student) => {
        return order === SortOrder.Ascending
          ? averageOfGrade(a[sortBy]) - averageOfGrade(b[sortBy])
          : averageOfGrade(b[sortBy]) - averageOfGrade(a[sortBy]);
      });
      break;

    case SortType.Married:
      studentsCopy.sort((a: Student, b: Student) => {
        if (a[sortBy] === b[sortBy]) {
          return 0;
        }

        if (order === SortOrder.Ascending) {
          return a[sortBy] ? 1 : -1;
        }

        return a[sortBy] ? -1 : 1;
      });
      break;

    default:
      break;
  }

  return studentsCopy;
}
