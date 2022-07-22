
import style from './Tabs.module.css';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {assignId} from '../../../utils/generateRandomId';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';
import {debounceRaf} from '../../../utils/debounce';

const LIST = [
  {value: 'Главная', Icon: HomeIcon},
  {value: 'Топ', Icon: TopIcon},
  {value: 'Лучшие', Icon: BestIcon},
  {value: 'Горячие', Icon: HotIcon},
].map(assignId);

export const Tabs = () => {
  const [isDpopdownOpen, setIsDpopdownOpen] = useState(false);
  const [isDropdown, setIsDpopdown] = useState(true);
  const [selectedItem, setSelectedItem] = useState(LIST[0].value);

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDpopdown(true);
    } else {
      setIsDpopdown(false);
    }
  };

  useEffect(() => {
    const debounceRecize = debounceRaf(handleResize);
    handleResize();
    window.addEventListener('resize', debounceRecize);
    return () => {
      window.removeEventListener('resize', debounceRecize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDpopdownOpen(!isDpopdownOpen)}
          >
            {selectedItem}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}

      {(isDpopdownOpen || !isDropdown) && (
        <ul
          className={style.list}
          onClick={() => setIsDpopdownOpen(false)}>
          {LIST.map(({value, id, Icon}) => (
            <li className={style.item} key={id}>
              <button
                className={style.btn}
                onClick={() => setSelectedItem(value)}
              >
                {value}
                {Icon && <Icon width={25} height={25}/>}
              </button>
            </li>
          )
          )}
        </ul>
      )}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  addItem: PropTypes.func,
};

