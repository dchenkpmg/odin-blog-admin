import "./Home.css";
import { useGetPostsQuery } from "@/app/services/apiSlice";
import React, { useEffect } from "react";

function Home() {
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  // console.log(posts); // Check what is being logged here
  useEffect(() => {
    if (isSuccess) {
      console.log("Data fetched successfully:", data);
    }
  }, [isSuccess, data]);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div>
        <p>Total Posts: {data.posts.length}</p>
        <ul>
          {data.posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>
                <small>
                  Posted by Unknown on{" "}
                  {/* Assuming username might not be set */}
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        Error:{" "}
        {error
          ? ((error as any).message ?? "An error occurred")
          : "An error occurred"}
      </div>
    );
  }
  return (
    <>
      <h1>On the Bleeding Edge</h1>
      {content}
    </>
  );
}

export default Home;
