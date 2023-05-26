import React from "react";
import { Button, Modal } from "antd";


export function MyModal ({buttonTitle, modalTitle, form, buttonTitleSubmit, status, openStatus, closeStatus}) {

      

      return (
        <>
        <Button 
         type="primary" onClick={openStatus}>{buttonTitle}</Button>
        <Modal
        title={modalTitle}
        centered
        open={status}
        onCancel={closeStatus}
        width={600}
        footer={null}
      >{form}
      </Modal>
      </>
    );
}


