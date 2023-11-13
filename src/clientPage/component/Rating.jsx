import {React, useState} from "react";
// import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";

export default function Rating({ user }){
  
  const comment = user?.commentList?.map((val, index) => {
    return (
      <div class="grid items-center" key={index}>
          <div className="inline-flex gap-4">
            <div className="grid">
              <p class="flex items-baseline">
                <span class="text-gray-600 font-bold">{val.user.fullName}</span>
              </p>
              <div class="flex items-center mt-1 text-yellow-300">
                {Array(5)
                .fill(0)
                .map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button bf"
                        key={index}
                        className={index <= val.rating ? "text-yellow-300" : "text-gray-400"}
                        value={val.rating}
                        checked={index === val.rating}
                      >
                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                      </button>
                    );
                  })}
                <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{val.rating} out of 5</p>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                title="February 8th, 2022">{user.createdAt}</time></p>
            </div>
          </div>
          <div className="pb-4 text-left">
            <p class="mt-1">{val.comment}</p>
          </div>
        </div>
    )
  })

  return (
    <div class="w-full">
      {comment}
    </div>
	)
}