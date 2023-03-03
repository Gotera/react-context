import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useMarketCarContext } from 'common/context/Car';
import { usePaymentContext } from 'common/context/Payment';
import { UserContext } from 'common/context/User';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();
  const { car, currentCarPrice, buy } = useMarketCarContext();
  const { balance = 0 } = useContext(UserContext);
  const total = useMemo(() => balance - currentCarPrice, [balance, currentCarPrice]);
  const {
    typesOfPayment,
    paymentMethod,
    changePaymentMethod,
  } = usePaymentContext();
  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />
      <h2>
        Carrinho
      </h2>
      {car.map(product => (
        <Produto
          {...product}
          key={product.id}
        />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={paymentMethod.id}
          onChange={(event) => changePaymentMethod(event.target.value)}
        >
          {typesOfPayment.map(payment => (
            <MenuItem value={payment.id} key={payment.id}>
              {payment.name}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {currentCarPrice.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(balance).toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {total.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          buy();
          setOpenSnackbar(true);
        }}
        disabled={total < 0 || car.length === 0}
        color="primary"
        variant="contained"
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;