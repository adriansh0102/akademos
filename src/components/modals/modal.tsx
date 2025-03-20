// components/Modal.tsx
import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 ease-in-out">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className='cursor-pointer'
          >
            <span className='font-semibold'>&times;</span>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

//Ejemplo de uso

// const Page = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
  
//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);
  
//     return (
     
//         <div className="p-4">
//         <h1 className="text-2xl font-bold">Bienvenido a Next.js 15</h1>
//         <Button
//           onClick={openModal}
         
//         >
//           Abrir Modal
//         </Button>
  
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <h2 className="">Este es un Modal</h2>
//           <p className="mt-2">Puedes poner cualquier contenido aquí.</p><p></p>
//         </Modal>
//       </div>
    
//     );
//   };
  
//   export default Page;