import Modal from '../../Modal';
import { ReactGroup } from '../../../lib/types';

type GroupInfoModalProps = {
  group: ReactGroup;
  open: boolean;
  onClose: () => void;
};

const GroupInfoModal = (props: GroupInfoModalProps) => {
  const { open, onClose, group } = props;
  console.log(group);
  return (
    <Modal isOpen={open} close={onClose} title={group.name}>
      <div className="text-sm overflow-auto px-2">
        <ul>
          <li className="mb-3">
            <span className="font-bold">Representante del grupo:</span>{' '}
            {group.teamCaptain}
          </li>
          <li className="mb-3">
            <span className="font-bold">Tema:</span> {group.topic}
          </li>
          <li className="mb-3">
            <span className="font-bold">Material de estudio:</span>{' '}
            <a
              className="mb-3 font-medium text-primary"
              href={group.studyMaterial}
              target="_blank"
            >
              Link aqui
            </a>
          </li>
          <li className="mb-3">
            <span className="font-bold">Estilo de Reuniones:</span>{' '}
            {group.meetings ? group.meetings : 'A definir'}
          </li>
          <li className="mb-3">
            <span className="font-bold">Plan de Estudio:</span>{' '}
            {group.plan ? group.plan : 'A definir'}
          </li>
          <li>
            <span className="font-bold">Fecha de Inicio:</span>{' '}
            {group.startDate}
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default GroupInfoModal;
