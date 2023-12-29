// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./store";

export function NextUIProviders({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
