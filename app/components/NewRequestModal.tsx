import React, { FC, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import NewRequestForm from './NewRequestForm'; // Assuming NewRequestForm is also in TypeScript
import { Button } from 'primereact/button';

interface NewRequestModalProps {
  visible: boolean;
  onHide: () => void;
}

const NewRequestModal: FC<NewRequestModalProps> = ({ visible, onHide }) => {
  return (
    <Dialog header="New Request" visible={visible} onHide={onHide}>
      <NewRequestForm />
      <Button label="Close" icon="pi pi-times" className="p-button-secondary" onClick={onHide} />
    </Dialog>
  );
};

export default NewRequestModal;