"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="Elearning"
        description="E learning platform for students to learn and get help from teachers"
        keywords="Programming, e-commeerce, AI, text to speecg"
      />
      <Header open={open} activeItem={activeItem} setOpen={setOpen} />
    </div>
  );
};

export default Page;
