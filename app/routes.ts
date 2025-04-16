import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/tt2.tsx"),
  route("tt1", "routes/tt1.tsx"),
  route("tt0", "routes/tt0.tsx")
] satisfies RouteConfig;
