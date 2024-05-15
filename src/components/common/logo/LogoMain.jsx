// material-ui
import { useTheme } from '@mui/material/styles';
import logo from '../../../assets/images/logo.png';


const Logo = () => {
  const theme = useTheme();

  return (

    <img src={logo} alt="Mantis" width="50" />

  );
};

export default Logo;
