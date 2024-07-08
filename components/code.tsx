"use client";

// https://github.com/shadcn-ui/ui/issues/1054
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"; //https://usehooks-ts.com/react-hook/use-copy-to-clipboard
import SyntaxHighlighter from "react-syntax-highlighter"; //https://github.com/react-syntax-highlighter/react-syntax-highlighter
import { dracula, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  className?: string;
  language: number;
  overwriteTheme?: undefined | "light" | "dark";
  showLineNumbers?: boolean;
}

function getLanguage(lang: number) {
  switch (lang) {
    case 7:
      return "sh";
    case 8:
      return "proto";
    case 30:
      return "js";
    default:
      return "";
  }
}

export default function Code({
  code,
  className,
  language,
  overwriteTheme,
  showLineNumbers,
}: CodeBlockProps) {
  const { theme } = useTheme();

  return (
    <div className={cn("relative mt-4 rounded-sm border-[1px]", className)}>
      <SyntaxHighlighter
        showLineNumbers={showLineNumbers}
        className={cn("rounded-sm", className)}
        language={getLanguage(language)}
        style={
          (overwriteTheme == undefined && theme === "light") ||
          overwriteTheme == "light"
            ? docco
            : dracula
        }
      >
        {code}
      </SyntaxHighlighter>
      <ClipboardButton code={code} />
    </div>
  );
}

interface ClipboardButtonProps {
  code: string;
  className?: string;
}

export function ClipboardButton({ code, className }: ClipboardButtonProps) {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [copied]);

  async function copyToClipboard() {
    if (await copy(code)) {
      setCopied(true);
    }
  }

  return (
    <div
      onClick={copyToClipboard}
      title="Copy code"
      role="button"
      className={cn(
        "rounded-lg h-6 w-6 border hover:bg-accent hover:text-accent-foreground hover:border-primary",
        className
      )}
    >
      {copied ? (
        <Tooltip open={copied}>
          <TooltipTrigger>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              data-view-component="true"
              className="fill-green-600 w-[16px] h-[16px]"
            >
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
            </svg>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Copied!</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[20px] h-[20px]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          ></path>
        </svg>
      )}
    </div>
  );
}
