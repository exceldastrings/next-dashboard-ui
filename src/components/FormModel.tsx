"use client";

const FormModel = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
}) => {
  const size =type === "create" ? "w-8 h-8" : "w-7 h-7"
  return <>
  <button className=""/>
  </>;
};

export default FormModel;
