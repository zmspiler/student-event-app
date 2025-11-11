import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { PageTitle } from "@/components/page-title";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { data, error } = useQuery(apiQueryClient.events.getAll.queryOptions());

  return (
    <>
      <PageTitle text="Events" />
      {error && <Text>Error: {error.message}</Text>}
    </>
  );
}
