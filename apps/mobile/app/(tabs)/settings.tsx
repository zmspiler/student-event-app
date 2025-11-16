import { SafeAreaView } from "react-native-safe-area-context";
import { PageTitle } from "@/components/page-title";

export default function Settings() {
  return (
    <SafeAreaView className="p-4">
      <PageTitle text="Settings" />
    </SafeAreaView>
  );
}
