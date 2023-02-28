import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useMarketCarContext } from 'common/context/Car';


function Produto({
  name,
  photo,
  id,
  price,
  unit
}) {
  const { car, addProduct, removeItem } = useMarketCarContext();
  const qtProductInCar = car.find(itemInCar => itemInCar.id === id)
  return (
    <Container>
      <div>
        <img
          src={`/assets/${photo}.png`}
          alt={`foto de ${name}`}
        />
        <p>
          {name} - R$ {price?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          color="secondary"
          onClick={() => removeItem(id)}
        >
          <RemoveIcon />
        </IconButton>
        {qtProductInCar?.quantity || 0}
        <IconButton
          color="primary"
          onClick={() => addProduct({ name, photo, id, price })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)