import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/3d-experience")({
  component: Experience3DPage,
});

function Experience3DPage() {
  return <main className="w-screen h-screen overflow-hidden bg-black text-white"></main>;
}
