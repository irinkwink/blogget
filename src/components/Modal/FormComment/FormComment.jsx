import {useContext, useRef, useState} from 'react';
import {authContext} from '../../../context/authContext';
import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';

export const FormComment = () => {
  const {auth} = useContext(authContext);
  const textareaRef = useRef(null);
  const [isShowForm, setIsShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textareaRef.current.value);
  };

  return (
    <>
      {isShowForm ?
        <form className={style.form} onSubmit={handleSubmit}>
          <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
          <textarea
            className={style.textarea}
            autoFocus={true}
            required
            ref={textareaRef}
          ></textarea>
          <button className={style.btn} type='submit'>Отправить</button>
        </form> :
        <button
          className={style.btn}
          onClick={() => setIsShowForm(true)}
        >
          Написать комментарий
        </button>
      }
    </>
  );
};
