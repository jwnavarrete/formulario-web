import * as actionTypes from "./constant";

export const setSteeps = (steeps) => {
  const totalSteps = steeps.length;
  return {
    type: actionTypes.SET_STEEPS,
    payload: { steeps: steeps, totalSteps: totalSteps },
  };
};

export const setActiveStep = (steep) => {
  return { type: actionTypes.ACTICE_STEEP, steep: steep };
};

export const setCompleted = (newCompleted) => {
  return { type: actionTypes.COMPLETED, newCompleted: newCompleted };
};

export const setAllSteepsCompleted = (allComplete) => {
  return { type: actionTypes.ALL_STEEPS_COMPLETE, allComplete: allComplete };
};

export const setPeep = (esPeeps) => {
  return { type: actionTypes.SET_PEEPS, esPeeps: esPeeps };
};

export const setPagoImpRentas = (pagoImpRenta) => {
  return { type: actionTypes.SET_PAGO_IMP_RENTAS, pagoImpRenta: pagoImpRenta };
};

export const setIncluyeReferencia = (incluyeReferencia) => {
  return {
    type: actionTypes.INCLUYE_REFERENCIAS,
    incluyeReferencia: incluyeReferencia,
  };
};

export const setPrestador = (prestador) => {
  return {
    type: actionTypes.SET_EST_PRESTADOR,
    prestador: {
      ...prestador,
    },
  };
};

export const setDocumentos = (documentos) => {
  return {
    type: actionTypes.SET_DOCUMENTOS,
    documentos: {
      ...documentos,
    },
  };
};

export const setFormStado = (form_estado) => {
  return { type: actionTypes.FORM_ESTADO, form_estado: form_estado };
};

export const setHash = (hash) => {
  return {
    type: actionTypes.SET_HASH,
    hash: hash,
  };
};

export const setActiveStepForm = (lastSteep) => {
  const completed = {};
  // RECORREMOS EL ULTIMO STEEP Y SETEAMOS COMO COMPLETADOS LOS SPEETS
  for (let steep = 0; steep < lastSteep; steep++) {
    completed[steep] = true;
  }
  return {
    type: actionTypes.SET_CURRENT_STEEP,
    payload: {
      completed: completed,
      activeStep: lastSteep,
    },
  };
};

export const handleNext = () => {
  return { type: actionTypes.NEXT_STEEP };
};

export const setOtrosIngresosInfo = (otrosIngresos) => {
  return {
    type: actionTypes.SET_OTROS_INGRESOS_INFO_FINANCIERA,
    otrosIngresos: otrosIngresos,
  };
};


export const setReferencia = (referencias) => {
  return {
    type: actionTypes.SET_REFERENCIAS,
    referencias: {
      ...referencias,
    },
  };
};

export const setDocumentoEspecifico = (documento, valor) => {
  return {
    type: actionTypes.SET_DOCUMENTO_ESPECIFICO,
    documento: { documento, valor },
  };
};

export const setFirma = (firma) => {
  return {
    type: actionTypes.SET_FIRMA,
    firma: firma,
  };
};

export const setAprobacion = (aprobacion) => {
  return {
    type: actionTypes.SET_APROBACION,
    aprobacion: aprobacion,
  };
};

export const setGranContrib = (isGranContrib) =>{
  return{
    type:actionTypes.SET_GRAN_CONTRIB,
    isGranContrib:isGranContrib
  }
}