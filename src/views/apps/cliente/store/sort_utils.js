/**
 * Function to sort and filter the client list
 * @param {*} params to filter and sort the client list
 * @param {*} response list of clients to sort and filter
 * @returns return a client list filtered and sorted
 */
export function sort_data(params, response) {
  /**
   * Filter the list to match the param required
   */
  if (params.q !== null ) {
    console.log('filter');
    const filteredList = response.filter(obj => {
      // Crear una expresión regular con la cadena de búsqueda
      const regex = new RegExp(params.q, "i");
      // Buscar la cadena de búsqueda en todas las propiedades del objeto
      return Object.values(obj).some(value => regex.test(String(value)));
    });
    response = filteredList;
  }

  /**
   * Sort asc or desc by column clicked
   */
  if (params.sort == 'asc') {
    switch (params.sortColumn) {
      case 'id':
        return response.sort(compareById);
      case 'Name':
        return response.sort(compareByName);
      case 'DNI':
        return response.sort(compareByDNI);
      case 'Email':
        return response.sort(compareByEmail);
      case 'Birth_Date':
        return response.sort(compareByBirthDate);
      case 'Phone':
        return response.sort(compareByPhone);
      default:
        return response;
    }
  } else if (params.sort == 'desc') {
    switch (params.sortColumn) {
      case 'id':
        return response.sort(descompareById);
      case 'Name':
        return response.sort(descompareByName);
      case 'DNI':
        return response.sort(descompareByDNI);
      case 'Email':
        return response.sort(descompareByEmail);
      case 'Birth_Date':
        return response.sort(descompareByBirthDate);
      case 'Phone':
        return response.sort(descompareByPhone);
      default:
        return response;
    }
  }
}

//----------------------------------------------------------------------
// Ordenar por ID
//----------------------------------------------------------------------
function compareById(a, b) {
  return a.id - b.id;
}
function descompareById(a, b) {
  return b.id - a.id;
}
//----------------------------------------------------------------------
// Ordenar por DNI
//----------------------------------------------------------------------
function compareByDNI(a, b) {
  if (a.DNI < b.DNI) {
    return -1;
  }
  if (a.DNI > b.DNI) {
    return 1;
  }
  return 0;
}
function descompareByDNI(a, b) {
  if (b.DNI < a.DNI) {
    return -1;
  }
  if (b.DNI > a.DNI) {
    return 1;
  }
  return 0;
}

//----------------------------------------------------------------------
// Ordenar por Nombre
//----------------------------------------------------------------------
function compareByName(a, b) {
  if (a.Name < b.Name) {
    return -1;
  }
  if (a.Name > b.Name) {
    return 1;
  }
  return 0;
}
function descompareByName(a, b) {
  if (b.Name < a.Name) {
    return -1;
  }
  if (b.Name > a.Name) {
    return 1;
  }
  return 0;
}

//----------------------------------------------------------------------
// Ordenar por Apellido
//----------------------------------------------------------------------
function compareBySurname(a, b) {
  if (a.Surname < b.Surname) {
    return -1;
  }
  if (a.Surname > b.Surname) {
    return 1;
  }
  return 0;
}

function descompareBySurname(a, b) {
  if (b.Surname < a.Surname) {
    return -1;
  }
  if (b.Surname > a.Surname) {
    return 1;
  }
  return 0;
}

//----------------------------------------------------------------------
// Ordenar por Fecha de Nacimiento
//----------------------------------------------------------------------
function compareByBirthDate(a, b) {
  const dateA = new Date(a.Birth_Date);
  const dateB = new Date(b.Birth_Date);
  return dateA - dateB;
}
function descompareByBirthDate(a, b) {
  const dateA = new Date(a.Birth_Date);
  const dateB = new Date(b.Birth_Date);
  return dateB - dateA;
}

//----------------------------------------------------------------------
// Ordenar por Teléfono
//----------------------------------------------------------------------
function compareByPhone(a, b) {
  return a.Phone - b.Phone;
}
function descompareByPhone(a, b) {
  return b.Phone - a.Phone;
}

//----------------------------------------------------------------------
// Ordenar por Email
//----------------------------------------------------------------------
function compareByEmail(a, b) {
  if (a.Email < b.Email) {
    return -1;
  }
  if (a.Email > b.Email) {
    return 1;
  }
  return 0;
}
function descompareByEmail(a, b) {
  if (b.Email < a.Email) {
    return -1;
  }
  if (b.Email > a.Email) {
    return 1;
  }
  return 0;
}
