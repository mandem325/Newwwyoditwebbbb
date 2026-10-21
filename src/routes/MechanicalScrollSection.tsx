import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/MechanicalScrollSection")({
  component: () => <Navigate to="/" />,
});
