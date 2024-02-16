// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API Imports
import {
  apiGetAllProfessors,
  apiGetUserById,
  updateUserBy,
  ApiDelUser,
  AddProfesor,
  getAllAppointments,
} from "../../../../services/api";

// ** Sort utils Imports
import {
  handleConfirmCancel,
  sort_appointments,
  sort_data,
} from "./sort_utils";

// ** Toasts Imports
import { toast } from "react-hot-toast";

/* GET ALL PROFESSORS */

export const getAllProfessors = createAsyncThunk(
  "appProfessors/getAllProfessors",
  async (params) => {
    const response = { data: { data: params.data } };
    if (
      (response === null || response.data.data.length <= 0) &&
      params.q == ""
    ) {
      Object.assign(
        response,
        await apiGetAllProfessors().then((result) => {
          return result;
        })
      );
    }
    response.data.data = sort_data(params, response.data.data);
    return {
      params,
      data: response.data.data,
      totalPages: response.data.total,
    };
  }
);

/* GET PROFESOR BY ID */

export const getProfessorById = createAsyncThunk(
  "appProfessors/getProfessorById",
  async (id, thunkAPI) => {
    const response = await apiGetUserById(id)
      .then((result) => {
        return result.data.data;
      })
      .catch((result) => {
        return thunkAPI.rejectWithValue(result.response.data);
      });
    return response;
  }
);

/* GET VOCATIONALEDUCATION BY ID */

export const getVocationalEducationById = createAsyncThunk(
  "appProfessors/getVocationalEducationById",
  async (id, thunkAPI) => {
    const response = await apiGetVocationalEducationById(id)
      .then((result) => {
        return result.data.data;
      })
      .catch((result) => {
        return thunkAPI.rejectWithValue(result.response.data);
      });
    return response;
  }
);

/* GET ALL APPOINTMENTS */

export const getAppointments = createAsyncThunk(
  "appAppointments/getAppointments",
  async (params) => {
    const response = await getAllAppointments().then((result) => {
      return result;
    });
    response.data.data = sort_appointments(params, response.data.data);
    return response.data.data;
  }
);

/* */

/* ADD PROFESOR */
export const addProfesor = createAsyncThunk(
  "appProfessors/addUserProfesor",
  async (user, { dispatch, getState }) => {
    await AddProfesor(user);
    const response = await apiGetAllProfessors().then((result) => {
      return result.data.data;
    });
    return response;
  }
);
/* UPDATE PROFESOR */
export const updateProfesor = createAsyncThunk(
  "appProfessors/updateUser",
  async (updatedUser) => {
    await updateUserBy(updatedUser)
      .then((e) => toast.success("Datos Guardados"))
      .catch((e) => toast.error("Error al editar"));
    return updatedUser;
  }
);
/* DELETE PROFESOR BY ID */

export const deleteProfesor = createAsyncThunk(
  "appProfessors/deleteUser",
  async (id, { dispatch, getState }) => {
    (await handleConfirmCancel()) ? await ApiDelUser(id) : "";
    const response = await apiGetAllProfessors().then((result) => {
      return result.data.data;
    });
    return response;
  }
);

export const appProfesorsSlice = createSlice({
  name: "appProfessors",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    appoitments: [],
    selectedProfesor: null,
    status: "",
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProfessors.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getProfessorById.fulfilled, (state, action) => {
        state.status = 1;
        state.selectedProfesor = action.payload;
      })
      .addCase(getProfessorById.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateProfesor.fulfilled, (state, action) => {
        state.selectedProfesor = action.payload;
      })
      .addCase(addProfesor.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(deleteProfesor.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appoitments = action.payload;
      });
  },
});
export default appProfesorsSlice.reducer;
