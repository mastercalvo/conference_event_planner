// Importamos createSlice desde Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Creamos el slice llamado "meals"
export const mealSlice = createSlice({
  name: "meals", // nombre del slice
  initialState: [
    {
      img: "https://cdn.pixabay.com/photo/2017/04/04/18/35/salad-2202483_1280.jpg",
      name: "Vegetarian Meal",
      cost: 10,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png",
      name: "Non-Vegetarian Meal",
      cost: 15,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2015/04/08/13/13/bread-712251_1280.jpg",
      name: "Gluten-Free Meal",
      cost: 12,
      quantity: 0,
    },
  ],

  // Reducers para aumentar o disminuir la cantidad de comidas
  reducers: {
    incrementMealQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) {
        item.quantity++;
      }
    },
    decrementMealQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});

// Exportamos las acciones para usarlas en ConferenceEvent.jsx
export const { incrementMealQuantity, decrementMealQuantity } = mealSlice.actions;

// Exportamos el reducer para conectarlo al store
export default mealSlice.reducer;
