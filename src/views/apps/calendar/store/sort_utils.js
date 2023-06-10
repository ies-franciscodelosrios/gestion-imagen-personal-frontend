export function findUser(student_dni, list) {
    return list.find((user) => user.dni === student_dni);
  }