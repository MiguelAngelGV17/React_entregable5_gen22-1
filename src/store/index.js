import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from './slices/trainerName.slice'
import openPokeBall from  './slices/openPokeball.slice'

export default configureStore({
    reducer:{
      nameTrainer,
      openPokeBall
    }
})

