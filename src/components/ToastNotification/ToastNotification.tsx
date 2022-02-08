import React, { useState, useEffect, ReactNode } from 'react';
import ToastNotificationIcon from './ToastNotificationIcon';
import { AnimatePresence, motion } from 'framer-motion';

export type TypeToastNotification = 'success' | 'error' | 'info' | 'warning';

type ToastNotificationProps = {
  children: ReactNode;
  type: TypeToastNotification;
  onDidDismiss: () => void;
};

const showTime = 3500;
const delayByAnimation = 500;
const getBackgroundColorClass = (type: TypeToastNotification) => {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'info':
      return 'bg-blue-500';
    default:
      return 'bg-blue-500';
  }
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  children,
  type,
  onDidDismiss,
}) => {
  const [show, setShow] = useState(true);
  const [didDismiss, setDidDismiss] = useState(false);
  const backgroundColorClass = getBackgroundColorClass(type);
  useEffect(() => {
    let timeoutDismiss = null;
    let timeoutHide = null;
    if (show) {
      timeoutHide = setTimeout(() => {
        setShow(false);
      }, showTime);
    } else {
      if (!didDismiss)
        timeoutDismiss = setTimeout(() => {
          setDidDismiss(true);
          onDidDismiss();
        }, delayByAnimation);
    }
    return () => {
      clearTimeout(timeoutHide);
      clearTimeout(timeoutDismiss);
    };
  }, [show, onDidDismiss, didDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed top-12 max-w-md w-11/12 rounded-lg overflow-hidden mx-auto inset-x-0 flex justify-center items-center 
                     ${backgroundColorClass} text-primary text-sm font-bold px-4 py-3 mt-2`}
          role="alert"
          onClick={() => setShow(false)}
        >
          <ToastNotificationIcon type={type} />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
