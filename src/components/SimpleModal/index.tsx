import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  title: string;
  close: () => void;
  titleClasses?: string;
  buttonLabel?: string;
  buttonClasses?: string;
};

const SimpleModal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  close,
  titleClasses,
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
              <div className="relative flex flex-col w-full bg-white border rounded-lg shadow-xl outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between px-5 py-2 border-b border-gray-300 border-solid rounded-t">
                  <h3
                    className={`text-2xl md:text-3xl font-semibold ${
                      titleClasses ? titleClasses : ''
                    }`}
                  >
                    {title}
                  </h3>
                  <button
                    className="text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={close}
                  >
                    <span className="block w-6 h-6 text-2xl text-black outline-none hover:opacity-50 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6 max-h-80">
                  {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 rounded-b">
                  <a
                    target="_blank"
                    className="mx-3 mt-0 mb-3 btn btn-secondary"
                    style={{ transition: 'all .15s ease' }}
                    href="https://discord.gg/frontendcafe"
                    rel="noreferrer"
                  >
                    Sumate a Discord
                  </a>
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

export default SimpleModal;
