// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import {
  getAllStudentsData,
  apiGetUserById,
  updateUserBy,
  ApiDelUser,
  AddStudent,
  getAllAppointments,
  updateUserAvatarApi,
} from "../../../../services/api";
import {
  handleConfirmCancel,
  sort_appointments,
  sort_data,
} from "./sort_utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { toast } from "react-hot-toast";

export const getAllData = createAsyncThunk(
  "appUsers/getAllData",
  async (params) => {
    const response = { data: { data: params.data } };
    if (
      (response === null || response.data.data.length <= 0) &&
      params.q == ""
    ) {
      Object.assign(
        response,
        await getAllStudentsData()
          .then((result) => {
            return result;
          })
          .catch(console.log("error obtener estudiantes"))
      );
    }
    return response.data.data;
  }
);

export const getData = createAsyncThunk("appUsers/getData", async (params) => {
  const response = { data: { data: params.data } };
  if ((response === null || response.data.data.length <= 0) && params.q == "") {
    Object.assign(
      response,
      await getAllStudentsData()
        .then((result) => {
          return result;
        })
        .catch(console.log("error obtener estudiantes"))
    );
  }
  response.data.data = sort_data(params, response.data.data);
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total,
  };
});

export const getUser = createAsyncThunk("appUsers/getUser", async (id) => {
  const response = await apiGetUserById(id).then((result) => {
    return result;
  });
  return response.data.data;
});

/* GET ALL APPOINTMENTS */

export const getAppointments = createAsyncThunk(
  "appAppointments/getAppointments",
  async (params) => {
    const response = await getAllAppointments().then((result) => {
      return result;
    });
    console.log(response);
    response.data.users = sort_appointments(params, response.data.users);

    return response.data.users;
  }
);

export const updateUserAvatar = createAsyncThunk(
  "appUsers/updateUserAvatar",
  async (avatar) => {
    let response;
    console.log("esto marcha, men");
    await updateUserAvatarApi(avatar)
    .then(e => {
      response = e.data
      toast.success("Avatar actualizado")
    })
    .catch(e => toast.error("Error al actualizar Avatar"))
    return response
  }
);

export const updateUser = createAsyncThunk(
  "appUsers/updateUser",
  async (updatedUser) => {
    await updateUserBy(updatedUser)
      .then((e) => toast.success("Datos Guardados"))
      .catch((e) => {
        console.log(e);
        toast.error("Error al editar");
      });
    return updatedUser;
  }
);

export const addUser = createAsyncThunk(
  "appUsers/addUser",
  async (user, { dispatch, getState }) => {
    await AddStudent(user);
    const response = await getAllStudentsData().then((result) => {
      return result.data.data;
    });
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "appUsers/deleteUser",
  async (id, { dispatch, getState }) => {
    (await handleConfirmCancel()) ? await ApiDelUser(id) : "";
    const response = await getAllStudentsData().then((result) => {
      return result.data.data;
    });
    return response;
  }
);

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    appoitments: [],
    selectedUser: null,
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appoitments = action.payload;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        console.log(state);
        console.log(action.payload);
        const payload = action.payload;
        state.selectedUser = {...state.selectedUser, image: payload.url}
      });
  },
});

export default appUsersSlice.reducer;
