import Modal from '@/components/Modal';
import { ReactGroup } from '@/lib/types';

interface GroupInfoModalProps {
  group: ReactGroup;
  open: boolean;
  onClose: () => void;
}

const GroupInfoModal: React.FC<GroupInfoModalProps> = (props) => {
  const { open, onClose, group } = props;
  return (
    <Modal isOpen={open} close={onClose} title={group.name}>
      <div className="px-2 overflow-auto text-sm">
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
              rel="noreferrer"
            >
              Link aquí
            </a>
          </li>
          <li className="mb-3">
            <span className="font-bold">Estilo de reuniones:</span>{' '}
            {group.meetings ? group.meetings : 'A definir'}
          </li>
          <li className="mb-3">
            <span className="font-bold">Plan de estudio:</span>{' '}
            {group.plan ? group.plan : 'A definir'}
          </li>
          <li>
            <span className="font-bold">Fecha de inicio:</span>{' '}
            {new Date(group.startDate).toLocaleDateString()}
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default GroupInfoModal;
