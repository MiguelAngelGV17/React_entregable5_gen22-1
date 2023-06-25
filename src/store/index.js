import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from './slices/trainerName.slice'
import openPokeBall from  './slices/openPokeball.slice'
import loading from './slices/loading.slice'

export default configureStore({
    reducer:{
      nameTrainer,
      openPokeBall,
      loading
    }
})

