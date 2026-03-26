export class DailySummaryService {
    constructor(taskService, reminderService) {
        this.taskService = taskService;
        this.reminderService = reminderService;
    }

    getTodaySummary() {
        const todayTasks = this.taskService.getToday();
        const todayReminders = this.reminderService.getToday();
        const pendingTasks = this.taskService.getPending();
        const pendingReminders = this.reminderService.getPending();

        const completedTasksToday = this.taskService
            .getAll()
            .filter((task) => task.completedAt && this.#isToday(task.completedAt));

        const completedRemindersToday = this.reminderService
            .getAll()
            .filter((reminder) => reminder.completedAt && this.#isToday(reminder.completedAt));

        return {
            today: {
                tasks: todayTasks,
                reminders: todayReminders,
            },
            counters: {
                tasksToday: todayTasks.length,
                remindersToday: todayReminders.length,
                pendingTasks: pendingTasks.length,
                pendingReminders: pendingReminders.length,
                completedTasksToday: completedTasksToday.length,
                completedRemindersToday: completedRemindersToday.length,
            },
        };
    }

    #isToday(dateValue) {
        const date = new Date(dateValue);
        const today = new Date();

        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    }
}