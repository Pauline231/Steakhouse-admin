import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useEffect, useState } from "react";
import { APIAuthenticated } from "http/Api";

const Dashboard = () => {
  const [data,setData] = useState([])
  const fetchdata = async()=>{
  const response = await APIAuthenticated.get('/admin/misc/datas')
  setData(response.data.data)
  }
  useEffect(()=>{
    fetchdata()
  },[])

  
  const totalOrderedUsers = data && data.allOrders?.map((order)=>{
    return {
      userId : order.user?._id
    }
  })

  
  const uniqueTotalOrderedUsers = [...new Set(totalOrderedUsers?.map(user=>user.userId))]

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Orders"}
          subtitle={data.orders}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Users"}
          subtitle={data.users}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Products"}
          subtitle={data.products}
        />
      
      </div>

      {/* Charts */}

      {/* Tables & Charts */}

    </div>
  );
};

export default Dashboard;
