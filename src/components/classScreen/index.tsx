"use client";
import React from "react";
import { ClassChoiceScreen } from "./classChoices";

export const ClassScreen = () => {
  return (
    <div className="flex">
      <ClassChoiceScreen classId="1" />
      <ClassChoiceScreen classId="2" />
      <ClassChoiceScreen classId="3" />
    </div>
  );
};
