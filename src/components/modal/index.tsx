import type { FC } from "react";
import type { Car } from "../../types";
import Images from "./images";
import formatData from "../../utils/formatData";
import { p } from "motion/react-client";

interface Props {
  isOpen: Boolean;
  close: () => void;
  car: Car;
}

const Modal: FC<Props> = ({ isOpen, close, car }) => {
    formatData(car);
  return (
    isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] grid place-items-center z-20 ">
          <div className="bg-white p-6 relative max-w-lg max-h-[90vh] rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto">
            <button className="cursor-pointer p-1 absolute end-1 top-1 z-10 bg-white rounded-full" onClick={close}>
                <img src="/close.svg" alt="close" />
            </button>
            {/* görseller */}
            <Images car={car} />

            {/* içerik */}
            {formatData(car).map(([key, value])=> (
                <p className="flex justify-between gap-20 ">
                    <span className="capitalize">{key}</span>
                    <span className="capitalize font-semibold">
                        {value === "Y" ? "Var" : value === "N" ? "Yok" : value || "-"}</span>
                </p>
            ))}
          </div>
        </div>
    )
  );
};

export default Modal;
