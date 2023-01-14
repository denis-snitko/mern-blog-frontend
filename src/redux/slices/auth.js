import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/me");
      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response.data);
    }
  }
);
export const fetchLogin = createAsyncThunk("auth/fetchLogin",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });

export const fetchRegister = createAsyncThunk("auth/fetchRegister",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/register", params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });

const initialState = {
  data: null,
  status: "loading",
  errors: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.errors = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.errors = null;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state, action) => {
      state.errors = action.payload;
      state.status = "error";
    },
    
    [fetchLogin.pending]: (state) => {
      state.errors = null;
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.errors = null;
      state.status = "loaded";
    },
    [fetchLogin.rejected]: (state, action) => {
      state.errors = action.payload;
      state.status = "error";
    },
    
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    }
  }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const userData = (state) => state.auth.data;
export const loginErrors = (state) => state.auth.errors;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
