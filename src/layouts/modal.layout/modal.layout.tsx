import { useModal } from "@ebay/nice-modal-react";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { Util } from "../../helpers/util/util";
import { IModalLayout } from "./types";

export const ModalLayout = (props: IModalLayout) => {
  const modal = useModal();

  return (
    <Drawer
      open={modal.visible}
      onClose={modal.hide}
      anchor="right"
      className={Util.classNames(`modal-layout`, props.className)}
    >
      <div className="modal-layout__content">
        <div className="modal-layout__title-section">
          <p className="modal-layout__title-text">{props.title}</p>
          <button
            className="modal-layout__close-btn"
            aria-label="Close"
            type="button"
            onClick={modal.hide}
          >
            <CloseIcon className="table__icon" />
          </button>
        </div>

        <div className="modal-layout__body-section">
          {
            // @ts-ignore
            !!props.children && props.children(modal)
          }
        </div>
      </div>
    </Drawer>
  );
};
