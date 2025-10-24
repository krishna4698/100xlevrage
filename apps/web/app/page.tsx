'use client'

import { useState } from "react";

export default function Home() {
  let[email,setemail]= useState("");
  let[password,setpassword]= useState("");
  return (
    <div>
      hello
     <input type="text"  placeholder="email" value={email} />
   <button>SIgnup</button>
    </div>
  );
}
