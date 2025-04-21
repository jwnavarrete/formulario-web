import NaturalPasoUno from "@views/Steeps/Cliente/Natural/PasoUno";
import NaturalPasoDos from "@views/Steeps/Cliente/Natural/PasoDos";
import NaturalPasoTres from "@views/Steeps/Cliente/Natural/PasoTres";
import NaturalPasoCuatro from "@views/Steeps/Cliente/Natural/PasoCuatro";
import JuridicoPasoUno from "@views/Steeps/Cliente/Juridico/PasoUno";
import JuridicoPasoDos from "@views/Steeps/Cliente/Juridico/PasoDos";
import JuridicoPasoTres from "@views/Steeps/Cliente/Juridico/PasoTres";
import JuridicoPasoCuatro from "@views/Steeps/Cliente/Juridico/PasoCuatro";

export const SteepNatural = [
  {
    id: 1,
    label: "Solicitante / Generales",
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
    label: "Solicitante / Empresa",
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
    label: "Accionistas / Facturas",
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
