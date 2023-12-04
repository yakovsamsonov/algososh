import { FC } from 'react';
import ControlBoxStyle from './control-box.module.css';

type TControlBox = { extraClass?: string };

export const ControlBox: FC<TControlBox> = ({ extraClass, children }) => {
  return (
    <div className={`${ControlBoxStyle.control} ${extraClass}`}>{children}</div>
  );
};
