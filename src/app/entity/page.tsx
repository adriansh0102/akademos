"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FileText, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DetallesEntidadModal from "./detalles-entidad-modal"

interface Entidad {
  id: number
  nombre: string
  tipo: string
}

interface EntidadDetalle {
  id: number
  tipoEntidad: string
  codigo: string
  nombre: string
  siglas: string
  subordinadoA?: string
  provincia: string
  municipio: string
  direccion: string
  direccionElectronica: string
  telefono: string
  activo: boolean
}

// Base de datos simulada con más entidades
const ENTIDADES_DB: Entidad[] = [
  { id: 1, nombre: "Academia de las Fuerzas Armadas Revolucionarias General Máximo Gómez", tipo: "CES" },
  { id: 2, nombre: "Academia Militar Vasililevky", tipo: "CES" },
  { id: 3, nombre: "Academia Naval Granma", tipo: "CES" },
  { id: 4, nombre: "ACINOX COMERCIAL", tipo: "Empresa" },
  { id: 5, nombre: "Aduana General de la República", tipo: "Empresa" },
  { id: 6, nombre: "Agencia Cubana de Noticias", tipo: "Empresa" },
  { id: 7, nombre: "Banco Central de Cuba", tipo: "Empresa" },
  { id: 8, nombre: "Centro de Estudios Martianos", tipo: "CES" },
  { id: 9, nombre: "Centro Nacional de Sanidad Agropecuaria", tipo: "CES" },
  { id: 10, nombre: "Corporación CIMEX", tipo: "Empresa" },
  { id: 11, nombre: "Dirección de Identificación, Inmigración y Extranjería", tipo: "Empresa" },
  { id: 12, nombre: "Empresa de Telecomunicaciones de Cuba", tipo: "Empresa" },
  { id: 13, nombre: "Escuela Nacional de Salud Pública", tipo: "CES" },
  { id: 14, nombre: "Fábrica de Cigarros La Corona", tipo: "Empresa" },
  { id: 15, nombre: "Grupo Empresarial CUBANACAN", tipo: "Empresa" },
  // Simulamos que hay muchas más entidades para la paginación
]

// Detalles simulados para la entidad con ID 1
const ENTIDAD_DETALLE: EntidadDetalle = {
  id: 1,
  tipoEntidad: "CES",
  codigo: "259",
  nombre: "Academia de las Fuerzas Armadas Revolucionarias General Máximo Gómez",
  siglas: "AFAR",
  subordinadoA: "",
  provincia: "La Habana",
  municipio: "Playa",
  direccion: "S/N",
  direccionElectronica: "afar@afar.cu",
  telefono: "00",
  activo: true,
}

const ListadoEntidades: React.FC = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("5")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filteredEntidades, setFilteredEntidades] = useState<Entidad[]>([])
  const [displayedEntidades, setDisplayedEntidades] = useState<Entidad[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEntidad, setSelectedEntidad] = useState<EntidadDetalle | null>(null)

  // Filtrar entidades basado en el término de búsqueda
  useEffect(() => {
    const filtered = ENTIDADES_DB.filter((entidad) => entidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

    // Ordenar las entidades
    const sorted = [...filtered].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.nombre.localeCompare(b.nombre)
      } else {
        return b.nombre.localeCompare(a.nombre)
      }
    })

    setFilteredEntidades(sorted)
  }, [searchTerm, sortDirection])

  // Actualizar entidades mostradas basado en la paginación
  useEffect(() => {
    const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
    const endIndex = startIndex + Number.parseInt(itemsPerPage)
    setDisplayedEntidades(filteredEntidades.slice(startIndex, endIndex))
  }, [filteredEntidades, currentPage, itemsPerPage])

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredEntidades.length / Number.parseInt(itemsPerPage))

  // Manejar la búsqueda
  const handleSearch = () => {
    setCurrentPage(1) // Resetear a la primera página al buscar
  }

  // Manejar el ordenamiento
  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Manejar la navegación de páginas
  const goToFirstPage = () => setCurrentPage(1)
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToLastPage = () => setCurrentPage(totalPages)

  // Manejar cambio directo de página
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value)
    }
  }

  // Manejar ver detalles
  const handleViewDetails = (id: number) => {
    // En una aplicación real, aquí cargaríamos los detalles de la entidad desde una API
    // Por ahora, usamos datos simulados
    if (id === 1) {
      setSelectedEntidad(ENTIDAD_DETALLE)
      setModalOpen(true)
    } else {
      // Para otras entidades, creamos datos ficticios basados en la entidad básica
      const entidadBasica = ENTIDADES_DB.find((e) => e.id === id)
      if (entidadBasica) {
        setSelectedEntidad({
          id: entidadBasica.id,
          tipoEntidad: entidadBasica.tipo,
          codigo: `${100 + entidadBasica.id}`,
          nombre: entidadBasica.nombre,
          siglas: entidadBasica.nombre
            .split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 4)
            .toUpperCase(),
          provincia: "La Habana",
          municipio: "Plaza",
          direccion: "Calle Principal",
          direccionElectronica: `info@${entidadBasica.nombre.split(" ")[0].toLowerCase()}.cu`,
          telefono: "7123-4567",
          activo: true,
        })
        setModalOpen(true)
      }
    }
  }

  // Manejar editar
  const handleEdit = (id: number) => {
    alert(`Editar la entidad con ID: ${id}`)
    // En una aplicación real, podríamos navegar a un formulario de edición
    // router.push(`/entidades/editar/${id}`);
  }

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-medium text-gray-800 p-4 border-b">Entidades</h2>

        {/* Buscador */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2">
            <Input
              placeholder="Nombre de la entidad"
              className="flex-1 bg-white text-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button className="bg-[#cd8702] hover:bg-[#b67700] font-medium" onClick={handleSearch}>
              <span className="text-white">Buscar</span>
            </Button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <div className="flex justify-end p-3 border-b">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Cantidad por página</span>
              <div className="relative w-20">
                <div className="bg-white border border-gray-300 rounded-md">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-600 bg-white border-none rounded-md focus:outline-none focus:ring-1 focus:ring-[#cd8702] appearance-none"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-[#f9f5e9] border-y">
                <th className="w-10 py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer" onClick={handleSort}>
                  <div className="flex items-center">
                    Nombre
                    {sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4 text-[#cd8702]" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 text-[#cd8702]" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Tipo de entidad</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {displayedEntidades.length > 0 ? (
                displayedEntidades.map((entidad) => (
                  <tr key={entidad.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-5 h-5 rounded-full border border-[#cd8702] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#cd8702]"></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{entidad.nombre}</td>
                    <td className="py-3 px-4 text-gray-600">{entidad.tipo}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          className="text-[#cd8702] hover:text-[#b67700]"
                          onClick={() => handleViewDetails(entidad.id)}
                          title="Ver detalles"
                        >
                          <FileText className="h-5 w-5" />
                        </button>
                        <button
                          className="text-[#cd8702] hover:text-[#b67700]"
                          onClick={() => handleEdit(entidad.id)}
                          title="Editar"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-gray-600">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-gray-600">Resultados encontrados: {filteredEntidades.length}</div>
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                title="Primera página"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="p-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                title="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">Página</span>
              <Input
                type="number"
                value={currentPage}
                onChange={handlePageInputChange}
                min={1}
                max={totalPages}
                className="w-16 h-8 text-center"
              />
              <span className="text-sm text-gray-600">de {totalPages || 1}</span>
              <button
                className="p-1 rounded-full bg-[#cd8702] text-white disabled:opacity-50 disabled:bg-gray-200"
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                title="Página siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                className="p-1 rounded-full bg-[#cd8702] text-white disabled:opacity-50 disabled:bg-gray-200"
                onClick={goToLastPage}
                disabled={currentPage === totalPages || totalPages === 0}
                title="Última página"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      <DetallesEntidadModal entidad={selectedEntidad} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}

export default ListadoEntidades

