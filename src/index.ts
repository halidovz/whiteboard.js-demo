import {Whiteboard} from "whiteboardjs";

const whiteboard = new Whiteboard(document.getElementById("canvas"), window, "canvas");
const whiteboard2 = new Whiteboard(document.getElementById("canvas2"), window, "canvas");

renderTools(whiteboard, "tools1");
renderTools(whiteboard2, "tools2");

whiteboard.onAddObject$.subscribe((obj) => {
  whiteboard2.restoreObjects([obj]);
});

whiteboard2.onAddObject$.subscribe((obj) => {
  whiteboard.restoreObjects([obj]);
});

function renderTools(whiteboard: Whiteboard, containerId) {
  const toolsContainer = document.getElementById(containerId);

  whiteboard.tools$.subscribe((tools) => {
    toolsContainer.innerHTML = "";
    for (const tool of tools) {
      const span = document.createElement("span");
      span.innerText = tool.getName() + " ";
      if (whiteboard.getActiveTool() === tool) {
        span.style.fontWeight = "bold";
      }
      span.addEventListener("click", () => {
        whiteboard.activateTool(tool);
      });
      toolsContainer.appendChild(span);
    }
  });
}