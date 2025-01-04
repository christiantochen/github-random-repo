import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SimpleTooltip({
  children,
  tooltip,
}: PropsWithChildren & {
  tooltip?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent sideOffset={4}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
