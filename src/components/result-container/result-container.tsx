import { FC } from 'react';
import ResultContainerStyle from './result-container.module.css';

type TResultContainer = { extraClass?: string };

export const ResultContainer: FC<TResultContainer> = ({
  children,
  extraClass,
}) => {
  return (
    <div className={`${ResultContainerStyle.result} ${extraClass}`}>
      {children}
    </div>
  );
};
