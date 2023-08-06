"use client";

import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon, UserCircleIcon, Bars4Icon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import cx from 'classnames'
import axiosInstance from "@/lib/utils/axiosInstanse";

export default function UserDropdown({ session }) {
  const { email} = session?.user || {};

  if (!email) return null;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/"
  }
  // const get_image = async () => {
  //   const res = await axiosInstance.get(`http://localhost:8000/auth/getData`)
  //   setImage_url(res.data.user.image_url)
  //   return res.data.image_url
  // }
  // get_image();
  const handleProfilePage = async () => {
    const res = await axiosInstance.get(`http://localhost:8000/auth/hash`)
    window.location.href = `/profile/${res.data.profile_id}`
  }
  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex  text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            <Bars4Icon
              width={30}
              height={30}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
                <button 
                  onClick={handleProfilePage}
                  className={"relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700"}>
                  <UserCircleIcon className="h-4 w-4" />
                  <p>Profile page</p>
                </button> 
          
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                  <button
                    className={cx(active ? 'bg-gray-100' : '', 'relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700')}
                    onClick={handleSignOut}
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <p className="text-sm">Sign out</p>
                  </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
