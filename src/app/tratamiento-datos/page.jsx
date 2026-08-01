// src/app/tratamiento-datos/page.jsx
import TratamientoDatos from '@/components/tratamiento_datos_personales/TratamientoDatos';

export const metadata = {
  title: 'Política de Tratamiento de Datos Personales | CPCI',
  description: 'Conoce nuestra política de tratamiento de datos personales conforme a la Ley 1581 de 2012',
};

export default function TratamientoDatosPage() {
  return <TratamientoDatos />;
}