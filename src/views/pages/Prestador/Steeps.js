// NATURAL
import NaturalPasoUno from "@views/Steeps/Prestador/Natural/PasoUno";
import NaturalPasoDos from "@views/Steeps/Prestador/Natural/PasoDos";
import NaturalPasoTres from "@views/Steeps/Prestador/Natural/PasoTres";
import NaturalPasoCuatro from "@views/Steeps/Prestador/Natural/PasoCuatro";
// JURIDICO
import JuridicoPasoUno from "@views/Steeps/Prestador/Juridico/PasoUno";
import JuridicoPasoDos from "@views/Steeps/Prestador/Juridico/PasoDos";
import JuridicoPasoTres from "@views/Steeps/Prestador/Juridico/PasoTres";
import JuridicoPasoCuatro from "@views/Steeps/Prestador/Juridico/PasoCuatro";

export const SteepNatural = [
  {
    id: 1,
    label: "Prestador de Servicios",
    description: ``,
    component: <NaturalPasoUno />,
  },
  {
    id: 2,
    label: "Actividad económica / Financiera",
    description: ``,
    component: <NaturalPasoDos />,
  },
  {
    id: 3,
    label: "Referencia / Facturas",
    description: ``,
    component: <NaturalPasoTres />,
  },
  {
    id: 4,
    label: "Documentos / Declaración",
    description: ``,
    component: <NaturalPasoCuatro />,
  },
];

export const SteepJuridico = [
  {
    id: 1,
    label: "Prestador de Servicios",
    description: ``,
    component: <JuridicoPasoUno />,
  },
  {
    id: 2,
    label: "Representante legal / Apoderado",
    description: ``,
    component: <JuridicoPasoDos />,
  },
  {
    id: 3,
    label: "Accionistas / Financiera",
    description: ``,
    component: <JuridicoPasoTres />,
  },
  {
    id: 4,
    label: "Documentos / Declaración",
    description: ``,
    component: <JuridicoPasoCuatro />,
  },
];
