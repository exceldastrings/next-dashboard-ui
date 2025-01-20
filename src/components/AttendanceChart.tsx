"use client";

import Image from 'next/image';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 80,
    absent: 20,
  },
  {
    name: 'Tue',
    present: 75,
    absent: 25,
  },
  {
    name: 'Wed',
    present: 90,
    absent: 10,
  },
  {
    name: 'Thu',
    present: 85,
    absent: 15,
  },
  {
    name: 'Fri',
    present: 95,
    absent: 5,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className='text-lg font-semibold'>Attendance</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "lightgray",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
            itemStyle={{ color: "#333" }}
          />
          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
          <Bar dataKey="present" fill="#8884d8" legendType="circle" radius={[10, 10, 0, 0]} />
          <Bar dataKey="absent" fill="#82ca9d" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
