import style from './Title.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';
import {useState} from 'react';
import Modal from '../../../../Modal';

export const Title = ({title, author, markdown}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Text As='h2' className={style.title}>
        <Text
          As='a'
          size={14}
          tsize={22}
          className={style.linkPost}
          href='#post'
          onClick={() => setIsModalOpen(true)}
        >
          {title}
        </Text>
      </Text>
      {isModalOpen &&
        <Modal title={title} author={author} markdown={markdown}/>}
    </>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string
};
