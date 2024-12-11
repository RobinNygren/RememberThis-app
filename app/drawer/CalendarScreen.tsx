import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { Calendar } from "react-native-calendars";
import { Day, TaskType } from "../types/types";
import { mapTasksWithType } from "../utils/mapTasksWithType";
import { getTaskColor } from "../utils/getTaskColor";

const CalendarScreen = () => {
  const { daily, weekly, monthly } = useTasks();

  const allTasks = mapTasksWithType(daily, weekly, monthly);

  // Generera markedDates för kalendern
  const markedDates = allTasks.reduce((acc: any, task) => {
    const { date, type } = task;

    // Om datumet redan finns, lägg till en extra "dot"
    if (!acc[date]) {
      acc[date] = { dots: [{ color: getTaskColor(type) }] }; // Skapa första dot
    } else {
      acc[date].dots.push({ color: getTaskColor(type) }); // Lägg till fler dots
    }

    acc[date].dots = acc[date].dots.slice(0, 3); // Begränsa till 3 dots
    return acc;
  }, {});

  // State för valt datum och tasks för det datumet
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const tasksForSelectedDate = allTasks.filter(
    (task) => task.date === selectedDate
  );

  return (
    <View style={styles.container}>
      <Calendar
        markingType={"multi-dot"} // Multi-dot för flera markeringar
        markedDates={{
          ...markedDates,
          ...(selectedDate && {
            [selectedDate]: {
              selected: true,
              dots: markedDates[selectedDate]?.dots || [],
            },
          }),
        }}
        onDayPress={(day: Day) => {
          setSelectedDate(day.dateString); // YYYY-MM-DD format
        }}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5",
        }}
      />
      <View style={styles.tasksContainer}>
        <Text style={styles.headerText}>
          {selectedDate
            ? `Tasks for ${selectedDate}`
            : "Select a date to see tasks"}
        </Text>
        <FlatList
          data={tasksForSelectedDate}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.taskItem,
                { backgroundColor: getTaskColor(item.type) },
              ]}
            >
              <Text style={styles.taskText}>{item.task}</Text>
            </View>
          )}
          ListEmptyComponent={
            selectedDate ? (
              <Text style={styles.emptyText}>No tasks for this day</Text>
            ) : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksContainer: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  taskItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default CalendarScreen;
