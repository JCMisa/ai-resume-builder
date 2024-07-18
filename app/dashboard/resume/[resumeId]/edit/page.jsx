"use client";

import React, { useEffect } from "react";

const EditResume = ({ params }) => {
  useEffect(() => {
    console.log(params);
  }, []);
  return <div>EditResume</div>;
};

export default EditResume;
