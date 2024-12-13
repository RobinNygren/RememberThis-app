import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";

export const scheduleNotification = async (
  taskName: string,
  reminderTime: string,
  taskDate: string
) => {
  // Validera datum och tid
  const isValidDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isValidTime = (time: string) =>
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

  if (!isValidDate(taskDate) || !isValidTime(reminderTime)) {
    console.error("Invalid date or time format.");
    return;
  }

  const now = new Date();
  const [hours, minutes] = reminderTime.split(":").map(Number);
  const [year, month, day] = taskDate.split("-").map(Number);

  // Sätt tid för notifikationen med lokal tid
  const notificationDate = new Date();
  notificationDate.setFullYear(year, month - 1, day);
  notificationDate.setHours(hours, minutes, 0, 0); // Lokal tid

  // Om tiden redan har passerat idag, sätt notifikationen till nästa dag
  if (notificationDate < now) {
    notificationDate.setDate(notificationDate.getDate() + 1);
  }

  // Schemalägg notifikationen
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: `It's time for: ${taskName}`,
    },
    trigger: notificationDate, // Körs på schemalagd tid
  });
  console.log("Scheduling notification for:", notificationDate.toString());
};

export async function registerForPushNotificationsAsync() {
  let token;

  // Kontrollera att enheten kan ta emot push-notifikationer
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Be om behörigheter om de inte redan beviljats
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for notifications!");
      return null;
    }

    // Hämta Expo Push Token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    alert("Must use a physical device for Push Notifications");
  }

  // Konfigurera en notifikationskanal för Android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
