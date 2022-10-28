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
      className="mx-auto mt-[10rem] mb-0 flex w-[85%] flex-col justify-between  rounded-md bg-gray p-6 md:w-[50rem] xs:flex-row"
      onSubmit={search}
    >
      <input
        type="text"
        ref={searchRef}
        placeholder="Search..."
        className="h-[3rem] w-full rounded-md border border-green indent-4 text-[1.5rem] focus:outline-none xs:w-[75%]"
      />
      <button
        type="submit"
        className="mt-4 h-[3rem] w-[6.5rem] cursor-pointer self-center  rounded-md border border-green text-[1.3rem] xs:mt-0 "
      >
        Search
      </button>
    </form>
  );
};
