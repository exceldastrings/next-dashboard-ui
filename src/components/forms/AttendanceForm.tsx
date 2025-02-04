"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  date: z.date({ required_error: "Date is required!" }),
  studentName: z.string().min(2, { message: "Student name is required!" }),
  status: z.enum(["present", "absent"], { required_error: "Status is required!" }),
  remarks: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = handleSubmit((data) => {
    console.log("Attendance data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Record Attendance</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />
        <InputField
          label="Student Name"
          name="studentName"
          defaultValue={data?.studentName}
          register={register}
          error={errors.studentName}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md p-2 text-sm w-full"
            {...register("status")}
            defaultValue={data?.status}
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          {errors.status?.message && (
            <p className="text-xs text-red-400">{errors.status.message.toString()}</p>
          )}
        </div>
        <InputField
          label="Remarks"
          name="remarks"
          defaultValue={data?.remarks}
          register={register}
          error={errors.remarks}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Record" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;
