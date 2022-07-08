import axios from "axios";
import useSWR from "swr";
import { Attendance, AttendanceResponse } from "src/models/Attendance";

const fetcher = async (key: string) => {
  const response = await axios.get<AttendanceResponse[]>(key);

  return response.data.map((attendance) => new Attendance(attendance));
}

export const useAttendances = () => {
  const { data, error } = useSWR("attendances", fetcher);

  return { attendances: data, error };
};
