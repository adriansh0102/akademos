'use client'
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {Button} from "../ui/button";

interface FormValues {
  name: string;
  country: string;
}

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data:FormValues) => {
    console.log(data); // Aquí puedes manejar la lógica de envío del formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo de nombre */}
      <div>
        <label
          htmlFor="name-input"
          className="block text-sm font-medium text-gray-600"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name-input"
          placeholder="Ingresa tu nombre"
          {...register("name", { required: "Este campo es obligatorio" })}
          className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Campo de país (select) */}
      <div>
        <label
          htmlFor="country-select"
          className="block text-sm font-medium text-gray-600"
        >
          País
        </label>
        <select
          id="country-select"
          {...register("country", { required: "Debes seleccionar un país" })}
          className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
        >
          <option value="">Selecciona un país</option>
          <option value="MX">México</option>
          <option value="US">Estados Unidos</option>
          <option value="ES">España</option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Botón de envío */}
      <div>
        <Button          type="submit"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default MyForm;