import Modal from '../../components/Modal';
import { ReactGroup } from '../../lib/types';

type GroupInfoModalProps = {
  group: ReactGroup;
  open: boolean;
  onClose: () => void;
};

export const GroupInfoModal = (props: GroupInfoModalProps) => {
  const { open, onClose, group } = props;

  return (
    <Modal isOpen={open} close={onClose} title={group.name}>
      <div className="text-sm overflow-auto px-2">
        <li>
          Tema: <b>{group.topic}</b>
        </li>
        <li>
          <a
            className="mb-2 font-medium text-primary"
            href={group.studyMaterial}
          >
            Material de Estudio
          </a>
        </li>
        <br />
        <li>
          Estilo de Reuniones:{' '}
          {group.meetings ? <b>{group.meetings}</b> : 'A definir'}
        </li>
        <br />
        <li>
          Plan de Estudio: {group.plan ? <b>{group.plan}</b> : 'A definir'}
        </li>
        <br />
        <li>
          Fecha de Inicio: <b>{group.startDate}</b>
        </li>
      </div>
    </Modal>
  );
};
