import { useState } from "react";

export default function useDateRange(initStart: number, initEnd: number) {
  const [range, setRange] = useState<[number, number]>([initStart, initEnd]);
  return { range, setRange };
}
