import React, { useState } from "react";
import { Button, Modal } from "antd";


export function MyModal ({buttonTitle, modalTitle, form}) {

    const [open, setOpen] = useState(false);

    return (
        <>
        <Button 
         type="primary" onClick={() => setOpen(true)}>{buttonTitle}</Button>
        <Modal
        title={modalTitle}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={600}
        footer={null}
      >{form}</Modal>
      </>
    )
}


