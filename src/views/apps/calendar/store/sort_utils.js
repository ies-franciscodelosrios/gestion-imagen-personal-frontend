export function findUser(student_dni, list){
    const result = {}; 
    list.forEach(user => {
        if (user.DNI === student_dni) {
            Object.assign(result, user);            
        }
    });
return result;
}