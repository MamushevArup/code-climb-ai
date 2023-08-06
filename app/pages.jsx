import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Landing from "@/components/home/landing";
import Page from "./product/pages";
import axios from "axios";
import { parse } from "cookie";

const Home = async () => {
  const session = await getServerSession(authOptions);
  let bool = false
  if (session !== null) {
    let jwtToken = ''
    try {
      if (bool){
        return
      }
      const form = new FormData();
      form.append('username', session.user.email);
      form.append('password', session.user.name);
      form.append('scope', session.user.image);
      const response = await axios.post('http://localhost:8000/auth/users', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })
        const token = response.headers['set-cookie'][0];
        jwtToken = parse(token).access_token;
        bool = true
    } catch (error) {
      console.error(error);
    }
    console.log(jwtToken);
    return (
      <Page jwt={jwtToken}/>
    );
  } else {
    return <Landing />;
  }
}

export default Home
