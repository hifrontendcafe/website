import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  close: () => void;
  footer: ReactNode;
  titleClasses?: string;
  buttonLabel?: string;
  buttonClasses?: string;
  children?: ReactNode;
};

const SimpleModal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  close,
  titleClasses,
  footer,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/25 p-5 md:p-0"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween' }}
            className="max-w-3xl space-y-6 rounded-lg border bg-zinc-900 p-5 shadow-xl"
            onClick={handleClick}
          >
            <div className="flex items-center justify-between gap-14">
              <h3
                className={`text-2xl font-semibold md:text-3xl ${
                  titleClasses ? titleClasses : ''
                }`}
              >
                {title}
              </h3>
              <button
                aria-label="Cerrar modal"
                className="h-10 w-10 rounded-full bg-zinc-800 outline-none hover:bg-zinc-700 focus:ring"
                onClick={close}
              >
                <FontAwesomeIcon aria-hidden icon={faClose} />
              </button>
            </div>
            <div className="relative max-h-80 text-lg">{children}</div>
            <div className="flex items-center justify-end">{footer}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleModal;
