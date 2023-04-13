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
    const filteredList = response.data.data.filter(obj => {
      // Crear una expresión regular con la cadena de búsqueda
      const regex = new RegExp(params.q, "i");
      // Buscar la cadena de búsqueda en todas las propiedades del objeto
      return Object.values(obj).some(value => regex.test(String(value)));
    });
    response.data.data = filteredList;
  }


  /**
   * Sort asc or desc by column clicked
   */
  if (params.sort == 'asc') {
    switch (params.sortColumn) {
      case 'id':
        response.data.data.sort(compareById);
      case 'name':
        response.data.data.sort(compareByName);
      case 'dni':
        response.data.data.sort(compareByDNI);
      case 'email':
        response.data.data.sort(compareByEmail);
      case 'birth_date':
        response.data.data.sort(compareByBirthDate);
      case 'phone':
        response.data.data.sort(compareByPhone);
      default:
        response.data.data;
    }
  } else if (params.sort == 'desc') {
    switch (params.sortColumn) {
      case 'id':
        response.data.data.sort(descompareById);
      case 'name':
        response.data.data.sort(descompareByName);
      case 'dni':
        response.data.data.sort(descompareByDNI);
      case 'email':
        response.data.data.sort(descompareByEmail);
      case 'birth_date':
        response.data.data.sort(descompareByBirthDate);
      case 'phone':
        response.data.data.sort(descompareByPhone);
      default:
        response.data.data;
    }
  }

  response.data.total = response.data.data.length;

  response.data.data = paginateArray(response.data.data, params.page, params.perPage);

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
  if (a.dni < b.dni) {
    return -1;
  }
  if (a.dni > b.dni) {
    return 1;
  }
  return 0;
}
function descompareByDNI(a, b) {
  if (b.dni < a.dni) {
    return -1;
  }
  if (b.dni > a.dni) {
    return 1;
  }
  return 0;
}

//----------------------------------------------------------------------
// Ordenar por Nombre
//----------------------------------------------------------------------
function compareByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
function descompareByName(a, b) {
  if (b.name < a.name) {
    return -1;
  }
  if (b.name > a.name) {
    return 1;
  }
  return 0;
}

//----------------------------------------------------------------------
// Ordenar por Apellido
//----------------------------------------------------------------------
function compareBySurname(a, b) {
  if (a.surname < b.surname) {
    return -1;
  }
  if (a.surname > b.surname) {
    return 1;
  }
  return 0;
}

function descompareBySurname(a, b) {
  if (b.surname < a.surname) {
    return -1;
  }
  if (b.surname > a.surname) {
    return 1;
  }
  return 0;
}

//----------------------------------------------------------------------
// Ordenar por Fecha de Nacimiento
//----------------------------------------------------------------------
function compareByBirthDate(a, b) {
  const dateA = new Date(a.birth_date);
  const dateB = new Date(b.birth_date);
  return dateA - dateB;
}
function descompareByBirthDate(a, b) {
  const dateA = new Date(a.birth_date);
  const dateB = new Date(b.birth_date);
  return dateB - dateA;
}

//----------------------------------------------------------------------
// Ordenar por Teléfono
//----------------------------------------------------------------------
function compareByPhone(a, b) {
  return a.phone - b.phone;
}
function descompareByPhone(a, b) {
  return b.phone - a.phone;
}

//----------------------------------------------------------------------
// Ordenar por Email
//----------------------------------------------------------------------
function compareByEmail(a, b) {
  if (a.email < b.email) {
    return -1;
  }
  if (a.email > b.email) {
    return 1;
  }
  return 0;
}
function descompareByEmail(a, b) {
  if (b.email < a.email) {
    return -1;
  }
  if (b.email > a.email) {
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