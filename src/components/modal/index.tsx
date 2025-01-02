import React from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'



interface ModalProps {
    children: React.ReactNode,
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Modal({ children, open, close }: ModalProps) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={() => close(false)}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-50"
            >
                <DialogPanel>
                    {children}
                </DialogPanel>
            </Dialog>
        </div>
    )
}
