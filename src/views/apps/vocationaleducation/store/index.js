// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import {
  apiGetAllVocationalEducation,
  apiGetVocationalEducationByID,
  apiUpdateVocationalEducation,
  apiDeleteVocationalEducation,
  apiAddVocationalEducation,
  getAllAppointments,
} from "../../../../services/api";
import {
  handleConfirmCancel,
  sort_appointments,
  sort_data,
} from "./sort_utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { toast } from "react-hot-toast";

export const getAllData = createAsyncThunk(
  "appVocEdu/getAllData",
  async (params) => {
    const response = { data: { data: params.data } };
    if (
      (response === null || response.data.data.length <= 0) &&
      params.q == ""
    ) {
      Object.assign(
        response,
        await apiGetAllVocationalEducation()
          .then((result) => {
            return result;
          })
          .catch(console.log("error obtener formacion profesional"))
      );
    }
    return response.data.data;
  }
);

export const getData = createAsyncThunk("appVocEdu/getData", async (params) => {
  const response = { data: { data: params.data } };
  if ((response === null || response.data.data.length <= 0) && params.q == "") {
    Object.assign(
      response,
      await apiGetAllVocationalEducation()
        .then((result) => {
          return result;
        })
        .catch(console.log("error obtener formacion profesional"))
    );
  }
  response.data.data = sort_data(params, response.data.data);
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total,
  };
});

export const getVocationalEducation = createAsyncThunk("appVocEdu/getVocationalEducation", async (id) => {
  const response = await apiGetVocationalEducationByID(id).then((result) => {
    return result;
  });
  return response.data;
});

/* GET ALL APPOINTMENTS */

export const getAppointments = createAsyncThunk(
  "appAppointments/getAppointments",
  async (params) => {
    const response = await getAllAppointments().then((result) => {
      return result;
    });
    console.log(response);
    response.data.vocationaleducations = sort_appointments(params, response.data.vocationaleducations);

    return response.data.vocationaleducations;
  }
);

export const updateVocationalEducation = createAsyncThunk(
  "appVocEdu/updateVocationalEducation",
  async (updatedVocationalEducation) => {
    await apiUpdateVocationalEducation(updatedVocationalEducation)
      .then((e) => toast.success("Datos Guardados"))
      .catch((e) => {
        console.log(e);
        toast.error("Error al editar");
      });
    return updatedVocationalEducation;
  }
);

export const addVocationalEducation = createAsyncThunk(
  "appVocEdu/addVocationalEducation",
  async (vocationaleducation, { dispatch, getState }) => {
    await apiAddVocationalEducation(vocationaleducation);
    const response = await apiGetAllVocationalEducation().then((result) => {
      return result.data.data;
    });
    return response;
  }
);

export const deleteVocationalEducation = createAsyncThunk(
  "appVocEdu/deleteVocationalEducation",
  async (id, { dispatch, getState }) => {
    (await handleConfirmCancel()) ? await apiDeleteVocationalEducation(id) : "";
    const response = await apiGetAllVocationalEducation().then((result) => {
      return result.data.data;
    });
    return response;
  }
);

export const appVocationalEducationsSlice = createSlice({
  name: "appVocEdu",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    appoitments: [],
    selectedVocationalEducation: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getVocationalEducation.fulfilled, (state, action) => {
        state.selectedVocationalEducation = action.payload;
      })
      .addCase(updateVocationalEducation.fulfilled, (state, action) => {
        state.selectedVocationalEducation = action.payload;
      })
      .addCase(addVocationalEducation.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(deleteVocationalEducation.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appoitments = action.payload;
      });
  },
});

export default appVocationalEducationsSlice.reducer;
