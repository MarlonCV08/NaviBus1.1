import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/BotonAdd.css'
import { ModalAdd } from './ModalAdd';

export const BottonAdd = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
  return (
    <>
        <motion.div
            className="add-route-button"
            whileHover="hover"
            onClick={handleOpenModal}
            initial="rest"
            animate="rest"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 }
            }}
            style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', overflow: 'hidden' }}
        >
            <motion.div
                className="plus-icon"
                variants={{
                  rest: { rotate: 0 },
                  hover: { rotate: 90 },
                }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: '24px'}}
            >
                +
            </motion.div>
            <motion.div
                className="add-text-container"
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hover: { width: 100, opacity: 1 },
                }}
                transition={{ duration: 0.5 }}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  display: 'inline-block',
                }}
            >
                <span style={{ fontSize: '18px' }}>Añadir ruta</span>
            </motion.div>
        </motion.div>
        <ModalAdd isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

