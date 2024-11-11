"use client"

import ActionButton from "@/app/components/ActionButton"
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import { formatPrice } from "@/utils/formatPrice"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Order, User } from "@prisma/client"
import moment from "moment"
import { useRouter } from "next/navigation"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"

interface OrdersClientProps {
  orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
  user: User
}

const OrdersClient: React.FC<OrdersClientProps> = ({orders}) => {
  const router = useRouter()
  let rows: any = []
  if(orders){
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      }
    })
  }

  const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 220},
    {field: "customer", headerName: "Customer Name", width: 130},
    {field: "amount", headerName: "Amount(USD)", width: 130, renderCell: 
    (params) => {
      return(<div className="font-bold text-slate-800">{params.row.amount}</div>)
    }},
    {field: "paymentStatus", headerName: "Payment Status", width: 130, renderCell: 
      (params) => {
        return(
          <div>
            {params.row.paymentStatus === "pending" ? ( 
              <Status 
                text="pending" 
                icon={MdAccessTimeFilled} 
                background="bg-slate-200" 
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status 
                text="completed" 
                icon={MdDone} 
                background="bg-green-200" 
                color="text-green-700"
              />
            ) : (<></>)}
          </div>
        )
      }
    },
    {field: "deliveryStatus", headerName: "Delivery Status", width: 130, renderCell: 
      (params) => {
        return(
          <div>
            {params.row.deliveryStatus === "pending" ? ( 
              <Status 
                text="pending" 
                icon={MdAccessTimeFilled} 
                background="bg-slate-200" 
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status 
                text="dispatched" 
                icon={MdDeliveryDining} 
                background="bg-purple-200" 
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status 
                text="delivered" 
                icon={MdDone} 
                background="bg-green-200" 
                color="text-green-700"
              />
            ) : <></>}
          </div>
        )
      }
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {field: "actions", headerName: "Actions", width: 70, renderCell: 
      (params) => {
        return (
          <div className="flex justify-between gap-4 w-full items-center h-full">
            <ActionButton 
              icon={MdRemoveRedEye} 
              onClick={()=>{router.push(`/order/${params.row.id}`)}} 
              tooltip="View Order Details"  
            />
          </div>
        )
      }
    },
  ]

  return (
    <div className="max-w-[1000px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="My Orders" center/>
      </div>
      <div style={{height: 600, width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {page: 0, pageSize: 5}
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        >
        </DataGrid>
      </div>
    </div>
  )
}

export default OrdersClient