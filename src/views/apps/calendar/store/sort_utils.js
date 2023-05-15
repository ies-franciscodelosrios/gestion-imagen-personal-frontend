export function findUser(student_dni, list){
    const result = {}; 
    list.forEach(user => {
        if (user.dni === student_dni) {
            Object.assign(result, user);            
        }
    });
return result;
}