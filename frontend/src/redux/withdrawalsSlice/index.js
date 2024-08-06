import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  withdrawals: [], // List of withdrawals
  status: 'idle',
  error: null,
};

const withdrawalSlice = createSlice({
  name: 'withdrawals',
  initialState,
  reducers: {
    fetchWithdrawalsSuccess: (state, action) => {
      state.withdrawals = action.payload;
      state.status = 'succeeded';
    },
    fetchWithdrawalsFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    addWithdrawalRequest: (state, action) => {
      state.withdrawals.push(action.payload);
    },
    updateWithdrawalStatus: (state, action) => {
      const { id, status } = action.payload;
      const withdrawal = state.withdrawals.find(w => w._id === id);
      if (withdrawal) {
        withdrawal.status = status;
      }
    },
  },
});

export const { fetchWithdrawalsSuccess, fetchWithdrawalsFailure, addWithdrawalRequest, updateWithdrawalStatus } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
