

import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants/uiText';
import './header.css';

type Props = {
  isAuth: boolean;
  onLogout: () => void;
};

const Header: React.FC<Props> = ({ isAuth, onLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuth) {
      onLogout(); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__left">
          <Logo />
        </div>

        <div className="header__right">
          {isAuth && <span className="header__user">Harry Potter</span>}

          <Button
            buttonText={isAuth ? BUTTON_TEXT.LOGOUT : BUTTON_TEXT.LOGIN}
            variant="primary"
            onClick={handleClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
