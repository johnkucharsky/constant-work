"use client"; // Error boundaries must be Client Components

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div>
      <h2>Something went wrong!</h2>

      {error.message}
      {error.stack}
    </div>
  );
}
