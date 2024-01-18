import { Modal } from "antd";
import { useEffect, useState } from "react";

function ConformationModel(props) {
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  return (
    <>
      <Modal
        title={props.title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        test
      </Modal>
    </>
  );
}

export default ConformationModel;
