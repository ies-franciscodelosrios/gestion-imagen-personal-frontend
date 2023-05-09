import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  if (params.q !== null || params.q !== '') {
    const filteredList = response.data.users.filter(obj => {
      // Crear una expresión regular con la cadena de búsqueda
      const regex = new RegExp(params.q, "i");
      // Buscar la cadena de búsqueda en todas las propiedades del objeto
      return Object.values(obj).some(value => regex.test(String(value)));
    });
    response.data.users = filteredList;
  }


  /**
   * Sort asc or desc by column clicked
   */
  if (params.sort == 'asc') {
    switch (params.sortColumn) {
      case 'id':
        response.data.users.sort(compareById);
      case 'Name':
        response.data.users.sort(compareByName);
      case 'DNI':
        response.data.users.sort(compareByDNI);
      case 'Email':
        response.data.users.sort(compareByEmail);
      case 'Birth_Date':
        response.data.users.sort(compareByBirthDate);
      case 'Phone':
        response.data.users.sort(compareByPhone);
      default:
        response.data.users;
    }
  } else if (params.sort == 'desc') {
    switch (params.sortColumn) {
      case 'id':
        response.data.users.sort(descompareById);
      case 'Name':
        response.data.users.sort(descompareByName);
      case 'DNI':
        response.data.users.sort(descompareByDNI);
      case 'Email':
        response.data.users.sort(descompareByEmail);
      case 'Birth_Date':
        response.data.users.sort(descompareByBirthDate);
      case 'Phone':
        response.data.users.sort(descompareByPhone);
      default:
        response.data.users;
    }
  }

  response.data.total = response.data.users.length;

  response.data.users = paginateArray(response.data.users, params.page, params.perPage);

  return response;
}


//----------------------------------------------------------------------
// Pagination
//----------------------------------------------------------------------
function paginateArray(array, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
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


const MySwal = withReactContent(Swal)

// ** Renders Role Columns
export async function handleConfirmCancel() {
  return MySwal.fire({
    title: 'Estas seguro?',
    text: " ¡Los cambios no serán revertibles!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, bórralo!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ms-1'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.value) {
      MySwal.fire({
        icon: 'success',
        title: 'Exitoso!',
        text: 'Los datos han sido borrados.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
      return result.isConfirmed;
    } else {
      
      return result.isConfirmed;
    }
  })
}