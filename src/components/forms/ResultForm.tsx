"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  studentName: z.string().min(2, { message: "Student name is required!" }),
  subject: z.string().min(2, { message: "Subject is required!" }),
  marksObtained: z.number({ invalid_type_error: "Marks must be a number" }).min(0, { message: "Marks cannot be negative" }),
  totalMarks: z.number({ invalid_type_error: "Total marks must be a number" }).min(1, { message: "Total marks is required" }),
  grade: z.string().min(1, { message: "Grade is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ResultForm = ({
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
    console.log("Result data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Result</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student Name"
          name="studentName"
          defaultValue={data?.studentName}
          register={register}
          error={errors.studentName}
        />
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />
        <InputField
          label="Marks Obtained"
          name="marksObtained"
          type="number"
          defaultValue={data?.marksObtained}
          register={register}
          error={errors.marksObtained}
        />
        <InputField
          label="Total Marks"
          name="totalMarks"
          type="number"
          defaultValue={data?.totalMarks}
          register={register}
          error={errors.totalMarks}
        />
        <InputField
          label="Grade"
          name="grade"
          defaultValue={data?.grade}
          register={register}
          error={errors.grade}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;
