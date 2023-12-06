import { FC } from 'react';
import ControlGroupStyle from './control-group.module.css';

type TControlGroup = { extraClass?: string };

export const ControlGroup: FC<TControlGroup> = ({ extraClass, children }) => {
  return (
    <div className={`${ControlGroupStyle.group} ${extraClass}`}>{children}</div>
  );
};
