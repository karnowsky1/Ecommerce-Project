import Container from '@/app/components/Container';
import OrderDetails from './OrderDetails';
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/components/NullData';


interface IParams {
  orderId?: string
}

const Order = async ({params} : {params: IParams}) => {
  const order = await getOrderById(params)

  if(!order) return <NullData title="This order does not exist within our system"></NullData>
  
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order = {order}/>

      </Container>
    </div>
  )
}

export default Order