"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  assignmentTitle: z.string().min(2, { message: "Assignment title is required!" }),
  subject: z.string().min(2, { message: "Subject is required!" }),
  dueDate: z.date({ required_error: "Due date is required!" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters!" }),
  file: z.instanceof(File, { message: "File upload is required!" }),
});

type Inputs = z.infer<typeof schema>;

const AssingnmentForm = ({
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
    console.log("Assignment data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Assignment</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Assignment Title"
          name="assignmentTitle"
          defaultValue={data?.assignmentTitle}
          register={register}
          error={errors.assignmentTitle}
        />
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />
        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          defaultValue={data?.dueDate}
          register={register}
          error={errors.dueDate}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="file">
            <Image src="/upload.png" alt="upload file" width={28} height={28} />
            <span>Upload file</span>
          </label>
          <input type="file" id="file" {...register("file")} className="hidden" />
          {errors.file?.message && (
            <p className="text-xs text-red-400">{errors.file.message.toString()}</p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AssingnmentForm;
