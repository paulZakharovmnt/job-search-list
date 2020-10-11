import { useEffect, useState } from "react";
import database from "./firebase";

const UseGetInfoFromFirebase = (user) => {
  const [jobInfo, setJobInfo] = useState(null);
  useEffect(() => {
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("fullJobsInfo")
      .onSnapshot((doc) => {
        setJobInfo(doc.data());
      });
  }, []);

  return [jobInfo, setJobInfo];
};

export default UseGetInfoFromFirebase;
