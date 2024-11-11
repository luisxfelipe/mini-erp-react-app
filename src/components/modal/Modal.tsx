import { Modal as ModalAnt } from 'antd';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isModalOpen: boolean;
  title: string;
  onClose: () => void;
  onCancel: () => void;
}

const Modal = ({
  children,
  isModalOpen,
  title,
  onClose,
  onCancel,
}: ModalProps) => {
  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <>
      <ModalAnt
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        {children}
      </ModalAnt>
    </>
  );
};

export default Modal;
