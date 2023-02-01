import React, { useCallback, useEffect, useState } from "react";
import equal from "deep-equal";
import { deepCopy } from "../data/utils";

export default function SecureIframe(allProps) {
  const { className, src, srcDoc, title, message, onMessage } = allProps;
  const usedProps = { className, src, srcDoc, title };

  const [loaded, setLoaded] = useState(false);
  const [prevMessage, setPrevMessage] = useState(undefined);
  const ref = React.useRef();

  const onMessageEvent = useCallback(
    (event) => {
      if (event.source !== ref.current.contentWindow) {
        return;
      }
      onMessage && onMessage(event.data);
    },
    [ref, onMessage]
  );

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, false);
    return () => {
      window.removeEventListener("message", onMessageEvent, false);
    };
  }, [onMessageEvent]);

  useEffect(() => {
    if (ref.current && loaded && !equal(prevMessage, message)) {
      setPrevMessage(deepCopy(message));
      ref.current.contentWindow.postMessage(message, "*");
    }
  }, [message, ref, loaded, prevMessage]);

  useEffect(() => {
    setLoaded(false);
  }, [src, srcDoc]);

  return (
    <iframe
      {...usedProps}
      ref={ref}
      sandbox="allow-scripts"
      onLoad={() => setLoaded(true)}
    />
  );
}
