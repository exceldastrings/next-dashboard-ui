"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  subjectName: z.string().min(2, { message: "Subject name is required!" }),
  subjectCode: z.string().min(1, { message: "Subject code is required!" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters!" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
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
    console.log("Subject data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Subject</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject Name"
          name="subjectName"
          defaultValue={data?.subjectName}
          register={register}
          error={errors.subjectName}
        />
        <InputField
          label="Subject Code"
          name="subjectCode"
          defaultValue={data?.subjectCode}
          register={register}
          error={errors.subjectCode}
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

export default SubjectForm;
