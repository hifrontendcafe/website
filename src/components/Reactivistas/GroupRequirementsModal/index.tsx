import Modal from '../../Modal';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const GroupRequirementsModal = (props: ModalProps) => {
  const { open, onClose } = props;

  return (
    <Modal
      isOpen={open}
      close={onClose}
      title="Requisitos para iniciar un nuevo grupo"
      titleClasses="text-primary"
      buttonLabel="Cerrar"
      buttonClasses="text-primary"
    >
      <div className="px-2 overflow-auto text-sm text-coolGray-300">
        <ul className="list-none list-inside">
          <li className="mb-1"> ✔️Un nombre (puede ser cualquier nombre)</li>
          <li>
            ✔️ Un tema y su correspondiente material de estudio (curso,
            libro,documentación, etc)
          </li>
          <li className="mb-1"> ✔️Un representante de grupo</li>
          <li className="mb-1">
            ✔️ Una definición en cuanto a la dinámica de encuentro de los
            participantes ( periodicidad, día, hora)
          </li>
          <li className="mb-1">
            ✔️ Un plan, con su respectivo bosquejo, de entre 4 y 16 semanas
          </li>
          <h2 className="my-2 text-base font-semibold">Observaciones</h2>
          <li className="mb-1">
            ✔️ El grupo podrá iniciar sus actividades una vez que cuente con el
            mínimo de participantes, que es 4. El máximo será de 10.
          </li>
          <li className="mb-1">
            ✔️ La organización de Reactivistas revisará las solicitudes y
            aprobará toda aquella que cuente con los requisitos solicitados.
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default GroupRequirementsModal;
