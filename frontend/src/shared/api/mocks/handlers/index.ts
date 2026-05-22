import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const departments: ApiSchemas["Departments"][] = [];

export const handlers = [
  http.get("/departments/", () => {
    return HttpResponse.json(departments);
  }),
];
