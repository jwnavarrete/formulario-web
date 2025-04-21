import NaturalPasoUno from '@modules/Beneficiario/Components/Steeps/Natural/1_steep'
import NaturalPasoDos from '@modules/Beneficiario/Components/Steeps/Natural/2_steep'
import NaturalPasoTres from '@modules/Beneficiario/Components/Steeps/Natural/3_steep'
import NaturalPasoCuatro from '@modules/Beneficiario/Components/Steeps/Natural/4_steep'

import JuridicoPasoUno from "@modules/Beneficiario/Components/Steeps/Juridico/1_steep";
import JuridicoPasoDos from "@modules/Beneficiario/Components/Steeps/Juridico/2_steep";
import JuridicoPasoTres from "@modules/Beneficiario/Components/Steeps/Juridico/3_steep";

export const SteepNatural = [
  {
    id: 1,
    label: 'Información del Beneficiario',
    description: ``,
    component: <NaturalPasoUno />,
  },
  {
    id: 2,
    label: 'Datos de actividad laboral',
    description: ``,
    component: <NaturalPasoDos />,
  },
  {
    id: 3,
    label: 'Informacion Financiera',
    description: ``,
    component: <NaturalPasoTres />,
  },
  {
    id: 4,
    label: 'Documentos Obligatorios',
    description: ``,
    component: <NaturalPasoCuatro />,
  },
]

export const SteepJuridico = [
  {
    id: 1,
    label: "Información del Beneficiario",
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
    label: "Documentos / Declaración",
    description: ``,
    component: <JuridicoPasoTres />,
  },
];
