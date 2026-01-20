import * as React from "react";

export function HydrationMarker() {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return <div data-test="hydrated" />;
}
