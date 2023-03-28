import type { NextPage } from "next";
import Link from "next/link";
import type { SyntheticEvent } from "react";
import { api } from "~/utils/api";

const Imagine: NextPage = () => {
  const { mutate, data } = api.spotify.getTrack.useMutation();

  function getTrack(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const elements = e.currentTarget.elements;
    const songInput = elements.namedItem("song") as HTMLInputElement;

    const songUrl = new URL(songInput.value);
    const songId = songUrl.pathname.split("/")[2] || "";

    mutate({ songId });
  }

  return (
    <div>
      <Link href="/">Return to gallery</Link>
      <h1>Convert a song into an image!</h1>
      <form onSubmit={getTrack}>
        <input required name="song" type="url" placeholder="spotify song url" />
        <button type="submit">Search</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Imagine;
