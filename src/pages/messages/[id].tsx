import { NextPage } from "next";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Forms/Input/Input";
import { MessageType } from "../../schema/message.schema";
import { trpc } from "../../utils/trpc";

const UserPage: NextPage = () => {
  const { register, handleSubmit } = useForm<FieldValues>({
    reValidateMode: "onSubmit",
  });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { mutateAsync: sendMessage } = trpc.room.sendMessage.useMutation({});

  const onSubmit = async () => {
    console.log("a");
  };

  return (
    <div className="bg-gray-200 relative mx-auto my-[15rem] h-32 w-[70rem] justify-center rounded-md">
      <form
        className=""
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <Input
          element="textarea"
          name="message"
          register={register}
          placeholder="Write a message..."
        />
      </form>
    </div>
  );
};

export default UserPage;
