import { motion, AnimatePresence } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

type ModalProps = {
  isOpen: boolean;
  title: string;
  close: () => void;
  titleClasses?: string;
  buttonLabel?: string;
  buttonClasses?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  close,
  titleClasses,
  buttonLabel,
  buttonClasses,
}) => {
  const { t } = useTranslation('common');
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none p-5 lg:p-0 focus:outline-none"
            onClick={close}
            style={{ zIndex: 999 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'tween' }}
              className="relative w-auto my-6 mx-auto max-w-3xl"
              onClick={handleClick}
            >
              {/*content*/}
              <div className="border rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3
                    className={`text-3xl font-semibold ${
                      titleClasses ? titleClasses : ''
                    }`}
                  >
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={close}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{children}</div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className={`text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ${
                      buttonClasses ? buttonClasses : ''
                    }`}
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={close}
                  >
                    {buttonLabel ? buttonLabel : t('close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            exit={{ opacity: 0 }}
            style={{ zIndex: 500 }}
            className="opacity-25 w-screen h-screen fixed inset-0 bg-black"
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
