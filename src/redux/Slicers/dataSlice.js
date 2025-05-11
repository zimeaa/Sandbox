import { createSlice } from '@reduxjs/toolkit';

    const dataSlice = createSlice({
        name: 'data',
        initialState: {
          items: [
            {
              id: 1,
              title: 'Card 1',
              description: 'This is the first card.',
              order: 0,
            },
            {
              id: 2,
              title: 'Card 2',
              description: 'This is the second card.',
              order: 1,
            },
            {
              id: 3,
              title: 'Card 3',
              description: 'This is the third card.',
              order: 2,
            },
          ],
        },
        reducers: {
          updateData: (state, action) => {
            state.items = action.payload; // Update items with the payload
          },
        },
      });

export const { updateData } = dataSlice.actions;
export default dataSlice.reducer;