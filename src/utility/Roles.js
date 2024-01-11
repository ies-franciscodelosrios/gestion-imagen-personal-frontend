export const getNameRol = (id) => {
    switch (id) {
        case 0:
            return 'Administrador';
        case 1:
            return 'Profesor';
        case 2:
            return 'Alumno';
        default:    
            return 'Sin rol';
    }
}