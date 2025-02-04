"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  title: z.string().min(2, { message: "Title is required!" }),
  content: z.string().min(5, { message: "Content must be at least 5 characters!" }),
  date: z.date({ required_error: "Date is required!" }),
  postedBy: z.string().min(2, { message: "Posted By is required!" }),
});

type Inputs = z.infer<typeof schema>;

const AnnouncementForm = ({
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
    console.log("Announcement data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Announcement</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Content"
          name="content"
          defaultValue={data?.content}
          register={register}
          error={errors.content}
        />
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />
        <InputField
          label="Posted By"
          name="postedBy"
          defaultValue={data?.postedBy}
          register={register}
          error={errors.postedBy}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
