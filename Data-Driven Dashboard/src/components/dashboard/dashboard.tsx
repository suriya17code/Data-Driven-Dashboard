import  { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as thunk from "../../redux/thunk"
import { useAppDispatch, useAppSelector } from '../../redux/store';
// Sample data
interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  sales: number;
  growth: number;
}

const Dashboard  = () => {
  // Sample data - in a real app this would come from an API
  // const data :DashboardData={
  //   totalUsers: 500,
  //   activeUsers: 120,
  //   sales: 10000,
  //   growth: 10
  // }
const data = useAppSelector((state)=>state.dashboard.dashboardDetails?.data)
  // Filter states
  const [timeRange, setTimeRange] = useState<string>('month');
  const [dataType, setDataType] = useState<string>('all');
  const dispatch=useAppDispatch()
  // Time series data (simulated for the example)
  const [timeSeriesData, setTimeSeriesData] = useState({
    users: generateTimeSeriesData(30, 450, 500),
    active: generateTimeSeriesData(30, 100, 120),
    sales: generateTimeSeriesData(30, 8000, 10000),
  });
  
  // Update data when filters change
  useEffect(() => {
    // In a real app, this would fetch data from an API based on filters
    // For this example, we'll just simulate different data for different filters
    
    let dayCount: number;
    switch (timeRange) {
      case 'week':
        dayCount = 7;
        break;
      case 'month':
        dayCount = 30;
        break;
      case 'quarter':
        dayCount = 90;
        break;
      default:
        dayCount = 30;
    }
    
    setTimeSeriesData({
      users: generateTimeSeriesData(dayCount, 450, 500),
      active: generateTimeSeriesData(dayCount, 100, 120),
      sales: generateTimeSeriesData(dayCount, 8000, 10000),
    });
  }, [timeRange, dataType]);
  
  // Highcharts options for the user growth chart
  const userChartOptions = {
    chart: {
      type: 'spline',
      height: 300
    },
    title: {
      text: 'User Growth'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%b %d}'
      }
    },
    yAxis: {
      title: {
        text: 'Users'
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    plotOptions: {
      series: {
        marker: {
          radius: 3
        }
      }
    },
    series: [{
      name: 'Total Users',
      data: timeSeriesData?.users,
      color: '#4299E1'
    }, {
      name: 'Active Users',
      data: timeSeriesData?.active,
      color: '#48BB78'
    }]
  };
  
  // Highcharts options for the sales chart
  const salesChartOptions = {
    chart: {
      type: 'column',
      height: 300
    },
    title: {
      text: 'Sales Performance'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%b %d}'
      }
    },
    yAxis: {
      title: {
        text: 'Amount ($)'
      }
    },
    tooltip: {
      valuePrefix: '$'
    },
    series: [{
      name: 'Sales',
      data: timeSeriesData?.sales,
      color: '#F6AD55'
    }]
  };
  
  // Highcharts options for the user distribution pie chart
  const userDistributionOptions = {
    chart: {
      type: 'pie',
      height: 300
    },
    title: {
      text: 'User Distribution'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Users',
      colorByPoint: true,
      data: [{
        name: 'Active Users',
        y: data?.activeUsers,
        color: '#48BB78',
        sliced: true,
        selected: true
      }, {
        name: 'Inactive Users',
        y: data?.totalUsers - data?.activeUsers,
        color: '#CBD5E0'
      }]
    }]
  };
  
  // Metrics card component
  const MetricCard = ({ title, value, icon, trend, color }: { title: string, value: string | number, icon: string, trend?: string, color: string }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && <p className={`text-${color}-500 text-sm mt-1`}>{trend}</p>}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-full`}>
          <span className={`text-${color}-500 text-xl`}>{icon}</span>
        </div>
      </div>
    </div>
  );
  useEffect(()=>{
    dispatch(thunk.getdashboard())
    console.log('dauud',data);
  },[])
  return (
    <div className="bg-gray-100 h-[680px] overflow-auto p-6 scrollbar-none custom-scrollbar" style={{}}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Business Dashboard</h1>
          <p className="text-gray-600">Overview of your business metrics</p>
        </header>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap justify-between items-center">
          <div className='flex '>
          <div className=' mr-3'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            >
              <option value="all">All Data</option>
              <option value="users">Users Only</option>
              <option value="sales">Sales Only</option>
            </select>
          </div>
          </div>

          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-5">
              Export Data
            </button>
          </div>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Total Users"
            value={data?.totalUsers}
            icon="👥"
            trend={`+${Math.round(data?.growth)}% from last period`}
            color="blue"
          />
          <MetricCard
            title="Active Users"
            value={data?.activeUsers}
            icon="👤"
            trend={`${Math.round(data?.activeUsers / data?.totalUsers * 100)}% of total users`}
            color="green"
          />
          <MetricCard
            title="Sales"
            value={`$${data?.sales?.toLocaleString()}`}
            icon="💰"
            trend={`+${Math.round(data?.growth)}% from last period`}
            color="yellow"
          />
          <MetricCard
            title="Growth Rate"
            value={`${data?.growth}%`}
            icon="📈"
            color="purple"
          />
        </div>
        
        {/* Charts */}
        <div className={`grid grid-cols-1 ${dataType === 'all' ? 'lg:grid-cols-2' : ''} gap-6 mb-6`}>
          {(dataType === 'all' || dataType === 'users') && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <HighchartsReact highcharts={Highcharts} options={userChartOptions} />
            </div>
          )}
          
          {(dataType === 'all' || dataType === 'sales') && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <HighchartsReact highcharts={Highcharts} options={salesChartOptions} />
            </div>
          )}
        </div>
        
        {(dataType === 'all' || dataType === 'users') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
              <HighchartsReact highcharts={Highcharts} options={userDistributionOptions} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Active User Details</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Daily Active Users</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{Math.round(data?.activeUsers * 0.6)}</td>
                    <td className="px-4 py-3 text-sm text-green-500">+5%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Weekly Active Users</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{Math.round(data?.activeUsers * 0.8)}</td>
                    <td className="px-4 py-3 text-sm text-green-500">+8%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Monthly Active Users</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{data?.activeUsers}</td>
                    <td className="px-4 py-3 text-sm text-green-500">+10%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Avg. Session Duration</td>
                    <td className="px-4 py-3 text-sm text-gray-500">12m 30s</td>
                    <td className="px-4 py-3 text-sm text-red-500">-2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate time series data
function generateTimeSeriesData(days: number, min: number, max: number): [number, number][] {
  const data: [number, number][] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Generate a somewhat realistic growth curve
    const factor = 1 + (days - i) / days;
    const value = min + (max - min) * (factor + Math.random() * 0.1 - 0.05);
    
    data?.push([date.getTime(), Math.round(value)]);
  }
  
  return data;
}

export default Dashboard;