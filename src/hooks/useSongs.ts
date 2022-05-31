import { atom, useRecoilState } from "recoil";
import { RequestType, Song } from "src/models/Song";

const defaultSongs = [
  new Song({
    title: "일루미네이트 콘서트",
    requestor: "qjfrntop",
    requestorName: "시프트",
    requestType: RequestType.ticket,
  }),
  new Song({
    title: "イルミネイトコンサート",
    requestor: "qjfrntop",
    requestorName: "프로듀서_젠",
    requestType: RequestType.ticket,
  }),
  new Song({
    title: "Daybreak Age",
    requestor: "qjfrntop",
    requestorName: "시프트",
    requestType: RequestType.ticket,
  }),
];

const songsState = atom({ key: "songs", default: defaultSongs });

export const useSongs = () => {
  const [songs, setSongs] = useRecoilState(songsState);

  return {
    songs,
  };
};
