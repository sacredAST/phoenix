import { Outlet } from "react-router";

import { TimeRangeProvider } from "@phoenix/components/datetime";

export function UsagesRoot() {
  return (
    <TimeRangeProvider>
      <Outlet />
    </TimeRangeProvider>
  );
}
