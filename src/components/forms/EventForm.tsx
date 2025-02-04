"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  eventTitle: z.string().min(2, { message: "Event title is required!" }),
  eventDate: z.date({ required_error: "Event date is required!" }),
  location: z.string().min(2, { message: "Location is required!" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters!" }),
  img: z.instanceof(File, { message: "Event image is required!" }),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
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
    console.log("Event data:", data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Event</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Event Title"
          name="eventTitle"
          defaultValue={data?.eventTitle}
          register={register}
          error={errors.eventTitle}
        />
        <InputField
          label="Event Date"
          name="eventDate"
          type="date"
          defaultValue={data?.eventDate}
          register={register}
          error={errors.eventDate}
        />
        <InputField
          label="Location"
          name="location"
          defaultValue={data?.location}
          register={register}
          error={errors.location}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
            <Image src="/upload.png" alt="upload image" width={28} height={28} />
            <span>Upload an image</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">{errors.img.message.toString()}</p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventForm;
