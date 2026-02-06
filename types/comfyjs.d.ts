declare module "comfy.js" {
  const ComfyJS: {
    onChat?: (user: string, message: string, flags?: unknown, self?: boolean, extra?: unknown) => void;
    onCommand?: (
      user: string,
      command: string,
      message: string,
      flags?: unknown,
      extra?: unknown
    ) => void;
    onConnected?: () => void;
    onError?: () => void;
    Init: (channel: string, oauth?: string) => void;
    Say?: (message: string) => void;
    Disconnect?: () => void;
  };
  export default ComfyJS;
}
