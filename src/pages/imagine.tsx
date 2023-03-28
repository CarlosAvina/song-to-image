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
    <div className="grid h-screen w-screen grid-cols-8 grid-rows-[min-content_min-content]">
      <nav className="col-start-1 col-end-9 mt-10">
        <Link
          href="/"
          className="rounded-3xl bg-green-500 px-3 py-2 font-semibold text-white"
        >
          Return to gallery
        </Link>
      </nav>
      <main className="col-start-2 col-end-8 flex flex-col gap-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
          Convert a song into an image!
        </h1>
        <form className="flex gap-10" onSubmit={getTrack}>
          <input
            className="w-full rounded-md border border-black px-5 py-3"
            required
            name="song"
            type="url"
            placeholder="spotify song url"
          />
          <button
            className="rounded-2xl bg-green-500 px-3 py-2 font-semibold text-white min-w-[150px]"
            type="submit"
          >
            Search
          </button>
        </form>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
};

export default Imagine;
