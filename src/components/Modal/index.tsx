import { motion, AnimatePresence } from 'framer-motion';

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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-x-hidden overflow-y-auto outline-none lg:p-0 focus:outline-none"
            onClick={close}
            style={{ zIndex: 999 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'tween' }}
              className="relative w-auto max-w-3xl mx-auto my-6"
              onClick={handleClick}
            >
              {/*content*/}
              <div className="relative flex flex-col w-full border rounded-lg shadow-xl outline-none bg-zinc-900 focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-zinc-600">
                  <h3
                    className={`text-xl md:text-3xl font-semibold ${
                      titleClasses ? titleClasses : ''
                    }`}
                  >
                    {title}
                  </h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none bg-transparent border-0 outline-none text-zinc-50 opacity-5 focus:outline-none"
                    onClick={close}
                  >
                    <span className="z-50 block w-6 h-6 text-2xl bg-transparent outline-none text-zinc-50 opacity-5 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-5 overflow-y-auto max-h-80">
                  {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-zinc-500">
                  <button
                    className={`text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ${
                      buttonClasses ? buttonClasses : ''
                    }`}
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={close}
                  >
                    {buttonLabel ? buttonLabel : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            exit={{ opacity: 0 }}
            style={{ zIndex: 500 }}
            className="fixed inset-0 w-screen h-screen bg-black opacity-25"
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
