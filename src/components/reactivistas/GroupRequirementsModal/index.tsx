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
    >
      <div className="text-sm overflow-auto px-2">
        <li>Un nombre (puede ser cualquier nombre)</li>
        <li>
          Un tema y su correspondiente material de estudio (curso,
          libro,documentación, etc)
        </li>
        <li>Un representante de grupo</li>
        <li>
          Una definición en cuanto a la dinámica de encuentro de los
          participantes ( periodicidad, día, hora)
        </li>
        <li>Un plan, con su respectivo bosquejo, de entre 4 y 16 semanas</li>
        <h2 className="text-base my-2 font-semibold">Observaciones</h2>
        <li>
          El grupo podrá iniciar sus actividades una vez que cuente con el
          mínimo de participantes, que es 4. El máximo será de 10.
        </li>
        <li>
          La organización de Reactivistas revisará las solicitudes y aprobará
          toda aquella que cuente con los requisitos solicitados.
        </li>
      </div>
    </Modal>
  );
};

export default GroupRequirementsModal;
