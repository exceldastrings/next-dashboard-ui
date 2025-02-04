"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  examTitle: z.string().min(2, { message: "Exam title is required!" }),
  subject: z.string().min(2, { message: "Subject is required!" }),
  examDate: z.date({ required_error: "Exam date is required!" }),
  totalMarks: z.number({ invalid_type_error: "Total marks must be a number" }).min(1, { message: "Total marks is required" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters!" }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
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
    console.log("Exam data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Exam</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam Title"
          name="examTitle"
          defaultValue={data?.examTitle}
          register={register}
          error={errors.examTitle}
        />
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />
        <InputField
          label="Exam Date"
          name="examDate"
          type="date"
          defaultValue={data?.examDate}
          register={register}
          error={errors.examDate}
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

export default ExamForm;
