import React, { useEffect } from "react";
import * as WebBrowesr from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowesr.warmUpAsync();

    return () => {
      void WebBrowesr.coolDownAsync();
    };
  }, []);
};
