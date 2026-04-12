"use client";

import "swagger-ui-react/swagger-ui.css";

import SwaggerUI from "swagger-ui-react";

export default function SwaggerDocs() {
  return (
    <SwaggerUI
      url="/api/openapi"
      defaultModelsExpandDepth={-1}
      docExpansion="list"
    />
  );
}
