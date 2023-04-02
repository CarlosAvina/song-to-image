import type { NextPage } from "next";
import Link from "next/link";
import type { SyntheticEvent } from "react";
import { api } from "~/utils/api";

const Imagine: NextPage = () => {
  const {
    mutate,
    data,
    isLoading: gettingTrack,
  } = api.spotify.getTrack.useMutation();
  const {
    mutate: mutatePost,
    data: dataPost,
    isLoading: isGeneratingImage,
  } = api.post.createPost.useMutation();

  function getTrack(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const elements = e.currentTarget.elements;
    const songInput = elements.namedItem("song") as HTMLInputElement;

    const songUrl = new URL(songInput.value);
    const songId = songUrl.pathname.split("/")[2] || "";

    mutate({ songId });
  }

  function createPost() {
    const songId = data?.id;
    const songName = data?.name;
    const songUri = data?.uri;
    const previewUrl = data?.preview_url;

    if (songId && songName && songUri && previewUrl) {
      mutatePost({ songName, songUri, previewUrl, songId });
    }
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
            className="min-w-[150px] rounded-2xl bg-green-500 px-3 py-2 font-semibold text-white"
            type="submit"
          >
            Search
          </button>
        </form>
        {gettingTrack ? <div>Getting track...</div> : null}
        <div>
          <h3>{data?.name}</h3>
          {data?.artists.map((artist) => (
            <p key={artist.id}>{artist.name}</p>
          ))}
        </div>
        <button
          className="min-w-[150px] rounded-2xl bg-green-500 px-3 py-2 font-semibold text-white"
          onClick={createPost}
        >
          Generate
        </button>
        {isGeneratingImage ? <div>Generating image...</div> : null}
        {dataPost ? <div>The image was generated succesfully</div> : null}
      </main>
    </div>
  );
};

export default Imagine;
