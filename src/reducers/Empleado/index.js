// action - state management
import * as actionTypes from "./constant";

export const initialState = {
  steeps: [],
  activeStep: 0,
  completed: {},
  totalSteps: 0,
  allComplete: true,
  prestador: {
    tieneConyugue: false,
    esProveedor: false,
    tieneRuc: false,
  },
  infFinanciera: {
    otrosIngresos: false,
  },
  referencias: {
    esReferido: true,
  },
  esPeeps: false,
  pagoImpRenta: false,
  incluyeReferencia: false,
  documentos: {
    copiaCedulaConyugue: false,
  },
  form_estado: "NUEVO",
  hash: null,
  firma: 'N',
  aprobacion: 'N',
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
const EmpleadoFormularioReducer = (state = initialState, action) => {
  const isLastStep = () => {
    return state.activeStep === state.totalSteps - 1;
  };

  const completedSteps = () => {
    return Object.keys(state.completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === state.totalSteps;
  };

  switch (action.type) {
    case actionTypes.SET_STEEPS:
      return {
        ...state,
        steeps: action.payload.steeps,
        totalSteps: action.payload.totalSteps,
      };
    case actionTypes.ACTICE_STEEP:
      return {
        ...state,
        activeStep: action.steep,
      };
    case actionTypes.COMPLETED:
      return {
        ...state,
        completed: action.newCompleted,
        allComplete: allStepsCompleted(),
      };
    case actionTypes.SET_EST_EMPLEADO:
      return {
        ...state,
        prestador: action.prestador,
      };
    case actionTypes.SET_PEEPS:
      return {
        ...state,
        esPeeps: action.esPeeps,
      };
    case actionTypes.SET_PAGO_IMP_RENTAS:
      return {
        ...state,
        pagoImpRenta: action.pagoImpRenta,
      };
    case actionTypes.INCLUYE_REFERENCIAS:
      return {
        ...state,
        incluyeReferencia: action.incluyeReferencia,
      };
    case actionTypes.SET_DOCUMENTOS:
      return {
        ...state,
        documentos: action.documentos,
      };
    case actionTypes.SET_DOCUMENTO_ESPECIFICO:
      return {
        ...state,
        documentos: { ...state.documentos, [action.documento]: action.valor },
      };
    case actionTypes.FORM_ESTADO:
      return {
        ...state,
        form_estado: action.form_estado,
      };
    case actionTypes.SET_HASH:
      return {
        ...state,
        hash: action.hash,
      };
    case actionTypes.SET_CURRENT_STEEP:
      return {
        ...state,
        completed: action.payload.completed,
        activeStep: action.payload.activeStep,
      };
    case actionTypes.NEXT_STEEP:
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? state.steeps.findIndex((step, i) => !(i in state.completed))
          : state.activeStep + 1;
      //
      return {
        ...state,
        activeStep: newActiveStep,
      };
    case actionTypes.SET_OTROS_INGRESOS_INFO_FINANCIERA:
      return {
        ...state,
        infFinanciera: { otrosIngresos: action.otrosIngresos },
      };
    case actionTypes.SET_REFERENCIAS:
      return {
        ...state,
        referencias: action.referencias,
      };
    case actionTypes.SET_FIRMA:
      return {
        ...state,
        firma: action.firma,
      };
    case actionTypes.SET_APROBACION:
      return {
        ...state,
        aprobacion: action.aprobacion,
      };
    default:
      return state;
  }
};

export default EmpleadoFormularioReducer;
