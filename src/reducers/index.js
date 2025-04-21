import { combineReducers } from "redux";
import customizationReducer from "./customization";
// CLIENTES
import formularioNaturalReducer from "./Cliente/formularioNatural";
import formularioJuridicoReducer from "./Cliente/formularioJuridico";
// PRESTADORES
import PrestadorFormularioNaturalReducer from "./Prestador/formularioNatural";
import PrestadorFormularioJuridicoReducer from "./Prestador/formularioJuridico";
import EmpleadoFormularioReducer from "./Empleado";

const reducer = combineReducers({
  customization: customizationReducer,
  formNatural: formularioNaturalReducer,
  formJuridico: formularioJuridicoReducer,
  PrestadorFormNatural: PrestadorFormularioNaturalReducer,
  PrestadorFormJuridico: PrestadorFormularioJuridicoReducer,
  EmpleadoForm: EmpleadoFormularioReducer,
  
});

export default reducer;