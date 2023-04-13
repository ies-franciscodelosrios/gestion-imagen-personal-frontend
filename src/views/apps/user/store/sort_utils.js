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
      case 'dni':
        return response.sort(compareBydni);
      case 'email':
        return response.sort(compareByEmail);
      case 'cycle':
        return response.sort(compareByCycle);
      default:
        return response;
    }
  } else if (params.sort == 'desc') {
    switch (params.sortColumn) {
      case 'id':
        return response.sort(descompareById);
      case 'Name':
        return response.sort(descompareByName);
      case 'dni':
        return response.sort(descompareBydni);
      case 'email':
        return response.sort(descompareByEmail);
      case 'cycle':
        return response.sort(descompareByCycle);
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
// Ordenar por dni
//----------------------------------------------------------------------
function compareBydni(a, b) {
  if (a.dni < b.dni) {
    return -1;
  }
  if (a.dni > b.dni) {
    return 1;
  }
  return 0;
}
function descompareBydni(a, b) {
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
function compareByCycle(a, b) {
  if (a.cycle < b.cycle) {
    return -1;
  }
  if (a.cycle > b.cycle) {
    return 1;
  }
  return 0;
}
function descompareByCycle(a, b) {
  if (b.cycle < a.cycle) {
    return -1;
  }
  if (b.cycle > a.cycle) {
    return 1;
  }
  return 0;
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