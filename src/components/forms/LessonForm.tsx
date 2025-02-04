"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  lessonTitle: z.string().min(2, { message: "Lesson title is required!" }),
  subject: z.string().min(2, { message: "Subject is required!" }),
  teacher: z.string().min(2, { message: "Teacher is required!" }),
  lessonDate: z.date({ required_error: "Lesson date is required!" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters!" }),
});

type Inputs = z.infer<typeof schema>;

const LessonForm = ({
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
    console.log("Lesson data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Lesson</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Lesson Title"
          name="lessonTitle"
          defaultValue={data?.lessonTitle}
          register={register}
          error={errors.lessonTitle}
        />
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />
        <InputField
          label="Teacher"
          name="teacher"
          defaultValue={data?.teacher}
          register={register}
          error={errors.teacher}
        />
        <InputField
          label="Lesson Date"
          name="lessonDate"
          type="date"
          defaultValue={data?.lessonDate}
          register={register}
          error={errors.lessonDate}
        />
        <InputField
          label="Content"
          name="content"
          defaultValue={data?.content}
          register={register}
          error={errors.content}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;
