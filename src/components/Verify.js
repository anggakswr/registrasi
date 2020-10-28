import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Verify = () => {
  const [pesan, setPesan] = useState("Verifying...");
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    axios
      .post("http://apidev.pluginesia.com/api/verify-email", {
        token,
      })
      .then((response) => {
        // jika response tidak ok
        if (response.status !== 200) {
          throw new Error(response);
        }

        // jika response ok
        setPesan(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        error.response.data.message && setPesan(error.response.data.message);
        console.log(error.response.errors);
        error.response.data.message && console.log(error.response.data.message);
      });
  }, [token]);

  return <div style={{ textAlign: "center" }}>{pesan}</div>;
};

export default Verify;
