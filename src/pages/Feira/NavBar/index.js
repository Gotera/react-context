import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useMarketCarContext } from 'common/context/Car';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const { qtProducts } = useMarketCarContext();
  const history = useHistory();
  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={qtProducts === 0}
        onClick={() => history.push('/carrinho')}
      >
        <Badge
          color="primary"
          badgeContent={qtProducts}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}