import { error } from 'console';
import prisma from "@/libs/prismadb"
import moment from "moment"

export default async function getGraphData() {
  try {
    // get the start and end dates for the data range (7 days ago from today)
    const startDate = moment().subtract(6,"days").startOf("day")
    const endDate = moment().endOf("day")

    // Query the database to get the order data grouped by createdDate
    const result = await prisma.order.groupBy({
      by: ["createdDate"],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete"
      },
      _sum: {
        amount: true
      },
    })

    // Initialize an object to aggregate the data by day 

    const aggregatedData: {
      [day: string]: 
        { 
          day: string 
          date: string
          totalAmount: number
        }
    } = {}

    // create a clone of the start date to iterate over each day 
    const currentDate = startDate.clone()

    // Iterate over each day in the date range
    while (currentDate <= endDate) {
      // Format the day as a string (i.e "Monday")
      const day = currentDate.format("dddd")
      // console.log("day<<<", day, currentDate)

      // Initialize the aggregeated data for the day with date, day, and totalAmount
      aggregatedData[day] = {
        day,
        date: currentDate.format("YYY-MM-DD"),
        totalAmount: 0
      }
  
      // Move to the next day
      currentDate.add(1, "day")
    }

    // Calculate the total amount for each day by summing the order amounts 
    result.forEach((entry) => {
      const day = moment(entry.createdDate).format("dddd")
      const amount = entry._sum.amount || 0 
      aggregatedData[day].totalAmount += amount/100
    })

    // Convert the aggregatedData object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a,b) => {
      return moment(a.date).diff(moment(b.date))
    })

    // Return the formatted data
    return formattedData
  } catch (error: any) {
    throw new Error(error)
  }

}