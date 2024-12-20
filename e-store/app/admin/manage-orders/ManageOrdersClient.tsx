"use client"

import ActionButton from "@/app/components/ActionButton"
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import { formatPrice } from "@/utils/formatPrice"
import { Tooltip } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Order, User } from "@prisma/client"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import toast from "react-hot-toast"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"

interface ManageOrdersClientProps {
  orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
  user: User
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({orders}) => {
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
    {field: "actions", headerName: "Actions", width: 200, renderCell: 
      (params) => {
        return (
          <div className="flex justify-between gap-4 w-full items-center h-full">
            <ActionButton 
              icon={MdDeliveryDining} 
              onClick={()=>{handleDispatch(params.row.id)}} 
              tooltip="Dispatch Delivery Status"
              />
            <ActionButton 
              icon={MdDone} 
              onClick={()=>{handleDeliver(params.row.id)}} 
              tooltip="Complete Payment"
              />
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

  const handleDispatch = useCallback((id: string) => {
    axios.put("/api/order", {
      id,
      deliveryStatus: "dispatched"
    }).then((resolve) => {
      toast.success("Order Dispatched")
      router.refresh()
    }).catch((error) => {
      toast.error("Oops! Somthing went wrong")
      console.log(error)
    })
  }, [])

  const handleDeliver = useCallback((id: string) => {
    axios.put("/api/order", {
      id,
      deliveryStatus: "delivered"
    }).then((resolve) => {
      toast.success("Order Delivered")
      router.refresh()
    }).catch((error) => {
      toast.error("Oops! Somthing went wrong")
      console.log(error)
    })
  }, [])

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center/>
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

export default ManageOrdersClient