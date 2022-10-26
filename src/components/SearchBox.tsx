import React, { FormEvent, useRef } from "react";

export const SearchBox: React.FunctionComponent = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchRef.current?.value) {
      console.log(searchRef.current?.value);
      searchRef.current.value = "";
    }
  };

  return (
    <form
      className="mx-auto mt-[10rem] mb-0 flex w-[50rem] justify-between self-center rounded-md bg-gray-300 p-6"
      onSubmit={search}
    >
      <input
        type="text"
        ref={searchRef}
        placeholder="Search..."
        className="h-[3rem] w-[30rem] rounded-md indent-4 text-[1.5rem]"
      />
      <button
        type="submit"
        className="w-[6.5rem] cursor-pointer rounded-md border-[2px] border-color-violet-light text-[1.3rem]"
      >
        Search
      </button>
    </form>
  );
};
