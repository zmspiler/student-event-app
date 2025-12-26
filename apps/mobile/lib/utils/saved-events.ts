import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSavedEvents(): Promise<string[]> {
  const savedEvents = await AsyncStorage.getItem("savedEvents");
  return savedEvents ? JSON.parse(savedEvents) : [];
}

export async function saveEvent(eventId: string): Promise<void> {
  const savedEvents = await getSavedEvents();
  if (!savedEvents.includes(eventId)) {
    savedEvents.push(eventId);
    await AsyncStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }
}

export async function unsaveEvent(eventId: string): Promise<void> {
  const savedEvents = await getSavedEvents();
  const updatedEvents = savedEvents.filter((id) => id !== eventId);
  await AsyncStorage.setItem("savedEvents", JSON.stringify(updatedEvents));
}

export async function isEventSaved(eventId: string): Promise<boolean> {
  const savedEvents = await getSavedEvents();
  return savedEvents.includes(eventId);
}
