import { Container } from './styles';
import { memo, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { MarketcarContext } from 'common/context/Car';


function Produto({
  name,
  photo,
  id,
  price,
  unit
}) {
  const { car, setCar } = useContext(MarketcarContext)
  function addProduct(newProduct) {
    const hasTheProduct = car.some(itemInCar => itemInCar.id === newProduct.id)
    if (!hasTheProduct) {
      newProduct.quantity = 1;
      return (
        setCar(previousCar =>
          [...previousCar, newProduct])
      );
    }
    setCar(previousCar => previousCar.map(itemInCar => {
      if(itemInCar.id === newProduct.id) itemInCar.quantity += 1;
      return itemInCar;
    }))
  }
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
        >
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={() => addProduct({ name, photo, id, price })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)