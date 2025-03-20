"use client"

import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"
import {Button} from "@/components/ui/button"

interface FormValues {
  tipoEntidad: string
  codigo: string
  nombre: string
  siglas: string
  subordinadoA: string
  telefono: string
  provincia: string
  municipio: string
  direccion: string
  direccionElectronica: string
  activo: boolean
}

const FormularioEntidad: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data) // Aquí puedes manejar la lógica de envío del formulario
  }

  return (
    <div className="container mx-auto py-8 px-4">
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Crear entidad</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tipo de entidad */}
          <div>
            <label htmlFor="tipoEntidad" className="block text-sm font-medium text-gray-600">
              Tipo de entidad: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="tipoEntidad"
                {...register("tipoEntidad", { required: "Este campo es obligatorio" })}
                className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702] appearance-none"
              >
                <option value="">-Seleccione-</option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
                <option value="tipo3">Tipo 3</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-2">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            {errors.tipoEntidad && <p className="text-red-500 text-sm mt-1">{errors.tipoEntidad.message}</p>}
          </div>

          {/* Código */}
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-600">
              Código: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="codigo"
              {...register("codigo", { required: "Este campo es obligatorio" })}
              className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
            />
            {errors.codigo && <p className="text-red-500 text-sm mt-1">{errors.codigo.message}</p>}
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
              Nombre: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              {...register("nombre", { required: "Este campo es obligatorio" })}
              className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Siglas */}
          <div>
            <label htmlFor="siglas" className="block text-sm font-medium text-gray-600">
              Siglas: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="siglas"
              {...register("siglas", { required: "Este campo es obligatorio" })}
              className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
            />
            {errors.siglas && <p className="text-red-500 text-sm mt-1">{errors.siglas.message}</p>}
          </div>

          {/* Subordinado a */}
          <div>
            <label htmlFor="subordinadoA" className="block text-sm font-medium text-gray-600">
              Subordinado a:
            </label>
            <div className="relative">
              <select
                id="subordinadoA"
                {...register("subordinadoA")}
                className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702] appearance-none"
              >
                <option value="">-Seleccione-</option>
                <option value="sub1">Subordinado 1</option>
                <option value="sub2">Subordinado 2</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-2">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-600">
              Teléfono: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="telefono"
              {...register("telefono", { required: "Este campo es obligatorio" })}
              className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
          </div>

          {/* Provincia */}
          <div>
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-600">
              Provincia: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="provincia"
                {...register("provincia", { required: "Este campo es obligatorio" })}
                className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702] appearance-none"
              >
                <option value="">-Seleccione-</option>
                <option value="prov1">Provincia 1</option>
                <option value="prov2">Provincia 2</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-2">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            {errors.provincia && <p className="text-red-500 text-sm mt-1">{errors.provincia.message}</p>}
          </div>

          {/* Municipio */}
          <div>
            <label htmlFor="municipio" className="block text-sm font-medium text-gray-600">
              Municipio: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="municipio"
                {...register("municipio", { required: "Este campo es obligatorio" })}
                className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702] appearance-none"
              >
                <option value="">-Seleccione-</option>
                <option value="mun1">Municipio 1</option>
                <option value="mun2">Municipio 2</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-2">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            {errors.municipio && <p className="text-red-500 text-sm mt-1">{errors.municipio.message}</p>}
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-600">
              Dirección: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="direccion"
              {...register("direccion", { required: "Este campo es obligatorio" })}
              className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
            />
            {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>}
          </div>
        </div>

        {/* Dirección electrónica */}
        <div>
          <label htmlFor="direccionElectronica" className="block text-sm font-medium text-gray-600">
            Dirección electrónica: <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="direccionElectronica"
            {...register("direccionElectronica", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Dirección de correo electrónico inválida",
              },
            })}
            className="mt-2 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] focus:border-[#cd8702]"
          />
          {errors.direccionElectronica && (
            <p className="text-red-500 text-sm mt-1">{errors.direccionElectronica.message}</p>
          )}
        </div>

        {/* Activo */}
        <div className="flex items-center space-x-2">
          <Checkbox id="activo" {...register("activo")} />
          <label htmlFor="activo" className="text-sm font-medium text-gray-600 cursor-pointer">
            Activo
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="submit" className="bg-[#cd8702] hover:bg-[#b67700] text-white">
            Aceptar
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="border-gray-300 text-gray-700"
            onClick={() => console.log("Cancelar")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default FormularioEntidad

