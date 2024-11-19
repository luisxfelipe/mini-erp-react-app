import { LogoutOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title='Atenção'
        open={open}
        onOk={() => navigate('/login')}
        onCancel={hideModal}
        okText='Sim'
        cancelText='Cancelar'
      >
        <p>Tem certeza que deseja sair?</p>
      </Modal>
      <div
        className='w-full'
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '32px',
          backgroundColor: 'white',
          WebkitBoxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.47)',
          MozBoxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.47)',
          boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.47)',
        }}
      >
        <div className='pr-4 text-amber-300'>
          {import.meta.env.VITE_API_URL === 'http://localhost:3000' && (
            <p>Atenção - A aplicação está em modo de desenvolvimento.</p>
          )}
        </div>
        <LogoutOutlined style={{ fontSize: '24px' }} onClick={showModal} />
      </div>
    </>
  );
};
