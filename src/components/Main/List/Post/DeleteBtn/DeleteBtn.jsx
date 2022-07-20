import style from './DeleteBtn.module.css';
import {ReactComponent as DeleteIcon} from './img/delete.svg';

export const DeleteBtn = props => {
  console.log();
  return (
    <button className={style.delete}>
      <DeleteIcon width={24} height={24} />
    </button>
  );
};
