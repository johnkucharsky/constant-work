import { createDocument } from "zod-openapi";

import {
  AddTaskSchema,
  DeleteManyTasksResponseSchema,
  DeleteManyTasksSchema,
  EditTaskSchema,
  SingleTaskResponseSchema,
  TaskParamsSchema,
  TaskQuerySchema,
  TaskResponseSchema,
} from "@/schemas/tasks.sever";

export const createOpenApiDocument = (origin: string) => {
  return createDocument({
    openapi: "3.1.0",
    info: {
      title: "Constant Work API",
      version: "1.0.0",
      description: "REST API for managing tasks in the Constant Work app.",
    },
    servers: [
      {
        url: origin,
      },
    ],
    paths: {
      "/api/tasks": {
        get: {
          operationId: "getTasks",
          tags: ["Tasks"],
          summary: "List tasks",
          description:
            "Returns paginated tasks with sorting, filtering, and full-text search.",
          requestParams: {
            query: TaskQuerySchema,
          },
          responses: {
            "200": {
              description: "Task list",
              content: {
                "application/json": {
                  schema: TaskResponseSchema,
                },
              },
            },
          },
        },
        post: {
          operationId: "createTask",
          tags: ["Tasks"],
          summary: "Create task",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: AddTaskSchema,
              },
            },
          },
          responses: {
            "201": {
              description: "Created task",
              content: {
                "application/json": {
                  schema: SingleTaskResponseSchema,
                },
              },
            },
          },
        },
        delete: {
          operationId: "deleteManyTasks",
          tags: ["Tasks"],
          summary: "Delete many tasks",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: DeleteManyTasksSchema,
              },
            },
          },
          responses: {
            "200": {
              description: "Deleted tasks count",
              content: {
                "application/json": {
                  schema: DeleteManyTasksResponseSchema,
                },
              },
            },
          },
        },
      },
      "/api/tasks/{id}": {
        patch: {
          operationId: "updateTask",
          tags: ["Tasks"],
          summary: "Update task",
          requestParams: {
            path: TaskParamsSchema,
          },
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: EditTaskSchema,
              },
            },
          },
          responses: {
            "201": {
              description: "Updated task",
              content: {
                "application/json": {
                  schema: SingleTaskResponseSchema,
                },
              },
            },
          },
        },
        delete: {
          operationId: "deleteTask",
          tags: ["Tasks"],
          summary: "Delete task",
          requestParams: {
            path: TaskParamsSchema,
          },
          responses: {
            "200": {
              description: "Deleted task",
              content: {
                "application/json": {
                  schema: SingleTaskResponseSchema,
                },
              },
            },
          },
        },
      },
    },
  });
};
