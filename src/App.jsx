import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ToDoList from "./ToDoList";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToDoList />
  </StrictMode>
);
