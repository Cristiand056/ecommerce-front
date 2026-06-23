"use client"; 

import dynamic from "next/dynamic";

const FindUs = dynamic(() => import("@/components/findUs"), {
  ssr: false,
});

export default function MapWrapper() {
  return <FindUs />;
}