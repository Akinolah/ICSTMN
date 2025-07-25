/ <reference types="vite/client" />
declare module '*.jpeg' {
  const content: string;
  export default content;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';