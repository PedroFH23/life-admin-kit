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
            },
        };
    }
}