// avSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Estado inicial: una lista de equipos audiovisuales con sus propiedades
const initialState = [
  {
    img: "https://pixabay.com/images/download/business-20031_640.jpg",
    name: "Projectors",
    cost: 200,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/speakers-4109274_640.jpg",
    name: "Speaker",
    cost: 35,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/public-speaking-3926344_640.jpg",
    name: "Microphones",
    cost: 45,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/whiteboard-2903269_640.png",
    name: "Whiteboards",
    cost: 80,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/signpost-235079_640.jpg",
    name: "Signage",
    cost: 80,
    quantity: 0,
  },
];

// Creamos el slice usando Redux Toolkit
export const avSlice = createSlice({
  name: "av", // nombre del slice
  initialState, // estado inicial definido arriba

  reducers: {
    // Incrementa la cantidad de un ítem según su índice
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) {
        item.quantity++;
      }
    },

    // Decrementa la cantidad de un ítem si es mayor que cero
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});

// Exportamos las acciones generadas automáticamente
export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

// Exportamos el reductor para que sea usado en el store
export default avSlice.reducer;
