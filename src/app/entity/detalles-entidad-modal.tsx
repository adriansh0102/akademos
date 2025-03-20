"use client"

import type React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"

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

interface DetallesEntidadModalProps {
  entidad: EntidadDetalle | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DetallesEntidadModal: React.FC<DetallesEntidadModalProps> = ({ entidad, open, onOpenChange }) => {
  if (!entidad) return <>null</>
``
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-0">
        <DialogHeader className="border-b bg-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium text-gray-800">Detalles de entidad</DialogTitle>
            <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Cerrar</span>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="p-4 text-gray-600">
          <div className="space-y-1">
            <div>
              <span className="font-medium">Tipo de entidad:</span> {entidad.tipoEntidad}
            </div>
            <div>
              <span className="font-medium">Código:</span> {entidad.codigo}
            </div>
            <div>
              <span className="font-medium">Nombre:</span> {entidad.nombre}
            </div>
            <div>
              <span className="font-medium">Siglas:</span> {entidad.siglas}
            </div>
            <div>
              <span className="font-medium">Subordinado a:</span> {entidad.subordinadoA || ""}
            </div>
            <div>
              <span className="font-medium">Provincia:</span> {entidad.provincia}
            </div>
            <div>
              <span className="font-medium">Municipio:</span> {entidad.municipio}
            </div>
            <div>
              <span className="font-medium">Dirección:</span> {entidad.direccion}
            </div>
            <div>
              <span className="font-medium">Dirección electrónica:</span> {entidad.direccionElectronica}
            </div>
            <div>
              <span className="font-medium">Teléfono:</span> {entidad.telefono}
            </div>
            <div>
              <span className="font-medium">Estado:</span> {entidad.activo ? "Activo" : "Inactivo"}
            </div>
          </div>
        </div>
        <DialogFooter className="border-t bg-white">
          <Button onClick={() => onOpenChange(false)} className="bg-[#cd8702] hover:bg-[#b67700] text-white">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DetallesEntidadModal

