"use client";

import { useQuery } from "@tanstack/react-query";
import { searchRepositories } from "./server/search-repositories";
import { useState } from "react";
import { TypographyH1 } from "@/components/typography";
import { VercelLogo } from "@/components/icons/vercel-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import languages from "@/languages.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomInt, getRandomIntInclusive } from "@/lib/utils";
import { ExternalLink, GitFork, Info, Star } from "lucide-react";
import { SimpleTooltip } from "./components/simple-tooltip";

const PER_PAGE = 30;

export function HomeContent() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined
  );
  const [randomPage, setRandomPage] = useState(
    getRandomIntInclusive(1, PER_PAGE)
  );
  const [randomIndex, setRandomIndex] = useState(
    getRandomIntInclusive(0, PER_PAGE)
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchRepositories", randomPage],
    queryFn: () =>
      searchRepositories({
        language: selectedLanguage,
        per_page: PER_PAGE,
        page: randomPage,
      }),
    enabled: !!selectedLanguage,
  });
  const repository = data?.data.items[randomIndex];
  const totalPage = data?.data.total_count;

  const randomize = () => {
    setRandomPage(getRandomInt(1, totalPage ?? PER_PAGE));
    setRandomIndex(getRandomInt(1, PER_PAGE));
  };

  const renderResult = () => {
    if (isLoading)
      return (
        <div className="w-full h-32 flex items-center justify-center rounded-xl bg-gray-100">
          <p>Loading, please wait...</p>
        </div>
      );

    if (!selectedLanguage || selectedLanguage === "")
      return (
        <div className="w-full h-32 flex items-center justify-center rounded-xl bg-gray-100">
          <p>Please select a language</p>
        </div>
      );

    if (repository)
      return (
        <Card className="relative group">
          <SimpleTooltip tooltip="View On Github">
            <Button
              className="absolute top-2 right-2 group-hover:visible invisible"
              size="icon"
              variant="ghost"
              onClick={() => window.open(repository.html_url, "_blank")}
            >
              <ExternalLink />
            </Button>
          </SimpleTooltip>
          <CardHeader>
            <CardTitle>{repository.name}</CardTitle>
            <CardDescription className="hover:text-clip line-clamp-6">
              {repository.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleTooltip tooltip="View on Github">
              <Button variant="ghost" size="sm">
                <Star /> {repository.stargazers_count}
              </Button>
            </SimpleTooltip>
            {repository.allow_forking && (
              <SimpleTooltip tooltip="View Forks">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(`${repository.html_url}/fork`, "_blank")
                  }
                >
                  <GitFork /> {repository.forks_count}
                </Button>
              </SimpleTooltip>
            )}
            {repository.has_issues && (
              <SimpleTooltip tooltip="View Issues">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(`${repository.html_url}/issues`, "_blank")
                  }
                >
                  <Info /> {repository.open_issues_count}
                </Button>
              </SimpleTooltip>
            )}
          </CardContent>
        </Card>
      );

    return (
      <div className="w-full h-32 flex items-center justify-center rounded-xl bg-red-100">
        <p>Error fetching repositories</p>
      </div>
    );
  };

  const renderActions = () => {
    if (!selectedLanguage || isLoading) return null;

    const isErrorState = !repository || isError;

    return (
      <div className="flex gap-4 w-full">
        <Button
          className="flex-1"
          variant={isErrorState ? "destructive" : "default"}
          onClick={randomize}
        >
          {isErrorState ? "Retry" : "Refresh"}
        </Button>
        <Button onClick={() => setSelectedLanguage("")}>Clear</Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex gap-4 items-center p-4">
        <Button
          className="bg-black text-white rounded-full w-8 h-8 "
          size="icon"
        >
          <VercelLogo />
        </Button>
        <TypographyH1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Github Repository Finder
        </TypographyH1>
      </div>
      <Separator />
      <div className="flex flex-col max-w-screen-sm w-full gap-4 p-4">
        <Select
          value={selectedLanguage}
          onValueChange={(value) => {
            setSelectedLanguage(value);
            randomize();
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            {languages.slice(1).map((language, i) => (
              <SelectItem key={i + 1} value={language.value}>
                {language.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {renderResult()}
        {renderActions()}
      </div>
    </div>
  );
}
