import React from "react";
import { IoThumbsUpOutline, IoThumbsDownOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

const PICTURE_URL =
  "https://thegadgetflow.com/wp-content/uploads/2020/01/Dell-2020-XPS-13-Lightweight-Laptop-01-1.jpg";

export const Item: React.FunctionComponent = () => {
  return (
    <div className="my-48 mx-auto flex w-[90vw] flex-col sm:w-[65rem]">
      <div className="flex flex-col rounded-sm border border-green p-8 s:flex-row s:justify-around">
        <div className="mb-12 w-full s:mb-0 s:w-[50%] ">
          <h1 className="m-0 mb-12 self-start text-4xl">A Very Good Laptop</h1>
          <h3 className="text-2xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel non,
            quam unde quis consequatur numquam consequuntur aspernatur
            doloremque labore ad minus? Necessitatibus laboriosam dolorum odit,
            voluptatem placeat blanditiis eum ut. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Vel non, quam unde quis consequatur
            numquam consequuntur aspernatur doloremque labore ad minus?
            Necessitatibus laboriosam dolorum odit, voluptatem placeat
            blanditiis eum ut. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Vel non, quam unde quis consequatur numquam
            consequuntur aspernatur doloremque labore ad minus? Necessitatibus
            laboriosam dolorum
          </h3>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between s:flex-col">
              <img
                src={PICTURE_URL}
                alt=""
                className="mb-4 h-40 w-[50%] rounded-sm s:w-[100%]"
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-[1.7rem]">UserName</h2>
                <h3 className="mb-0 text-[1.35rem] s:mb-6">user city</h3>
                <div className="flex  w-[35%] justify-between">
                  <div className="flex flex-col items-center self-center text-2xl">
                    <IconContext.Provider value={{ color: "#105652" }}>
                      <IoThumbsUpOutline />
                    </IconContext.Provider>
                    <h3>22</h3>
                  </div>
                  <div className="flex flex-col items-center self-center text-2xl">
                    <IconContext.Provider value={{ color: "#B91646" }}>
                      <IoThumbsDownOutline />
                    </IconContext.Provider>
                    <h3>1</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[50%] flex-col justify-between gap-2 xs:flex-row s:w-full s:flex-col">
            <h2 className="text-2xl">all users items</h2>
            <button className="self-start rounded-md bg-green py-2 px-4 text-light s:text-2xl">
              contact user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
