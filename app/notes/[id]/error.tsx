"use client";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  console.log(error);
  return <p>Something went wrong. {error.message}.</p>;
};

export default Error;
