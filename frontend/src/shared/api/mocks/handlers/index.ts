import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const departments: ApiSchemas["DepartmentList"][] = [];

export const handlers = [
  http.get("/api/v1/departments/", () => {
    return HttpResponse.json(departments);
  }),
];
