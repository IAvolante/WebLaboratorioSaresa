import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export default function Modal({ isOpen, onClose, userName }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px]"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.96, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.96, y: 10, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative w-full max-w-md overflow-hidden rounded-md border border-neutral-200 bg-white p-6 text-center shadow-xl sm:p-8 focus:outline-none"
                >
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#E04323]" />

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Cerrar ventana"
                      className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded text-neutral-400 hover:bg-neutral-100 hover:text-[#231F20]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDF2EF] text-[#E04323]">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>

                  <Dialog.Title className="text-xl font-bold text-[#231F20]">
                    ¡Muchas gracias, {userName || 'Paciente'}!
                  </Dialog.Title>

                  <Dialog.Description className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                    Su mensaje fue enviado correctamente a{' '}
                    <strong className="font-semibold text-[#231F20]">
                      Clínica Laboratorio Saresa
                    </strong>
                    . Nuestro equipo de atención al paciente se pondrá en
                    contacto con usted a la brevedad.
                  </Dialog.Description>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded bg-[#E04323] hover:bg-[#C43417] py-2.5 text-sm font-semibold text-white transition-colors"
                    >
                      Aceptar
                    </button>
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
