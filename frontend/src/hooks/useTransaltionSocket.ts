import { useEffect, useRef, useState } from "react";

interface ChunkMessage {
  type: "message_chunk" | "tool_call" | "tool_result" | "tool_error";
  chunk: string;
  is_complete: boolean;
}

interface ErrorMessage {
  type: "message_error";
  error: string;
}

type SocketMessage = ChunkMessage | ErrorMessage;

interface UseMessageSocketOptions {
  messageId: string | null;
  pendingChatRef: React.RefObject<{
    sessionId: string;
    assistantMessageId: string;
    model_name: string;
  } | null>;
  onMessageChunk?: (chunk: string) => void;
  onMessageComplete?: (fullmessage: string) => void;
  onError?: (error: string) => void;
}

interface UseMessageSocketReturn {
  isConnected: boolean;
  streamingMessage: string;
  isStreaming: boolean;
  messageType: string;
}

export function useMessageSocket({
  messageId,
  pendingChatRef,
  onMessageChunk,
  onMessageComplete,
  onError,
}: UseMessageSocketOptions): UseMessageSocketReturn {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [messageType, setMessageType] = useState("");
  const fullmessageRef = useRef("");

  const onmessageChunkRef = useRef(onMessageChunk);
  const onmessageCompleteRef = useRef(onMessageComplete);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onmessageChunkRef.current = onMessageChunk;
    onmessageCompleteRef.current = onMessageComplete;
    onErrorRef.current = onError;
  }, [onMessageChunk, onMessageComplete, onError]);

  useEffect(() => {
    if (!messageId) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;

    const apiHost = import.meta.env.VITE_API_URL
      ? new URL(import.meta.env.VITE_API_URL).host
      : host;

    const url = `${protocol}//${apiHost}/api/v1/ws/translate/${messageId}`;

    console.log("[WebSocket] Connecting to:", url);
    console.log("[WebSocket] Translation ID:", messageId);

    setStreamingMessage("");
    fullmessageRef.current = "";
    setIsStreaming(false);
    setIsConnected(false);

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("[WebSocket] Connection opened");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("[WebSocket] Raw message received:", event.data);
      
      try {
        const message: SocketMessage = JSON.parse(event.data);
        console.log("[WebSocket] Parsed message:", message);
        console.log("[WebSocket] Message type:", message.type);
        console.log("[WebSocket] Chunk content:", message.chunk);
        console.log("[WebSocket] Is complete:", message.is_complete);

        setMessageType(message.type);

        if (message.type === "message_chunk") {
          if (message.chunk) {
            fullmessageRef.current += fullmessageRef.current ? ` ${message.chunk}` : message.chunk;
          }
          console.log("[WebSocket] Accumulated text:", fullmessageRef.current);
          
          setStreamingMessage(fullmessageRef.current);
          console.log("[WebSocket] State updated, streamingMessage:", fullmessageRef.current);

          if (!message.is_complete) {
            setIsStreaming(true);
            console.log("[WebSocket] Streaming started");
          }

          if (message.is_complete) {
            setIsStreaming(false);
            console.log("[WebSocket] Streaming complete");
            console.log("[WebSocket] Final translation:", fullmessageRef.current);
            onmessageCompleteRef.current?.(fullmessageRef.current.trim());
          }

          onmessageChunkRef.current?.(message.chunk);
        } else if (message.type === "tool_call") {
          console.log("[WebSocket] Tool call received:", message.chunk);
          onmessageChunkRef.current?.(message.chunk);
        } else if (message.type === "tool_result") {
          console.log("[WebSocket] Tool result received:", message.chunk);
          onmessageChunkRef.current?.(message.chunk);
        } else if (message.type === "message_error") {
          console.log("[WebSocket] Error received:", message.error);
          setIsStreaming(false);
          onErrorRef.current?.(message.error);
        }
      } catch (e) {
        console.error("[WebSocket] Failed to parse message:", e);
      }
    };

    ws.onerror = (error) => {
      console.error("[WebSocket] Error:", error);
      onErrorRef.current?.("WebSocket connection error");
    };

    ws.onclose = () => {
      console.log("[WebSocket] Connection closed");
      setIsConnected(false);
      setIsStreaming(false);
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        console.log("[WebSocket] Cleaning up connection");
        wsRef.current.close();
        wsRef.current = null;
      }
      setIsConnected(false);
      setIsStreaming(false);
    };
  }, [messageId]);

  return {
    isConnected,
    streamingMessage,
    isStreaming,
    messageType,
  };
}

export default useMessageSocket;
