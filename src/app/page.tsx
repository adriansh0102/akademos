'use client'
import MyForm from "@/components/form/form";
import Modal from "@/components/modals/modal";
import {Button} from "@/components/ui/button";
import Card from "@/components/ui/card";
import React, { useState } from "react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (

    <div className="p-4">
      <h1 className="text-2xl font-bold">Bienvenido a Next.js 15</h1>
      <Button
        onClick={openModal}

      >
        Abrir Modal
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="">Este es un Modal</h2>
        <p className="mt-2">Puedes poner cualquier contenido aquí.</p>
      </Modal>

      <Card>
        <MyForm />
      </Card>
    </div>

  );
};

export default Page;