import { useQuery } from "@tanstack/react-query";
import { PageTitle } from "@/components/page-title";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const query = useQuery(apiQueryClient.events.getAll.queryOptions());

  return <PageTitle text="Events" />;
}
