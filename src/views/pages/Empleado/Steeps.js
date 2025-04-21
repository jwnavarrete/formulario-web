import PasoUno from "@views/Steeps/Empleado/PasoUno";
import PasoDos from "@views/Steeps/Empleado/PasoDos";
import PasoTres from "@views/Steeps/Empleado/PasoTres";
import PasoCuatro from "@views/Steeps/Empleado/PasoCuatro";

export const SteepForm = [
  {
    id: 1,
    label: "Datos personales",
    description: ``,
    component: <PasoUno />,
  },
  {
    id: 2,
    label: "Formación / Varios",
    description: ``,
    component: <PasoDos />,
  },
  {
    id: 3,
    label: "Referencias / Financiera",
    description: ``,
    component: <PasoTres />,
  },
  {
    id: 4,
    label: "Documentos / Declaración",
    description: ``,
    component: <PasoCuatro />,
  },
];
