"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  className: z.string().min(2, { message: "Class name is required!" }),
  teacherName: z.string().min(2, { message: "Teacher name is required!" }),
  roomNumber: z.string().min(1, { message: "Room number is required!" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters!" }),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Class data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Class</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="className"
          defaultValue={data?.className}
          register={register}
          error={errors.className}
        />
        <InputField
          label="Teacher Name"
          name="teacherName"
          defaultValue={data?.teacherName}
          register={register}
          error={errors.teacherName}
        />
        <InputField
          label="Room Number"
          name="roomNumber"
          defaultValue={data?.roomNumber}
          register={register}
          error={errors.roomNumber}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
